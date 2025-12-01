import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST() {
    try {
        await dbConnect();

        const ringUpdates = [
            {
                name: 'Leaf design ring',
                description: 'A delicate gold ring with crystal-studded leaf motifs arranged in a wrap style.'
            },
            {
                name: 'Vintage crown ring',
                description: 'An ornate silver ring with a raised center stone and intricate vintage detailing.'
            },
            {
                name: 'Princess-cut ring',
                description: 'A sparkling silver ring featuring a large princess-cut stone with crystal-embedded band.'
            },
            {
                name: 'Mixed gold ring set',
                description: 'A stylish set of gold rings with unique textures, crystals, and a bold emerald-green stone.'
            },
            {
                name: 'Pave dome ring',
                description: 'A rounded silver ring fully encrusted with tiny shimmering crystals.'
            },
            {
                name: 'Split-band solitaire',
                description: 'A silver ring with layered crystal-covered bands and a raised solitaire stone.'
            },
            {
                name: 'Halo solitaire set',
                description: 'A brilliant halo-style ring with a large center stone and matching crystal-studded band.'
            },
            {
                name: 'Luxury wedding set',
                description: 'A pair of thick, crystal-covered silver rings featuring a bold flower-like solitaire.'
            },
            {
                name: 'Cluster diamond ring',
                description: 'A dramatic silver ring topped with a dense cluster of sparkling stones and a raised centerpiece.'
            }
        ];

        // Get all ring products sorted by creation date (oldest first)
        const rings = await Product.find({ category: 'rings' }).sort({ createdAt: 1 });

        if (rings.length < ringUpdates.length) {
            return NextResponse.json({
                success: false,
                message: `Only found ${rings.length} ring products, but need ${ringUpdates.length}`
            }, { status: 400 });
        }

        const updatePromises = rings.slice(0, ringUpdates.length).map((ring, index) => {
            return Product.findByIdAndUpdate(
                ring._id,
                {
                    name: ringUpdates[index].name,
                    description: ringUpdates[index].description
                },
                { new: true }
            );
        });

        const updatedRings = await Promise.all(updatePromises);

        const validRings = updatedRings.filter((r): r is NonNullable<typeof r> => r !== null);

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${validRings.length} ring products`,
            updatedProducts: validRings.map(r => ({ id: r._id, name: r.name }))
        });

    } catch (error) {
        console.error('Error updating rings:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update rings',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
