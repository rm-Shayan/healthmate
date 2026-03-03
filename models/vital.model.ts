import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVitals extends Document {
  user: mongoose.Schema.Types.ObjectId;
  type: 'BP' | 'Sugar' | 'Weight' | 'Other'; // [cite: 44]
  value: string; // e.g., "130/80" [cite: 14]
  unit?: string; // e.g., "mg/dL"
  note?: string;
  readingDate: Date;
}

const VitalsSchema: Schema<IVitals> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['BP', 'Sugar', 'Weight', 'Other'], required: true },
  value: { type: String, required: true },
  unit: { type: String },
  note: { type: String },
  readingDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Vitals = (mongoose.models.Vitals as Model<IVitals>) || mongoose.model<IVitals>('Vitals', VitalsSchema);
export default Vitals;