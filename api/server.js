const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const restrict = require("./middleware/restricted.js");

const authRouter = require("./auth/auth-router.js");
const jokesRouter = require("./jokes/jokes-router.js");

const server = express();

// server.use(helmet());
server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        styleSrc: ["'self'"],
        // Add other sources if necessary
        // e.g., styleSrc: ["'self'", 'https://your-cdn.com'],
      },
      reportOnly: false, // Set to true if you want to only report violations without enforcing
    },
    // Other Helmet configurations
  })
);
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", restrict, jokesRouter);

//eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
