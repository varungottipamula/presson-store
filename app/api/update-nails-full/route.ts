import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const nailData = [
    {
        "id": 1,
        "name": "Blue Wavy Tips",
        "description": "Nude base nails with bold electric-blue wavy French tips.",
        "price": 1000,
        "originalPrice": 1500
    },
    {
        "id": 2,
        "name": "Red & Gold Glam",
        "description": "Transparent nude nails featuring red French tips mixed with gold 3D metallic accents.",
        "price": 1200,
        "originalPrice": 1700
    },
    {
        "id": 3,
        "name": "Maroon Marble Shine",
        "description": "Deep maroon marble details blended with glossy pink tones and tiny embellishments.",
        "price": 750,
        "originalPrice": 1250
    },
    {
        "id": 4,
        "name": "Pink Floral Art",
        "description": "Soft pink nails with maroon and berry-toned floral and swirl designs, glossy finish.",
        "price": 750,
        "originalPrice": 1250
    },
    {
        "id": 5,
        "name": "Pastel Purple Waves",
        "description": "Light lavender abstract wave French tips over a natural nude base.",
        "price": 550,
        "originalPrice": 1050
    },
    {
        "id": 6,
        "name": "Chrome Pink Tips",
        "description": "Nude nails with reflective pink chrome tips for a subtle but shiny look.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 7,
        "name": "Creamy Floral French",
        "description": "Soft yellow French tips with one accent nail featuring a delicate flower design.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 8,
        "name": "Gold Baroque Style",
        "description": "Elegant nude nails decorated with ornate raised gold floral patterns.",
        "price": 899.98,
        "originalPrice": 1399.98
    },
    {
        "id": 9,
        "name": "Sparkly Gold-Trimmed French",
        "description": "Pinkish nude nails with silver glitter French tips outlined in shiny gold.",
        "price": 900,
        "originalPrice": 1400
    },
    {
        "id": 10,
        "name": "Celestial Metallic Art",
        "description": "Nude base nails with gold and silver 3D celestial designs including stars, moons, and a sun.",
        "price": 899.99,
        "originalPrice": 1399.99
    },
    {
        "id": 11,
        "name": "Soft Pink Shimmer",
        "description": "Light pink almond nails with a delicate sparkly gradient and a tiny silver bow accent.",
        "price": 1100,
        "originalPrice": 1600
    },
    {
        "id": 12,
        "name": "Cute Hello Kitty Nails",
        "description": "Glossy nails featuring 3D Hello Kitty faces, cherries, and red/black bow designs.",
        "price": 1200,
        "originalPrice": 1700
    },
    {
        "id": 13,
        "name": "Mixed Press-On Set",
        "description": "A collection of gradient press-on nails in warm tones paired with earthy, marble-style manicures.",
        "price": 1250,
        "originalPrice": 1750
    },
    {
        "id": 14,
        "name": "White & Gold Abstract Tips",
        "description": "Nude nails with white French tips outlined by flowing metallic gold lines.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 15,
        "name": "Black Gothic French Tips",
        "description": "Sharp black French tips with silver studs and a jeweled cross accent.",
        "price": 900,
        "originalPrice": 1400
    },
    {
        "id": 16,
        "name": "Pearl Chrome Nails",
        "description": "Sleek almond nails coated in a smooth pearlescent chrome finish.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 17,
        "name": "Tortoise & Chocolate Mix",
        "description": "Deep brown glossy nails paired with tortoiseshell patterned accents.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 18,
        "name": "Pink Sheer Overlay",
        "description": "Transparent pink nails with a shiny reflective overlay and soft oval cut-out design.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 19,
        "name": "Leopard French Tips",
        "description": "Nude pink nails finished with subtle animal-print tips for a chic wild touch.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 20,
        "name": "Plum Cat-Eye Glow",
        "description": "Deep plum magnetic cat-eye nails with a smooth gradient shine.",
        "price": 900,
        "originalPrice": 1400
    },
    {
        "id": 21,
        "name": "Soft Pink Pastel Nails",
        "description": "Smooth square nails painted in a light baby-pink shade.",
        "price": 550,
        "originalPrice": 1050
    },
    {
        "id": 22,
        "name": "Red Cat-Eye Shine",
        "description": "Deep red almond nails with a glowing cat-eye shimmer effect.",
        "price": 900,
        "originalPrice": 1400
    },
    {
        "id": 23,
        "name": "Chocolate Swirl Tips",
        "description": "Nude nails with rich brown abstract French tips.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 24,
        "name": "Burgundy Bows & Dots",
        "description": "Matte and glossy burgundy nails featuring cute bows and polka-dots.",
        "price": 750,
        "originalPrice": 1250
    },
    {
        "id": 25,
        "name": "Red French Tips",
        "description": "Nude almond nails finished with bold glossy red tips.",
        "price": 750,
        "originalPrice": 1250
    },
    {
        "id": 26,
        "name": "Pearl Chrome Nails",
        "description": "Highly reflective, pearly chrome nails with a soft glow.",
        "price": 900,
        "originalPrice": 1400
    },
    {
        "id": 27,
        "name": "French Pedicure",
        "description": "Clean nude toes with crisp white French tips.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 28,
        "name": "Nail Adhesive Tabs",
        "description": "Clear sticky tabs used for applying press-on nails.",
        "price": 60,
        "originalPrice": 560
    },
    {
        "id": 29,
        "name": "Nail Glue Pens",
        "description": "Pink nail glue tubes designed for securing press-on or acrylic nails.",
        "price": 99,
        "originalPrice": 599
    },
    {
        "id": 30,
        "name": "Mauve & Floral Nails",
        "description": "Soft mauve nails paired with delicate hand-painted floral accents for a feminine look.",
        "price": 450,
        "originalPrice": 950
    },
    {
        "id": 31,
        "name": "White French Tip with 3D Flowers",
        "description": "Classic white French tips enhanced with pearls and 3D floral designs.",
        "price": 800,
        "originalPrice": 1099
    },
    {
        "id": 32,
        "name": "Deep Red Glossy Nails",
        "description": "Bold dark red almond nails with subtle metallic bow accents for elegance.",
        "price": 599,
        "originalPrice": 999
    },
    {
        "id": 33,
        "name": "Pastel Rainbow French Tips",
        "description": "Natural base with colorful pastel French tips for a fun, playful vibe.",
        "price": 499,
        "originalPrice": 999
    },
    {
        "id": 34,
        "name": "Red Nails with Heart Accents",
        "description": "Shiny deep red nails decorated with cute white heart designs.",
        "price": 450,
        "originalPrice": 950
    },
    {
        "id": 35,
        "name": "Bronze Metallic Nails",
        "description": "Warm bronze-brown nails with a soft metallic sheen for a classy finish.",
        "price": 499,
        "originalPrice": 999
    },
    {
        "id": 36,
        "name": "Rose Gold Pearl-Toe Pedicure",
        "description": "Shimmery rose-gold toenails paired with delicate pearl jewelry.",
        "price": 750,
        "originalPrice": 1250
    },
    {
        "id": 37,
        "name": "Wine Red French Tips",
        "description": "Nude base nails featuring bold wine-red French tips for a chic contrast.",
        "price": 899,
        "originalPrice": 1399
    },
    {
        "id": 38,
        "name": "Gold Chrome & Foil Nails",
        "description": "Nude-toned nails detailed with gold chrome tips and foil accents.",
        "price": 699,
        "originalPrice": 1199
    },
    {
        "id": 39,
        "name": "Pure White Pedicure",
        "description": "Clean and glossy white toenails for a fresh, polished look.",
        "price": 499,
        "originalPrice": 999
    },
    {
        "id": 40,
        "name": "Red Floral Art Nails",
        "description": "Nude base with elegant red floral designs outlined in gold.",
        "price": 899,
        "originalPrice": 1399
    },
    {
        "id": 41,
        "name": "Bright Mixed-Pattern Nails",
        "description": "Fun, colorful designs featuring strawberries, hearts, swirls, and checker patterns.",
        "price": 450,
        "originalPrice": 950
    },
    {
        "id": 42,
        "name": "Leopard & Blue Accent Nails",
        "description": "Nude nails with leopard print, gold-lined shapes, and metallic blue accents.",
        "price": 750,
        "originalPrice": 1250
    },
    {
        "id": 43,
        "name": "Blue Star & Wave Nails",
        "description": "Ocean-inspired blue designs with star art and wave patterns.",
        "price": 499,
        "originalPrice": 999
    },
    {
        "id": 44,
        "name": "Glitter Pink Nails with Bows",
        "description": "Soft pink glitter nails decorated with sparkling bow charms.",
        "price": 1000,
        "originalPrice": 1500
    },
    {
        "id": 45,
        "name": "Golden Sunburst Nails",
        "description": "Nude marble nails with gold sunburst designs and tiny gem accents.",
        "price": 450,
        "originalPrice": 950
    },
    {
        "id": 46,
        "name": "Blue Evil Eye Nails",
        "description": "Nude base with blue French tips and evil-eye themed designs.",
        "price": 1000,
        "originalPrice": 1500
    },
    {
        "id": 47,
        "name": "Gold-Tipped Pink Nails",
        "description": "Soft pink nails with shiny metallic gold French tips and star accents.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 48,
        "name": "Blue & Gold Marble Nails",
        "description": "Pink base featuring deep blue marble tips with gold foil detailing.",
        "price": 700,
        "originalPrice": 1200
    },
    {
        "id": 49,
        "name": "Elegant Floral & Jewel Nails",
        "description": "Nude nails adorned with 3D flowers, pearls, and festive jewel accents.",
        "price": 1500,
        "originalPrice": 2000
    },
    {
        "id": 50,
        "name": "Blue & Rose Vintage Floral Nails",
        "description": "Elegant vintage-style nails with blue botanical patterns and soft pink roses accented by gold detailing.",
        "price": 1200,
        "originalPrice": 1700
    },
    {
        "id": 51,
        "name": "Purple Ombre Glow Nails",
        "description": "Soft purple ombre nails with a glossy finish, creating a smooth and radiant gradient look.",
        "price": 499,
        "originalPrice": 999
    },
    {
        "id": 52,
        "name": "Burgundy Glitter-Edge Nails",
        "description": "Deep burgundy nails outlined with a fine silver glitter border for a bold and glamorous style.",
        "price": 450,
        "originalPrice": 950
    },
    {
        "id": 53,
        "name": "Soft Blue Floral Pattern Nails",
        "description": "Nude-toned nails decorated with delicate blue floral designs for a subtle and charming botanical look.",
        "price": 700,
        "originalPrice": 1200
    }
];

        // Get all nail products
        const nailProducts = await Product.find({ category: "nails" });

        const updatePromises = nailProducts.map(async (product) => {
            const imageMatch = product.images[0].match(/nail(\d+)\.jpg/);
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
            message: `Successfully updated ${successCount} nail products with full local data`,
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
}