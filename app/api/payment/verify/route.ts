import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: NextRequest) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderData,
        } = await req.json();

        // Verify signature
        const keySecret = process.env.RAZORPAY_KEY_SECRET || 'your_secret_key_here';
        const generated_signature = crypto
            .createHmac('sha256', keySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json(
                { success: false, message: 'Invalid signature' },
                { status: 400 }
            );
        }

        // Save order to database
        await dbConnect();

        const order = await Order.create({
            user: orderData.user,
            products: orderData.products,
            totalAmount: orderData.totalAmount,
            status: 'processing',
            paymentInfo: {
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                method: 'online',
                status: 'paid',
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Payment verified and order created',
            orderId: order._id,
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { success: false, message: 'Payment verification failed' },
            { status: 500 }
        );
    }
}
