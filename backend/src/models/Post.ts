import { Schema, model, Document, Types } from 'mongoose'

export interface IPost extends Document {
  user: Types.ObjectId
  title: string
  description?: string
  image?: string
  reactions: {
    flex: number
    fire: number
    clap: number
  }
}

const PostSchema = new Schema<IPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    image: String,
    reactions: {
      flex: { type: Number, default: 0 },
      fire: { type: Number, default: 0 },
      clap: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
)

export default model<IPost>('Post', PostSchema)
