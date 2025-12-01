import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST() {
    try {
        await dbConnect();

        const earringsUpdates = [
            {
                name: 'Crystal floral drop earrings',
                description: 'Elegant gold earrings featuring a sparkling crystal-studded circle with a curved rhinestone arc.'
            },
            {
                name: 'Pearl rose earrings',
                description: 'Gold drop earrings with pearl studs and a tiny purple rose encased in a glossy, irregular gold frame.'
            }
        ];

        // Get all earrings products sorted by creation date (oldest first)
        const earrings = await Product.find({ category: 'earrings' }).sort({ createdAt: 1 });

        if (earrings.length < earringsUpdates.length) {
            return NextResponse.json({
                success: false,
                message: `Only found ${earrings.length} earrings products, but need ${earringsUpdates.length}`
            }, { status: 400 });
        }

        const updatePromises = earrings.slice(0, earringsUpdates.length).map((earring, index) => {
            return Product.findByIdAndUpdate(
                earring._id,
                {
                    name: earringsUpdates[index].name,
                    description: earringsUpdates[index].description
                },
                { new: true }
            );
        });

        const updatedEarrings = await Promise.all(updatePromises);

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${updatedEarrings.length} earrings products`,
            updatedProducts: updatedEarrings.map(e => ({ id: e._id, name: e.name }))
        });

    } catch (error) {
        console.error('Error updating earrings:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update earrings',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
