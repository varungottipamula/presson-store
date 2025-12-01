import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: NextRequest) {
    try {
        const orderData = await req.json();

        await dbConnect();

        const order = await Order.create({
            user: orderData.user,
            products: orderData.products,
            totalAmount: orderData.totalAmount,
            status: 'pending',
            paymentInfo: {
                method: orderData.paymentMethod || 'online',
                status: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Order created successfully',
            orderId: order._id,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to create order',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
