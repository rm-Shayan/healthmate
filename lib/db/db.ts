import mongoose from "mongoose";

// Aapki .env.local se match hona chahiye
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Dost, .env.local mein MONGODB_URI ya MONGO_URI define karein!");
}

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongoose;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Yahan MONGODB_URI upar wale variable se le raha hai
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected (Singleton)");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;