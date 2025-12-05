import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json();

        // Initialize Razorpay with test credentials
        // User should replace these with their actual Razorpay credentials
        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        console.log("DEBUG: Loading Razorpay Keys...");
        console.log("DEBUG: Key ID:", key_id ? key_id.slice(0, 5) + "..." : "MISSING");
        console.log("DEBUG: Key Secret:", key_secret ? key_secret.slice(0, 5) + "..." : "MISSING");

        const razorpay = new Razorpay({
            key_id: key_id || 'rzp_test_xxxxxxxxxxxxxxxx',
            key_secret: key_secret || 'your_secret_key_here',
        });

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create order' },
            { status: 500 }
        );
    }
}
