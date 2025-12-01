import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const bookingData = await req.json();

        const booking = await Booking.create(bookingData);

        return NextResponse.json({
            success: true,
            message: 'Booking created successfully',
            bookingId: (booking as any)._id,
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create booking' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();

        const bookings = await Booking.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            bookings,
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch bookings' },
            { status: 500 }
        );
    }
}
