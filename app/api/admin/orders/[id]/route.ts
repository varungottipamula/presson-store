import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import crypto from 'crypto';

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { status, paymentStatus } = await req.json();
        const { id } = await params;

        // If status is delivered or cancelled, delete the order instead of updating
        if (status === 'delivered' || status === 'cancelled') {
            const deletedOrder = await Order.findByIdAndDelete(id);

            if (!deletedOrder) {
                return NextResponse.json(
                    { success: false, message: 'Order not found' },
                    { status: 404 }
                );
            }

            const message = status === 'delivered'
                ? 'Order delivered and removed'
                : 'Order cancelled and removed';

            return NextResponse.json({
                success: true,
                message,
                deleted: true,
            });
        }

        const updateData: Record<string, string> = {};
        if (status) updateData.status = status;
        if (paymentStatus) updateData['paymentInfo.status'] = paymentStatus;

        // Generate delivery confirmation token if status is being set to shipped
        if (status === 'shipped') {
            updateData.deliveryConfirmationToken = crypto.randomBytes(32).toString('hex');
        }

        const order = await Order.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            order,
        });
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update order' },
            { status: 500 }
        );
    }
}
