class denoController {
  static index = async (context) => {
    context.response.status = 200
    context.response.body = "Hi! DenoLand";
  };
}

export { denoController };
