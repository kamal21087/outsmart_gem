import { Schema, model, Document } from 'mongoose';

interface IGamelog extends Document {
    playerId: string;
    userQuestions: string[];
    aiResponses: string[];
    results: string;
    score: number;
    createdAt: Date;
}

const gamelogSchema = new Schema<IGamelog>(
    {
        playerId: {
            type: String,
            required: true,
            trim: true,
        },
        userQuestions: {
            type: [String],
            required: true,
        },
        aiResponses: {
            type: [String],
            required: true,
        },
        results: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const Gamelog = model<IGamelog>('Gamelog', gamelogSchema);

export default Gamelog;