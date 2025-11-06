import mongoose, { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  user: Schema.Types.ObjectId;
  refreshToken: string;
  expiresAt: Date;
  deviceInfo?: string;
  createdAt: Date;
}

const tokenSchema: Schema = new Schema<IToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    refreshToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    deviceInfo: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

// Automatically delete expired tokens
// tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Token = mongoose.model<IToken>('Token', tokenSchema);
