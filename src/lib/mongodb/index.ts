import { Db, MongoClient, MongoClientOptions } from "mongodb"

const { MONGODB_CONN_STR, MONGODB_DB_NAME } = process.env

const uri = `${MONGODB_CONN_STR}/${MONGODB_DB_NAME}?retryWrites=true&w=majority`

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

type MongoDbConnection = {
  // MongoDB client
  // For more info see: https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html
  client: MongoClient

  // MongoDB database
  // For more info see: https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html
  db: Db
}

export const connect = async (): Promise<MongoDbConnection> => {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    }
  }

  // Connect to the DB cluster
  // For more info see: https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html#.connect
  const options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  const client = await MongoClient.connect(uri, options)
  cachedClient = client

  // Get the DB instance
  // For more info see: https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html#db
  const db = await client.db(MONGODB_DB_NAME)
  cachedDb = db

  return {
    client,
    db,
  }
}
