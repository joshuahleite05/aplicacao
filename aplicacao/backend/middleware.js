// middleware.js
const validationResult = require("express-validator").validationResult;

// Monitorar requisições
const requestLogger = (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} - ${req.originalUrl}`
  );
  next();
};

// Validação de dados
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Ocorreu um erro no servidor", error: err.message });
};

// Monitorar respostas enviadas
const responseLogger = (req, res, next) => {
  const oldSend = res.send;

  res.send = function (body) {
    console.log(
      `[${new Date().toISOString()}] Resposta enviada: ${res.statusCode}`
    );
    console.log("Body:", body);
    oldSend.apply(res, arguments);
  };
  next();
};

module.exports = {
  requestLogger,
  validateRequest,
  errorHandler,
  responseLogger,
};