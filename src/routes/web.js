import { Router } from "https://deno.land/x/oak/mod.ts";
import { denoController } from "../controllers/denoController.js";

const route = new Router();

route.get("/", denoController.index);

export default route;
