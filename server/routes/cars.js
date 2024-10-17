import express from "express";
import CarController from "../controllers/cars.js";

const router = express.Router();

router.get("/", CarController.getCars);

router.get("/:id", CarController.getCarById);

router.post("/", CarController.createCar);

router.put("/:id", CarController.editCar);

router.delete("/:id", CarController.deleteCar);

export default router;
