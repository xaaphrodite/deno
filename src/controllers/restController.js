import { Bson, db, user } from "../../index.js";

class restController {
  static showAll = async (context) => {
    const data = await user.find().toArray();
    context.response.status = 200;
    context.response.body = data;
  };

  static insertOne = async (context) => {
    const req = context.request.body({ type: "json" });
    const value = await req.value;

    try {
      await user.insertOne(value);
      context.response.status = 201;
      context.response.body = {
        success: true,
        message: "user created",
        data: value,
      };
    } catch (error) {
      console.log(error);
    }
  };

  static findOne = async (context) => {
    const result = await user.findOne({
      _id: new Bson.ObjectId(`${context.params.id}`),
    });

    context.response.status = 200;
    context.response.body = result;
  };

  static updateOne = async (context) => {
    const req = context.request.body({ type: "json" });
    const value = await req.value;

    try {
      await user.updateOne(
        { _id: new Bson.ObjectId(`${context.params.id}`) },
        {
          $set: {
            ...value,
          },
        }
      );
      const result = await user.findOne({
        _id: new Bson.ObjectId(`${context.params.id}`),
      });

      context.response.status = 200;
      context.response.body = result;
    } catch (error) {
      console.log(error);
    }
  };

  static deleteOne = async (context) => {
    await user.deleteOne({
      _id: new Bson.ObjectId(`${context.params.id}`),
    });

    context.response.status = 200;
    context.response.body = {
      message: "user removed",
    };
  };
}

export { restController };
