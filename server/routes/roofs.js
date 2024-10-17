import express from "express";
import RoofController from "../controllers/roofs.js";

const roofRouter = express.Router();

roofRouter.get("/", RoofController.getRoofs);
roofRouter.get("/:type", RoofController.getRoofByType);

export default roofRouter;
