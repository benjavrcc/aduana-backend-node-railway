import express from "express";
import cors from "cors";
import registrar from "./api/registrar.js";
import registros from "./api/registros.js";
import prediccionHoraria from "./api/prediccion_horaria.js";
import distribucion from "./api/distribucion.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.post("/api/registrar", registrar);
app.get("/api/registros", registros);
app.get("/api/prediccion_horaria", prediccionHoraria);
app.post("/api/distribucion", distribucion);

// Puerto Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend corriendo en puerto", PORT));
