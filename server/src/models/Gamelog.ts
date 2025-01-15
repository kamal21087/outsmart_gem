import { Schema, model, Document, Types} from 'mongoose';

interface IGamelog extends Document {
    playerId: Types.ObjectId;
    userQuestions: string[];
    aiResponses: string[];
    results: string;
    score: number;
    createdAt: Date;
}

const gamelogSchema = new Schema<IGamelog>(
    {
        playerId: {
            type: Schema.Types.ObjectId,
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