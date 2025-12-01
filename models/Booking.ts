import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
    service: string;
    date: Date;
    time: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
    {
        service: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        customerName: { type: String, required: true },
        customerEmail: { type: String, required: true },
        customerPhone: { type: String, required: true },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending',
        },
        notes: String,
    },
    { timestamps: true }
);

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
