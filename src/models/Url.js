import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, 'Please provide a URL.'],
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Url || mongoose.model('Url', UrlSchema);
