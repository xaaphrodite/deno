import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

const client = new MongoClient();
try {
  await client.connect("mongodb://127.0.0.1:27017/");
  console.log("MongoDB Connected..");
} catch (error) {
  console.log(error);
}
const db = client.database(Deno.env.get("DB_DATABASE"));

export { db };

//? notUsed