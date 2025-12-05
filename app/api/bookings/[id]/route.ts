import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { status } = await req.json();
        const { id } = await params;

        console.log('Updating booking:', id, 'to status:', status);

        // If status is completed or cancelled, delete the booking instead of updating
        if (status === 'completed' || status === 'cancelled') {
            const deletedBooking = await Booking.findByIdAndDelete(id);

            if (!deletedBooking) {
                console.log('Booking not found:', id);
                return NextResponse.json(
                    { success: false, message: 'Booking not found' },
                    { status: 404 }
                );
            }

            const message = status === 'completed'
                ? 'Booking completed and removed'
                : 'Booking cancelled and removed';

            console.log(message + ':', deletedBooking._id);

            return NextResponse.json({
                success: true,
                message,
                deleted: true,
            });
        }

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!booking) {
            console.log('Booking not found:', id);
            return NextResponse.json(
                { success: false, message: 'Booking not found' },
                { status: 404 }
            );
        }

        console.log('Booking updated successfully:', booking._id, 'new status:', booking.status);

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update booking', error: String(error) },
            { status: 500 }
        );
    }
}
