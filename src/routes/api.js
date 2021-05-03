import { Router } from "https://deno.land/x/oak/mod.ts";
import { restController } from "../controllers/restController.js";

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * Prefix route for api endpoint
 *
 * @URI http://{HOST}:{PORT}/api/denoland
 */
const route = new Router({
  prefix: "/api/denoland",
});

route.get("/", restController.showAll);
route.post("/archaeopteryx", restController.insertOne);
route.get("/archaeopteryx/:id", restController.findOne);
route.patch("/archaeopteryx/:id", restController.updateOne);
route.delete("/archaeopteryx/:id", restController.deleteOne);

export default route;
