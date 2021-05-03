import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { Application, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import web from "./src/routes/web.js";
import api from "./src/routes/api.js";

/*
|--------------------------------------------------------------------------
| deno.land 1.0.2 additional request validation
|--------------------------------------------------------------------------
|
| Author    : rasetiansyah
| Github    : https://github.com/xaaphrodite
| Instagram : https://www.instagram.com/rasetiansyah_
| Discord   : https://discordapp.com/users/742543110856507482
|
*/

const App = new Application();
const HOST = Deno.env.get("SERVER_HOST") || "localhost";
const PORT = Deno.env.get("SERVER_PORT") || 3000;

App.use(async (context, next) => {
  await next();
  console.log(`${context.request.method} ${context.request.url}`);
})
  .use(
    oakCors({
      credentials: true,
      origin: /^.+localhost:(3000|8000|8080)$/,
    })
  )
  .use(api.routes())
  .use(api.allowedMethods())
  .use(async (context, next) => {
    await next();
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}`,
    });
  })
  .use(web.routes())
  .use(web.allowedMethods())
  .addEventListener("error", (feedback) => console.log(feedback.error));

console.log(`denoland server is running on http://${HOST}:${PORT}`);

const client = new MongoClient();
try {
  await client.connect(Deno.env.get("DB_HOST") || "mongodb://127.0.0.1:27017/");
  console.log("Go Ahead..");
} catch (error) {
  console.log(`connection to database failed, ${error}`);
}
const db = client.database(Deno.env.get("DB_DATABASE"));
const user = db.collection("users", { unique: true });

export { Bson, db, user };

await App.listen(`${HOST}:${PORT}`);
