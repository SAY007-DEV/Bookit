import mongoose from 'mongoose'

export async function connectDB(uri) {
  if (mongoose.connection.readyState === 1) return mongoose.connection
  mongoose.set('strictQuery', true)
  await mongoose.connect(uri, { dbName: process.env.MONGO_DB || 'bookit' })
  return mongoose.connection
}


