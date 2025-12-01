import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Map product names to their images
        const updates = [
            { name: 'Ad stone diamond', image: '/necklaces/necklace7.jpg' },
            { name: 'Pearl jewel', image: '/necklaces/necklace8.jpg' },
            { name: 'Water drop 5pc set', image: '/necklaces/necklace9.jpg' },
            { name: 'pearl 4pc set', image: '/necklaces/neckalce10.jpg' }, // Note: typo in filename
            { name: 'Imitation', image: '/necklaces/necklace11.jpg' },
            { name: 'Limitation rhinestone', image: '/necklaces/necklace13.jpg' },
        ];

        const results = [];

        for (const update of updates) {
            const result = await Product.findOneAndUpdate(
                { name: update.name, category: 'necklace' },
                { images: [update.image] },
                { new: true }
            );

            if (result) {
                results.push({ success: true, name: update.name, image: update.image });
            } else {
                results.push({ success: false, name: update.name, error: 'Not found' });
            }
        }

        return NextResponse.json({
            success: true,
            message: `Updated ${results.filter(r => r.success).length} necklace products with images`,
            results
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
