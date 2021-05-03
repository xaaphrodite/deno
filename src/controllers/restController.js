import { validate, required, isEmail, isString, lengthBetween, match } from "https://deno.land/x/validasaur/mod.ts";
import { Bson, db, user } from "../../index.js";

class restController {
  /**
   * Display all data
   *
   * @return all data from database
   */
  static showAll = async (context) => {
    const data = await user.find().toArray();
    context.response.status = 200;
    context.response.body = data;
  };

  /**
   * Create/Insert data
   *
   * @return data created successfully
   */
  static insertOne = async (context) => {
    const jsonAPI = context.request.body({ type: "json" });
    const request = await jsonAPI.value;

    const password = Object.values(request.password).join("");

    const [valid, invalid] = await validate(request, {
      name: [required, isString, lengthBetween(5, 13)],
      username: [required, isString, lengthBetween(5, 13)],
      email: [required, isEmail],
      password: [required, lengthBetween(8, 15)],
      confirm_password: [required, match(password)],
    });

    if (valid) {
      try {
        await user.insertOne(request);
        context.response.status = 201;
        context.response.body = {
          success: true,
          isValid: valid,
          message: "User created",
          data: request,
        };
      } catch (error) {
        console.log(error);
        let uniqueUsername = `E11000 duplicate key error collection: db_denoland.users index: username dup key: { username: "${Object.values(request.username).join("")}" }`;
        let uniqueEmail = `E11000 duplicate key error collection: db_denoland.users index: email dup key: { email: "${Object.values(request.email).join("")}" }`;
        if (error.message == uniqueUsername) {
          context.response.status = 401;
          context.response.body = {
            success: false,
            message: "Username has been taken",
          };
        }
        if (error.message == uniqueEmail) {
          context.response.status = 401;
          context.response.body = {
            success: false,
            message: "Email has been taken",
          };
        }
      }
    } else {
      context.response.status = 401;
      context.response.body = invalid;
    }
  };

  /**
   * Find data by id
   *
   * @param {id} context.params.id
   * @return data searched by id
   */
  static findOne = async (context) => {
    try {
      const result = await user.findOne({
        _id: new Bson.ObjectId(`${context.params.id}`),
      });
      context.response.status = 200;
      context.response.body = result;
    } catch (error) {
      context.response.status = 404;
      console.log(error);
    }
  };

  /**
   * Update data by id
   *
   * @param {id} context.params.id
   * @returns successfully modified data
   */
  static updateOne = async (context) => {
    const jsonAPI = context.request.body({ type: "json" });
    const request = await jsonAPI.value;

    const [valid, invalid] = await validate(request, {
      name: [required, isString, lengthBetween(5, 13)],
      username: [required, isString, lengthBetween(5, 13)],
      email: [required, isEmail],
    });

    if (valid) {
      const result = await user.findOne({
        _id: new Bson.ObjectId(`${context.params.id}`),
      });
      try {
        if (result) {
          await user.updateOne(
            { _id: new Bson.ObjectId(`${context.params.id}`) },
            {
              $set: {
                ...request,
              },
            }
          );
          context.response.body = await user.findOne({
            _id: new Bson.ObjectId(`${context.params.id}`),
          });
        } else {
          context.response.body = {
            success: false,
            message: "Not found",
          };
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      context.response.status = 401;
      context.response.body = invalid;
    }
  };

  /**
   * Delete data by id
   *
   * @param {id} context.params.id
   * @return message
   */
  static deleteOne = async (context) => {
    try {
      await user.deleteOne({
        _id: new Bson.ObjectId(`${context.params.id}`),
      });

      context.response.status = 200;
      context.response.body = {
        message: "user removed",
      };
    } catch (error) {
      context.response.status = 401;
      console.log(error);
    }
  };
}

export { restController };
