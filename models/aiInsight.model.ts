import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAiInsight extends Document {
  reportId: mongoose.Schema.Types.ObjectId;
  summaryEnglish: string;
  summaryUrdu: string; // Roman Urdu explanation [cite: 11, 29]
  abnormalValues: string[]; // e.g., ["Hb low", "WBC high"] [cite: 28]
  doctorQuestions: string[]; // Suggested questions for doctor [cite: 30]
  suggestions: string; // Food or home remedies [cite: 31, 32]
}

const AiInsightSchema: Schema<IAiInsight> = new Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true },
  summaryEnglish: { type: String, required: true },
  summaryUrdu: { type: String, required: true },
  abnormalValues: [{ type: String }],
  doctorQuestions: [{ type: String }],
  suggestions: { type: String },
}, { timestamps: true });

const AiInsight = (mongoose.models.AiInsight as Model<IAiInsight>) || mongoose.model<IAiInsight>('AiInsight', AiInsightSchema);
export default AiInsight;