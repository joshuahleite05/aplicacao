const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { requestLogger, errorHandler } = require("./middleware");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

// app.get("/api", (req, res) => {
//   res.json({ message: "Bem-vindo à API!" });
// });

app.use("/api/pacientes", require("./routes/pacientes"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/consultas", require("./routes/consultas"));

app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
