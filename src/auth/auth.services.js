const checkUserCredentials = require("./auth.controllers");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

const postLogin = (req, res) => {
  const { email, password } = req.body;
  checkUserCredentials(email, password)
    .then((data) => {
      if (!data) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        {
          id: data.id,
          role: data.role,
           firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          country: data.country,
          gender: data.gender,
          status: data.status,
        },
        jwtSecret
      );
    
        // objeto user
      const user = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        gender: data.gender,
        status: data.status,
        createAt: data.createAt,
        updateAt: data.updateAt,
      };
      res.status(200).json({ token , user});
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = postLogin;
