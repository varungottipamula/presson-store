import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import shortid from 'shortid';

const razorpay = new Razorpay({
    key_id: process.env.rzp_test_RmHvdC5uvzWTWN!,
    key_secret: process.env.EzV1RIdOhfEfiOr0fDzQtrGN!,
});

export async function POST(request: Request) {
    try {
        const { amount } = await request.json();

        const payment_capture = 1;
        const currency = 'INR';
        const options = {
            amount: (amount * 100).toString(), // Amount in paise
            currency,
            receipt: shortid.generate(),
            payment_capture,
        };

        const response = await razorpay.orders.create(options);
        return NextResponse.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
