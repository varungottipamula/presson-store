import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST() {
    try {
        await dbConnect();

        const hairRubberUpdates = [
            {
                name: 'Mixed satin scrunchie set',
                description: 'A colorful collection of glossy satin scrunchies in a variety of rich shades.'
            },
            {
                name: 'Fluffy pastel scrunchies',
                description: 'Soft, plush scrunchies in light pink, cream, and cozy textured fabrics.'
            },
            {
                name: 'Pink satin scrunchie set',
                description: 'A bundle of silky scrunchies in gradient pink and blush tones.'
            },
            {
                name: 'Vintage cameo scrunchies',
                description: 'Elegant satin scrunchies decorated with gold-framed cameo rose charms in black and white designs.'
            }
        ];

        // Get all hair-rubber products sorted by creation date (oldest first)
        const hairRubbers = await Product.find({ category: 'hair-rubber' }).sort({ createdAt: 1 });

        if (hairRubbers.length < hairRubberUpdates.length) {
            return NextResponse.json({
                success: false,
                message: `Only found ${hairRubbers.length} hair-rubber products, but need ${hairRubberUpdates.length}`
            }, { status: 400 });
        }

        const updatePromises = hairRubbers.slice(0, hairRubberUpdates.length).map((hairRubber, index) => {
            return Product.findByIdAndUpdate(
                hairRubber._id,
                {
                    name: hairRubberUpdates[index].name,
                    description: hairRubberUpdates[index].description
                },
                { new: true }
            );
        });

        const updatedHairRubbers = await Promise.all(updatePromises);

        const validHairRubbers = updatedHairRubbers.filter((h): h is NonNullable<typeof h> => h !== null);

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${validHairRubbers.length} hair-rubber products`,
            updatedProducts: validHairRubbers.map(h => ({ id: h._id, name: h.name }))
        });

    } catch (error) {
        console.error('Error updating hair-rubber products:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update hair-rubber products',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
