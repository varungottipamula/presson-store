import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function GET() {
    try {
        await dbConnect();

        // Fetch all orders, sorted by most recent first
        const orders = await Order.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
