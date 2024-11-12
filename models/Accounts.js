const { model, Schema } = require("mongoose");

const AccountsSchema = new Schema({
  username: { type: String, required: true },
  funds: { type: Number },
});

module.exports = model("Account", AccountsSchema);
