import mongoose, { Schema, Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 1. Interface definition
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  isVerified: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  avatar?: string;
  avatarPublicId?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// 2. Schema definition (Schema ko destructured import se use kiya hai)
const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  refreshToken: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  avatar: { type: String },          // Cloudinary URL
  avatarPublicId: { type: String },  // Cloudinary public_id
}, { timestamps: true });

// 3. Password Hashing (Fix: properly handling async without next)
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return 

  try {
    this.password = await bcrypt.hash(this.password, 10);
   return 
  } catch (error: any) {
   return  error
  }
});

// 4. Methods implementation
UserSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" }
  );
};

UserSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" }
  );
};

// 5. Model Export (Fix: Corrected Type Casting)
const UserModel = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export default UserModel;