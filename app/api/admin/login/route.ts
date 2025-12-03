import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'jerrysnailstudio';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Riddhijayesh2025';

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const response = NextResponse.json({ success: true });

            // Set a cookie for the session
            // In a real app, use a secure, signed token (JWT, etc.)
            // For this simple case, we'll set a simple flag
            response.cookies.set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return response;
        }

        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'An error occurred' },
            { status: 500 }
        );
    }
}
