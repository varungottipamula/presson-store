import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const nailData = [
            { name: "Blue Wavy Tips", description: "Nude base nails with bold electric-blue wavy French tips." },
            { name: "Red & Gold Glam", description: "Transparent nude nails featuring red French tips mixed with gold 3D metallic accents." },
            { name: "Maroon Marble Shine", description: "Deep maroon marble details blended with glossy pink tones and tiny embellishments." },
            { name: "Pink Floral Art", description: "Soft pink nails with maroon and berry-toned floral and swirl designs, glossy finish." },
            { name: "Pastel Purple Waves", description: "Light lavender abstract wave French tips over a natural nude base." },
            { name: "Chrome Pink Tips", description: "Nude nails with reflective pink chrome tips for a subtle but shiny look." },
            { name: "Creamy Floral French", description: "Soft yellow French tips with one accent nail featuring a delicate flower design." },
            { name: "Gold Baroque Style", description: "Elegant nude nails decorated with ornate raised gold floral patterns." },
            { name: "Sparkly Gold-Trimmed French", description: "Pinkish nude nails with silver glitter French tips outlined in shiny gold." },
            { name: "Celestial Metallic Art", description: "Nude base nails with gold and silver 3D celestial designs including stars, moons, and a sun." },
            { name: "Soft Pink Shimmer", description: "Light pink almond nails with a delicate sparkly gradient and a tiny silver bow accent." },
            { name: "Cute Hello Kitty Nails", description: "Glossy nails featuring 3D Hello Kitty faces, cherries, and red/black bow designs." },
            { name: "Mixed Press-On Set", description: "A collection of gradient press-on nails in warm tones paired with earthy, marble-style manicures." },
            { name: "White & Gold Abstract Tips", description: "Nude nails with white French tips outlined by flowing metallic gold lines." },
            { name: "Black Gothic French Tips", description: "Sharp black French tips with silver studs and a jeweled cross accent." },
            { name: "Pearl Chrome Nails", description: "Sleek almond nails coated in a smooth pearlescent chrome finish." },
            { name: "Tortoise & Chocolate Mix", description: "Deep brown glossy nails paired with tortoiseshell patterned accents." },
            { name: "Pink Sheer Overlay", description: "Transparent pink nails with a shiny reflective overlay and soft oval cut-out design." },
            { name: "Leopard French Tips", description: "Nude pink nails finished with subtle animal-print tips for a chic wild touch." },
            { name: "Plum Cat-Eye Glow", description: "Deep plum magnetic cat-eye nails with a smooth gradient shine." },
            { name: "Soft Pink Pastel Nails", description: "Smooth square nails painted in a light baby-pink shade." },
            { name: "Red Cat-Eye Shine", description: "Deep red almond nails with a glowing cat-eye shimmer effect." },
            { name: "Chocolate Swirl Tips", description: "Nude nails with rich brown abstract French tips." },
            { name: "Burgundy Bows & Dots", description: "Matte and glossy burgundy nails featuring cute bows and polka-dots." },
            { name: "Red French Tips", description: "Nude almond nails finished with bold glossy red tips." },
            { name: "Pearl Chrome Nails", description: "Highly reflective, pearly chrome nails with a soft glow." },
            { name: "French Pedicure", description: "Clean nude toes with crisp white French tips." },
            { name: "Nail Adhesive Tabs", description: "Clear sticky tabs used for applying press-on nails." },
            { name: "Nail Glue Pens", description: "Pink nail glue tubes designed for securing press-on or acrylic nails." },
            { name: "Mauve & Floral Nails", description: "Soft mauve nails paired with delicate hand-painted floral accents for a feminine look." },
            { name: "White French Tip with 3D Flowers", description: "Classic white French tips enhanced with pearls and 3D floral designs." },
            { name: "Deep Red Glossy Nails", description: "Bold dark red almond nails with subtle metallic bow accents for elegance." },
            { name: "Pastel Rainbow French Tips", description: "Natural base with colorful pastel French tips for a fun, playful vibe." },
            { name: "Red Nails with Heart Accents", description: "Shiny deep red nails decorated with cute white heart designs." },
            { name: "Bronze Metallic Nails", description: "Warm bronze-brown nails with a soft metallic sheen for a classy finish." },
            { name: "Rose Gold Pearl-Toe Pedicure", description: "Shimmery rose-gold toenails paired with delicate pearl jewelry." },
            { name: "Wine Red French Tips", description: "Nude base nails featuring bold wine-red French tips for a chic contrast." },
            { name: "Gold Chrome & Foil Nails", description: "Nude-toned nails detailed with gold chrome tips and foil accents." },
            { name: "Pure White Pedicure", description: "Clean and glossy white toenails for a fresh, polished look." },
            { name: "Red Floral Art Nails", description: "Nude base with elegant red floral designs outlined in gold." },
            { name: "Bright Mixed-Pattern Nails", description: "Fun, colorful designs featuring strawberries, hearts, swirls, and checker patterns." },
            { name: "Leopard & Blue Accent Nails", description: "Nude nails with leopard print, gold-lined shapes, and metallic blue accents." },
            { name: "Blue Star & Wave Nails", description: "Ocean-inspired blue designs with star art and wave patterns." },
            { name: "Glitter Pink Nails with Bows", description: "Soft pink glitter nails decorated with sparkling bow charms." },
            { name: "Golden Sunburst Nails", description: "Nude marble nails with gold sunburst designs and tiny gem accents." },
            { name: "Blue Evil Eye Nails", description: "Nude base with blue French tips and evil-eye themed designs." },
            { name: "Gold-Tipped Pink Nails", description: "Soft pink nails with shiny metallic gold French tips and star accents." },
            { name: "Blue & Gold Marble Nails", description: "Pink base featuring deep blue marble tips with gold foil detailing." },
            { name: "Elegant Floral & Jewel Nails", description: "Nude nails adorned with 3D flowers, pearls, and festive jewel accents." },
            { name: "Blue & Rose Vintage Floral Nails", description: "Elegant vintage-style nails with blue botanical patterns and soft pink roses accented by gold detailing." },
            { name: "Purple Ombre Glow Nails", description: "Soft purple ombre nails with a glossy finish, creating a smooth and radiant gradient look." },
            { name: "Burgundy Glitter-Edge Nails", description: "Deep burgundy nails outlined with a fine silver glitter border for a bold and glamorous style." },
            { name: "Soft Blue Floral Pattern Nails", description: "Nude-toned nails decorated with delicate blue floral designs for a subtle and charming botanical look." }
        ];

        // Get all nail products sorted by their image number
        const nailProducts = await Product.find({ category: "nails" }).sort({ images: 1 });

        if (nailProducts.length !== 53) {
            return NextResponse.json({
                success: false,
                message: `Expected 53 nail products but found ${nailProducts.length}`
            }, { status: 400 });
        }

        // Update each product
        const updatePromises = nailProducts.map(async (product, index) => {
            // Extract the nail number from the image path (e.g., /nails/nail1.jpg -> 1)
            const imageMatch = product.images[0].match(/nail(\d+)\.jpg/);
            if (!imageMatch) return null;

            const nailNumber = parseInt(imageMatch[1]);
            const dataIndex = nailNumber - 1; // Array is 0-indexed

            if (dataIndex < 0 || dataIndex >= nailData.length) return null;

            return await Product.findByIdAndUpdate(
                product._id,
                {
                    name: nailData[dataIndex].name,
                    description: nailData[dataIndex].description
                },
                { new: true }
            );
        });

        const results = await Promise.all(updatePromises);
        const successCount = results.filter(r => r !== null).length;

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${successCount} nail products with custom names and descriptions`,
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
