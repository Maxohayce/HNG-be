// Module imports
const validator = require("validator");

// Model imports
const User = require("../models/User");

/**
 * Handles contact request
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports = async ({ body: { name, email, message } }, res) => {
  try {
    function MyResponseError(message, code) {
      this.name = "MyResponseError";
      this.message = message;
      this.code = code || 400;
    }

    if (!name || !email || !message)
      throw new MyResponseError("All fields are required");

    if (!validator.isEmail(email))
      throw new MyResponseError("Email is invalid");

    if (
      (await User.findOne({ email, isDeleted: false })) ||
      (await User.findOne({ name, isDeleted: false }))
    )
      throw new MyResponseError("You have already joined");

    // Save user
    const user = new User({ name, email, message });
    const res = await user.save();

    if(!res.ok) throw new MyResponseError(res)

    return res
      .status(200)
      .send({
        data: user,
        error: false,
        message: "You have successfully joined",
      });
  } catch ({ code, message }) {
    return res.status(code || 500).send({ data: null, error: true, message });
  }
};
