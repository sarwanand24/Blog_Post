import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

// ✅ Declare global extension
declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  } | undefined;
}

// ✅ Initialize only once
const globalMongoose = globalThis as typeof globalThis & {
  mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
};

if (!globalMongoose.mongoose) {
  globalMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalMongoose.mongoose;

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
