import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.DB_USER;
const passwd = process.env.DB_PASSWD;
const databaseName = process.env.DB_NAME;

const uri = `mongodb+srv://${user}:${passwd}@cluster0.5lve0.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

async function mongoConnect(uriParams = uri) {
  try {
    const mongooseConnect = await mongoose.connect(uriParams);

    return mongooseConnect;
  } catch (err) {
    process.exit(1);
  }
}

export default mongoConnect;
