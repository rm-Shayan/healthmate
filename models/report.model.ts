import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReport extends Document {
  user: mongoose.Schema.Types.ObjectId;
  fileName: string;
  fileUrl: string; // Cloudinary ya Firebase ka link [cite: 20]
  fileType: 'image' | 'pdf';
  category: string; // e.g., Blood Test, X-Ray, Prescription [cite: 27]
  reportDate: Date;
}

const ReportSchema: Schema<IReport> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['image', 'pdf'], required: true },
  category: { type: String, default: 'General' },
  reportDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Report = (mongoose.models.Report as Model<IReport>) || mongoose.model<IReport>('Report', ReportSchema);
export default Report;