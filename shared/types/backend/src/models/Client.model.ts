// backend/src/models/Client.model.ts
import mongoose, { Schema, Document } from 'mongoose';
// Assuming you might put shared types in a directory accessible by both front/backend
// If not, define Client interface directly here or import from a backend-specific types file
import { Client as IClient } from '@shared/types';

export interface ClientDocument extends Omit<IClient, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  contactEmail: { type: String, required: true, unique: true, lowercase: true, trim: true },
  industry: { type: String, required: true },
  status: {
    type: String,
    enum: ['Lead', 'Active', 'Past', 'On Hold'],
    default: 'Lead',
  },
  // Add other fields from IClient
}, { timestamps: true });

export default mongoose.model<ClientDocument>('Client', ClientSchema);
