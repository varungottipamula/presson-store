import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    originalPrice?: number; // MRP - for showing discount
    category: string; // 'nails', 'accessories', etc.
    images: string[];
    stock: number;
    shapes?: string[]; // e.g., 'coffin', 'almond'
    sizes?: string[]; // e.g., 'XS', 'S', 'M', 'L', 'Custom'
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        price: { type: Number, required: true },
        originalPrice: { type: Number, required: false }, // MRP for discount display
        category: { type: String, required: true, index: true },
        images: { type: [String], required: true },
        stock: { type: Number, required: true, default: 0 },
        shapes: { type: [String], default: [] },
        sizes: { type: [String], default: [] },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
