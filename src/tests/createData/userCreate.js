const User = require("../../models/User");

const userCreate = async () => {
  const user = {
    firstName: "Luis",
    lastName: "Romero",
    email: "luis@gmail",
    password: "lui123",
    phone: "3001530041",
  };

  await User.create(user);
};

module.exports = userCreate;
