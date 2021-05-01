import { renderFileToString } from "https://deno.land/x/dejs@0.9.3/mod.ts";

class denoController {
  static index = async (context) => {
    context.response.status = 200;
    context.response.body = await renderFileToString(`${Deno.cwd()}/src/views/index.ejs`);
  };
}

export { denoController };
