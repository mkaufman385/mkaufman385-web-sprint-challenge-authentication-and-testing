const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../users/users-model");

const { BCRYPT_ROUNDS, JWT_SECRET } = require("../../config/index");

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }

  User.findBy({ username })
    .then((existingUser) => {
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "username taken" });
      }

      const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
      User.add({ username, password: hash })
        .then((newUser) => {
          res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            password: hash,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));

  //ATTEMPT 1
  // const { username, password } = req.body;
  // const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
  // User.add({ username, password: hash })
  //   .then((newUser) => {
  //     res.status(201).json(newUser);
  //   })
  //   .catch(next);

  //ATTEMPT 2
  // let user = req.body;
  // const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
  // user.password = hash;
  // User.add(user)
  //   .then((saved) => {
  //     res.status(201).json({ message: `Welcome ${saved.username}` });
  //   })
  //   .catch(next);
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }

  User.findBy({ username })
    .then(([user]) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "invalid credentials" });
      }

      const token = buildToken(user);
      res.status(200).json({ message: `Welcome back ${user.username}`, token });
    })
    .catch((err) => next(err));

  // let { username, password } = req.body;
  // User.findById({ username })
  //   .then(([user]) => {
  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       const token = buildToken(user);
  //       res
  //         .status(200)
  //         .json({ message: `Welcome back ${user.username}`, token });
  //     } else {
  //       next({ status: 401, message: "Invalid Credentials" });
  //     }
  //   })
  //   .catch(next);
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
