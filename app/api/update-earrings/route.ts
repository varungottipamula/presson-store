import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { revalidatePath } from 'next/cache';

export async function GET() {
    try {
        await dbConnect();

        const earringUpdates = [
            {
                name: "Golden Petal Blossom Earrings",
                description: "Elegant gold-tone floral earrings with textured petals, perfect for a statement yet classy look.",
                image: "/earrings/earing1.jpg",
                price: 699,
                originalPrice: 1199
            },
            {
                name: "Pearl Bow Charm Set",
                description: "Delicate bow-accent earrings paired with pearls and crystals, offering a sweet and feminine touch.",
                image: "/earrings/earing2.jpg",
                price: 250,
                originalPrice: 1199
            },
            {
                name: "Vintage Textured Hoop Studs",
                description: "Chunky gold textured hoops that add a bold, retro-inspired elegance to any outfit.",
                image: "/earrings/earing3.jpg",
                price: 300,
                originalPrice: 1199
            },
            {
                name: "Curved Ripple Hoop Earrings",
                description: "Sculpted gold hoops featuring a wave-like ripple design for a modern, luxurious finish.",
                image: "/earrings/earing4.jpg",
                price: 699,
                originalPrice: 1199
            },
            {
                name: "Pearl & Gold Mixed Earring Set",
                description: "A versatile multi-piece set combining pearls, crystals, and gold hoops—ideal for mix-and-match styling.",
                image: "/earrings/earing5.jpg",
                price: 450,
                originalPrice: 1199
            },
            {
                name: "Ocean Star Glam Studs",
                description: "Coastal-themed gold studs with shells, pearls, and blue crystals, capturing a seaside sparkle.",
                image: "/earrings/earing6.jpg",
                price: 699,
                originalPrice: 1199
            },
            {
                name: "Elegant Pearl & Leaf Mini Set",
                description: "A chic set of pearl and metallic leaf earrings designed for a soft, graceful everyday look.",
                image: "/earrings/earing7.jpg",
                price: 699,
                originalPrice: 1199
            },
            {
                name: "Luxe Square Pearl & Crystal Studs",
                description: "Square-shaped gold studs featuring either a pearl or crystal finish, offering a refined, classy vibe.",
                image: "/earrings/earing8.jpg",
                price: 699,
                originalPrice: 1199
            },
            {
                name: "Bow Glamour Earring Trio",
                description: "A trio of bow-inspired earrings with pearls and crystals, blending playful charm with elegance.",
                image: "/earrings/earing9.jpg",
                price: 699,
                originalPrice: 1199
            },
            {
                name: "Molten Gold Drop Earrings",
                description: "Smooth, organic-shaped gold drops with a liquid-metal effect, perfect for bold, artistic style.",
                image: "/earrings/earing10.jpg",
                price: 699,
                originalPrice: 1199
            },
            {
                name: "Classic Chunky Gold Hoop Earrings",
                description: "Timeless chunky gold hoops with a smooth, rounded design—perfect for elevating everyday outfits.",
                image: "/earrings/earing11.jpg",
                price: 699,
                originalPrice: 1199
            },
            {
                name: "Luxe Gold Statement Earring Set",
                description: "A bold collection of sculpted gold earrings featuring geometric, dome, and textured shapes for standout styling.",
                image: "/earrings/earing12.jpg",
                price: 699,
                originalPrice: 1199
            },
            {
                name: "Premium Mixed Gold Hoop Set",
                description: "A versatile multi-pair gold hoop set, including textured, pearl-accented, and classic designs to match any look.",
                image: "/earrings/earing13.jpg",
                price: 699,
                originalPrice: 1199
            }
        ];

        const updatedProducts = [];

        // Update each product by finding it via image
        for (const update of earringUpdates) {
            const product = await Product.findOneAndUpdate(
                {
                    category: 'earrings',
                    images: update.image
                },
                {
                    name: update.name,
                    description: update.description,
                    price: update.price,
                    originalPrice: update.originalPrice
                },
                { new: true }
            );

            if (product) {
                updatedProducts.push(product);
            }
        }

        revalidatePath('/shop/earrings');
        revalidatePath('/shop/[category]');

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${updatedProducts.length} earring products`,
            products: updatedProducts.map(p => ({
                id: p._id,
                name: p.name,
                price: p.price,
                image: p.images[0]
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
