import { Router } from "https://deno.land/x/oak/mod.ts";
import { denoController } from "../controllers/denoController.js";

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

const route = new Router();

route.get("/", denoController.index);

export default route;
