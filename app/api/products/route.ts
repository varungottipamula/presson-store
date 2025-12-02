import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {};
        if (category) {
            query.category = category;
        }
        if (featured === 'true') {
            query.isFeatured = true;
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Ensure originalPrice is set for discount display
        if (!body.originalPrice && body.price) {
            // Default logic: Set original price to be 500 more than selling price
            // This ensures a consistent discount appearance
            body.originalPrice = Number(body.price) + 500;
        }

        const product = await Product.create(body);
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
