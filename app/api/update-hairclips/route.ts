import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Get all hairclip products sorted by image number
        const products = await Product.find({ category: 'hairclip' }).sort({ images: 1 });

        if (products.length !== 16) {
            return NextResponse.json({
                success: false,
                message: `Expected 16 products, found ${products.length}`
            }, { status: 400 });
        }

        // Custom names and descriptions for each clip
        const productDetails = [
            {
                name: "Colorful Flower Claw Clips",
                description: "Soft pastel flower-shaped claw clips with a glossy, translucent finish."
            },
            {
                name: "Pink Blossom Hair Clips",
                description: "Cute pink cherry-blossom clips with yellow stamen details."
            },
            {
                name: "Flower Hair Tie Set",
                description: "A set of pastel resin flower ties in pink, yellow, white, mint, and purple."
            },
            {
                name: "Marbled Flower Claw Clips",
                description: "Glossy marbled flower clips in pink, green, and mixed tones."
            },
            {
                name: "Mini Tortoise Claw Clips",
                description: "A bulk set of tiny brown tortoise-shell mini hair clips."
            },
            {
                name: "Pastel Blue Clip Set",
                description: "Light blue matte hair clips in star, bow, and geometric shapes."
            },
            {
                name: "Mini Pearl Flower Clips",
                description: "Small clear flower clips with pearl and rhinestone centers."
            },
            {
                name: "Glossy Flower Claw Clips",
                description: "Bright resin flower clips in pink, yellow, blue, and orange hues."
            },
            {
                name: "Pink Matte Clip Set",
                description: "A collection of matte pink clips in fun shapes including flowers, ribbons, and rectangles."
            },
            {
                name: "Gold Flower Claw Clip",
                description: "A bold, shiny gold flower-shaped hair clip for an elegant statement look."
            },
            {
                name: "Yellow Flower Clip Set",
                description: "Matching large and small yellow plumeria-style claw clips with a glossy finish."
            },
            {
                name: "Spiral Ponytail Clips",
                description: "Coil-style hair clips available in black, gold, and silver for secure ponytail hold."
            },
            {
                name: "Gold Bow Pony Clip",
                description: "A shiny gold bow-shaped clip used to tie and decorate low ponytails."
            },
            {
                name: "Gold Sea-Themed Clips",
                description: "A set of gold shell, conch, and starfish hair clips each accented with a pearl."
            },
            {
                name: "Minimal Gold Cuff Clip",
                description: "A sleek, wide gold cuff-style clip perfect for chic ponytail looks."
            },
            {
                name: "Chunky Gold Claw Clip",
                description: "A bold, sculpted gold claw clip that adds a modern, polished touch to hairstyles."
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

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${updatedProducts.length} hairclip products`,
            products: updatedProducts.map(p => ({
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
