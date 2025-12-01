import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const updates = [
            {
                name: 'Golden with diamond set of rings',
                image: '/rings/ring10.jpg'
            },
            {
                name: 'ring',
                image: '/rings/ring11.jpg'
            }
        ];

        const results = [];

        for (const update of updates) {
            const result = await Product.findOneAndUpdate(
                { name: update.name, category: 'rings' },
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
            message: `Updated ${results.filter(r => r.success).length} ring products`,
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
