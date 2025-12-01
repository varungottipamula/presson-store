import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Get all phone cover products sorted by image number
        const products = await Product.find({ category: 'phone-cover' }).sort({ images: 1 });

        if (products.length !== 19) {
            return NextResponse.json({
                success: false,
                message: `Expected 19 products, found ${products.length}`
            }, { status: 400 });
        }

        // Custom names and descriptions for each phone cover
        const productDetails = [
            {
                name: "Red Hibiscus Phone Case",
                description: "A clear case with bold red hibiscus flowers and matching camera cover detail."
            },
            {
                name: "Gold Mirror Wave Case",
                description: "A shiny gold metallic case with a liquid-wave textured finish."
            },
            {
                name: "Gold Snake Case",
                description: "A luxury-style case featuring a raised gold snake wrapped around the camera and back."
            },
            {
                name: "Pink Hibiscus Floral Case",
                description: "A white case covered in vibrant pink hibiscus-style flower prints."
            },
            {
                name: "Maroon Case with Gold Heart",
                description: "A matte maroon case decorated with a small raised gold heart charm."
            },
            {
                name: "Red Roses Mirror Case",
                description: "A maroon-edged case with a reflective back printed with a bouquet of deep red roses."
            },
            {
                name: "Ocean-Themed Clear Case",
                description: "A transparent case filled with colorful beach, shell, and sea-life designs."
            },
            {
                name: "Pressed Flower Clear Case",
                description: "A clear case featuring realistic multicolored pressed-style floral designs."
            },
            {
                name: "Red Rose Clear Case",
                description: "A transparent case printed with dark red roses and falling petals."
            },
            {
                name: "Leopard Print Case",
                description: "A bold beige and black animal-print case with a classic leopard pattern."
            },
            {
                name: "Autumn Pumpkin Floral Case",
                description: "Black case with orange and cream pumpkins and fall flowers."
            },
            {
                name: "Cozy Aesthetic Collage Case",
                description: "Warm beige collage of coffee, books, and home decor."
            },
            {
                name: "Red Floral Bow Case",
                description: "Glossy red case with tiny flowers and a silver bow charm."
            },
            {
                name: "Cute Cat Faces Case",
                description: "Clear case filled with colorful illustrated cat heads."
            },
            {
                name: "Iridescent Shimmer Case",
                description: "Pearl-like, holographic swirl design."
            },
            {
                name: "Burgundy Heart Case",
                description: "Matte burgundy case with a raised gold heart."
            },
            {
                name: "Silver Glitter Case",
                description: "Full bling case covered in sparkling silver glitter."
            },
            {
                name: "Vintage Wooden Floral Case",
                description: "Wood-texture background with raised red roses."
            },
            {
                name: "Yellow 3D Flower Case",
                description: "Clear case with textured yellow oil-paint style flowers."
            }
        ];

        // Update each product
        const updatePromises = products.map((product, index) => {
            return Product.findByIdAndUpdate(
                product._id,
                {
                    name: productDetails[index].name,
                    description: productDetails[index].description
                },
                { new: true }
            );
        });

        const updatedProducts = await Promise.all(updatePromises);

        const validProducts = updatedProducts.filter((p): p is NonNullable<typeof p> => p !== null);

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${validProducts.length} phone cover products`,
            products: validProducts.map(p => ({
                id: p._id,
                name: p.name,
                description: p.description,
                images: p.images
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
