import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Url from '@/models/Url';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { shortCode } = await params;

        const urlEntry = await Url.findOne({ shortCode });

        if (!urlEntry) {
            return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
            // Or redirect to a 404 page: return NextResponse.redirect(new URL('/404', req.url));
        }

        // Increment clicks asynchronously (fire and forget for speed, or await for accuracy)
        // Awaiting here to ensure consistency but might add latency.
        urlEntry.clicks++;
        await urlEntry.save();

        return NextResponse.redirect(urlEntry.originalUrl);
    } catch (error) {
        console.error('Error handling redirect:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
