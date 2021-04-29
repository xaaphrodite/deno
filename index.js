import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import web from "./src/routes/web.js";
import api from "./src/routes/api.js";

/*
|--------------------------------------------------------------------------
| deno.land
|--------------------------------------------------------------------------
|
| Author    : rasetiansyah
| Github    : https://github.com/xaaphrodite
| Instagram : https://www.instagram.com/rasetiansyah_
| Discord   : https://discordapp.com/users/742543110856507482
|
*/

const App = new Application();
const PORT = 3000 || Deno.env.get("SERVER_PORT");

App.use(async (context, next) => {
  await next();
  console.log(`${context.request.method} ${context.request.url}`);
})
  .use(web.routes())
  .use(web.allowedMethods())
  .use(api.routes())
  .use(api.allowedMethods());

console.log(`denoland server is running on http://localhost:${PORT}/`);

const client = new MongoClient();
try {
  await client.connect("mongodb://127.0.0.1:27017/");
  console.log("Go Ahead..");
} catch (error) {
  console.log(error);
}
const db = client.database(Deno.env.get("DB_DATABASE"));
const user = db.collection("users");

export { Bson, db, user };

await App.listen({ port: PORT });
