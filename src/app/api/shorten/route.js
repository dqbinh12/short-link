import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import dbConnect from '@/lib/db';
import Url from '@/models/Url';

export async function POST(req) {
    try {
        await dbConnect();
        const { originalUrl } = await req.json();

        if (!originalUrl) {
            return NextResponse.json(
                { error: 'Please provide a URL' },
                { status: 400 }
            );
        }

        // Basic URL validation
        try {
            new URL(originalUrl);
        } catch (_) {
            return NextResponse.json(
                { error: 'Invalid URL format' },
                { status: 400 }
            );
        }

        // Check if URL already exists? Optional, but good practice to reuse if desired.
        // For now, let's create a new one every time to allow tracking individual shares if needed,
        // or keep it simple. Let's keep it simple and create new.

        const shortCode = nanoid(6); // Generate 6-char ID
        const newUrl = new Url({
            originalUrl,
            shortCode,
        });

        await newUrl.save();

        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
        const shortUrl = `${baseUrl}/${shortCode}`;

        return NextResponse.json({ shortUrl, shortCode }, { status: 201 });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
