import { Router } from "https://deno.land/x/oak/mod.ts";
import { restController } from "../controllers/restController.js";

const route = new Router({
  prefix: "/api/denoland",
});

route.get("/", restController.showAll);
route.post("/archaeopteryx", restController.insertOne);
route.get("/archaeopteryx/:id", restController.findOne);
route.patch("/archaeopteryx/:id", restController.updateOne);
route.delete("/archaeopteryx/:id", restController.deleteOne);

export default route;
