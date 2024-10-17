import express from "express";
import path from "path";
import favicon from "serve-favicon";
import dotenv from "dotenv";
// import the router from your routes file
import router from "./routes/cars.js";
import { resetDatabase } from "./config/reset.js";
import cors from "cors";
import wheelsRouter from "./routes/wheels.js";
import roofRouter from "./routes/roofs.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from Vite frontend
    methods: "GET,POST,PUT,DELETE", // Specify allowed methods
    credentials: true, // Allow cookies if needed
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(favicon(path.resolve("../", "client", "public", "lightning.png")));
} else if (process.env.NODE_ENV === "production") {
  app.use(favicon(path.resolve("public", "lightning.png")));
  app.use(express.static("public"));
}

// specify the api path for the server to use
app.use("/cars", router);
app.use("/wheel_types", wheelsRouter);
app.use("/roof_types", roofRouter);

//reset the database
resetDatabase();

if (process.env.NODE_ENV === "production") {
  app.get("/*", (_, res) => res.sendFile(path.resolve("public", "index.html")));
}

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
