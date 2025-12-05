import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function GET() {
    try {
        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        console.log('Testing Razorpay Configuration...');
        console.log('Key ID:', key_id ? `${key_id.slice(0, 8)}...` : '❌ MISSING');
        console.log('Key Secret:', key_secret ? `${key_secret.slice(0, 8)}...` : '❌ MISSING');

        if (!key_id || !key_secret) {
            return NextResponse.json({
                success: false,
                error: 'Missing Razorpay credentials',
                details: {
                    keyIdPresent: !!key_id,
                    keySecretPresent: !!key_secret,
                },
                instructions: 'Add NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env.local file',
            }, { status: 500 });
        }

        const razorpay = new Razorpay({
            key_id: key_id,
            key_secret: key_secret,
        });

        // Try to create a small test order
        const testOrder = await razorpay.orders.create({
            amount: 100, // ₹1 in paise
            currency: 'INR',
            receipt: `test_${Date.now()}`,
        });

        console.log('✅ Razorpay test order created successfully:', testOrder.id);

        return NextResponse.json({
            success: true,
            message: 'Razorpay credentials are valid and working!',
            testOrder: {
                id: testOrder.id,
                amount: testOrder.amount,
                currency: testOrder.currency,
                status: testOrder.status,
            },
            keyIdUsed: `${key_id.slice(0, 8)}...`,
            isTestMode: key_id.startsWith('rzp_test_'),
        });
    } catch (error: unknown) {
        console.error('Razorpay test failed:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorDetails = JSON.stringify(error, null, 2);

        return NextResponse.json({
            success: false,
            error: 'Razorpay API call failed',
            message: errorMessage,
            details: errorDetails,
            possibleCauses: [
                'Invalid API credentials',
                'Account not activated',
                'Network/firewall issues',
                'Razorpay service down',
            ],
        }, { status: 500 });
    }
}
