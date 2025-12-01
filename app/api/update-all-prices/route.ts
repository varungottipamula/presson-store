import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Get all products
        const products = await Product.find({});

        if (products.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No products found in database'
            }, { status: 404 });
        }

        // Update each product with originalPrice
        const updatePromises = products.map(async (product) => {
            // Calculate original price (2-3x current price)
            const multiplier = 2 + Math.random(); // Random between 2 and 3
            let originalPrice = Math.round(product.price * multiplier);

            // Ensure originalPrice is always > 500
            if (originalPrice <= 500) {
                originalPrice = Math.round(500 + (Math.random() * 500)); // Between 500-1000
            }

            // Round to nearest 99 for better pricing psychology (e.g., 999, 1999)
            originalPrice = Math.round(originalPrice / 100) * 100 - 1;

            return Product.findByIdAndUpdate(
                product._id,
                { originalPrice },
                { new: true }
            );
        });

        const updatedProducts = await Promise.all(updatePromises);

        // Calculate statistics
        const stats = {
            totalProducts: updatedProducts.length,
            averageDiscount: 0,
            minDiscount: 100,
            maxDiscount: 0
        };

        updatedProducts.forEach(product => {
            if (product.originalPrice && product.originalPrice > 0) {
                const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                stats.averageDiscount += discount;
                stats.minDiscount = Math.min(stats.minDiscount, discount);
                stats.maxDiscount = Math.max(stats.maxDiscount, discount);
            }
        });

        stats.averageDiscount = Math.round(stats.averageDiscount / updatedProducts.length);

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${updatedProducts.length} products with discount pricing`,
            stats,
            sampleProducts: updatedProducts.slice(0, 5).map(p => ({
                name: p.name,
                category: p.category,
                originalPrice: p.originalPrice,
                price: p.price,
                discount: p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0
            }))
        });

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({
            success: false,
            message: 'Error updating products',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
