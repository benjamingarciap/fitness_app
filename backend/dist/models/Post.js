import { Schema, model } from 'mongoose';
const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    image: String,
    reactions: {
        flex: { type: Number, default: 0 },
        fire: { type: Number, default: 0 },
        clap: { type: Number, default: 0 }
    }
}, { timestamps: true });
export default model('Post', PostSchema);
