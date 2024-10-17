import express from "express";
import WheelController from "../controllers/wheels.js";

const wheelsRouter = express.Router();

wheelsRouter.get("/", WheelController.getWheels);
wheelsRouter.get("/:type", WheelController.getWheelsByType);

export default wheelsRouter;
