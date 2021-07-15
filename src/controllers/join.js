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

    const foundMail = await User.findOne({ email }, {upsert: true}).then(found => found)
    const foundName = await User.findOne({ name }, {upsert: true}).then(found => found)

    console.log(foundMail, foundName);

    if (foundMail || foundName) throw new MyResponseError("You have already joined");

    // Save user
    const user = await new User({ name, email, message });
    const resp = await user.save();

    if (!user) throw new MyResponseError(resp)

    return res
      .status(200)
      .send({
        data: user,
        error: false,
        message: "You have successfully joined",
      });
  } catch ({ code, message }) {
    console.log(code, message);
    return res.status(code || 500).send({ data: null, error: true, message });
  }
};
