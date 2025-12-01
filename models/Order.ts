import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
    user?: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    products: {
        product?: mongoose.Types.ObjectId;
        name: string;
        quantity: number;
        price: number;
        size?: string;
        shape?: string;
    }[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentInfo: {
        razorpayOrderId?: string;
        razorpayPaymentId?: string;
        method?: string;
        status: 'pending' | 'paid' | 'failed';
    };
    deliveryConfirmationToken?: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        user: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
        },
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product', required: false },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                size: String,
                shape: String,
            },
        ],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        paymentInfo: {
            razorpayOrderId: String,
            razorpayPaymentId: String,
            method: String,
            status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
        },
        deliveryConfirmationToken: String,
    },
    { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
