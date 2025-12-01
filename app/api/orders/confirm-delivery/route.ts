import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Delivery confirmation token is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find order with this token
        const order = await Order.findOne({ deliveryConfirmationToken: token });

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Invalid or expired confirmation token' },
                { status: 404 }
            );
        }

        // Check if already delivered
        if (order.status === 'delivered') {
            return NextResponse.json(
                { success: false, message: 'Order already marked as delivered' },
                { status: 400 }
            );
        }

        // Update status to delivered
        order.status = 'delivered';
        order.deliveryConfirmationToken = undefined; // Clear token after use
        await order.save();

        return NextResponse.json({
            success: true,
            message: 'Delivery confirmed successfully',
            orderId: order._id,
        });
    } catch (error) {
        console.error('Error confirming delivery:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to confirm delivery' },
            { status: 500 }
        );
    }
}
