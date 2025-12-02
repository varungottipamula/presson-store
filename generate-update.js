const fs = require('fs');
const path = require('path');

async function generateUpdateScript() {
    try {
        // Fetch local nail products
        const response = await fetch('http://localhost:3000/api/products?category=nails');
        const products = await response.json();

        if (!Array.isArray(products)) {
            console.error('Failed to fetch products or invalid format');
            return;
        }

        // Sort by image number to ensure correct order matches the array index logic if needed, 
        // but actually we can just map by image filename to be safer.
        // The previous script used array index based on "nailX.jpg".
        // Let's create a map of "nailX" -> { name, description, price, originalPrice }

        const productData = products.map(p => {
            const imageMatch = p.images[0].match(/nail(\d+)\.jpg/);
            if (!imageMatch) return null;
            return {
                id: parseInt(imageMatch[1]),
                name: p.name,
                description: p.description,
                price: p.price,
                originalPrice: p.originalPrice
            };
        }).filter(p => p !== null).sort((a, b) => a.id - b.id);

        // Generate the content for the new route
        const routeContent = `import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const nailData = ${JSON.stringify(productData, null, 4)};

        // Get all nail products
        const nailProducts = await Product.find({ category: "nails" });

        const updatePromises = nailProducts.map(async (product) => {
            const imageMatch = product.images[0].match(/nail(\\d+)\\.jpg/);
            if (!imageMatch) return null;
            
            const nailId = parseInt(imageMatch[1]);
            const data = nailData.find(d => d.id === nailId);
            
            if (!data) return null;

            return await Product.findByIdAndUpdate(
                product._id,
                {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    originalPrice: data.originalPrice
                },
                { new: true }
            );
        });

        const results = await Promise.all(updatePromises);
        const successCount = results.filter(r => r !== null).length;

        return NextResponse.json({
            success: true,
            message: \`Successfully updated \${successCount} nail products with full local data\`,
            updated: successCount
        });

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({
            success: false,
            message: 'Error updating nail products',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}`;

        // Write to file
        const filePath = path.join(process.cwd(), 'app', 'api', 'update-nails-full', 'route.ts');
        const dirPath = path.dirname(filePath);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        fs.writeFileSync(filePath, routeContent);
        console.log(`Successfully generated ${filePath}`);

    } catch (error) {
        console.error('Error generating script:', error);
    }
}

generateUpdateScript();
