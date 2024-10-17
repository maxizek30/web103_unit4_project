import { pool } from "../config/database.js";

const getCars = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM custom_cars");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query(
      "SELECT * FROM custom_cars WHERE id = $1",
      [id]
    );
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
const createCar = async (req, res) => {
  const { name, exterior_color, wheel_type, interior_color, roof_type } =
    req.body;
  try {
    const results = await pool.query(
      "INSERT INTO custom_cars (name, exterior_color, wheel_type, interior_color, roof_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, exterior_color, wheel_type, interior_color, roof_type]
    );
    res.status(201).json(results.rows);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
const editCar = async (req, res) => {
  const { id } = req.params;
  const { name, exterior_color, wheel_type, interior_color, roof_type } =
    req.body; // Add 'name'
  try {
    const results = await pool.query(
      "UPDATE custom_cars SET name = $1, exterior_color = $2, wheel_type = $3, interior_color = $4, roof_type = $5 WHERE id = $6 RETURNING *",
      [name, exterior_color, wheel_type, interior_color, roof_type, id]
    );
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query("DELETE FROM custom_cars WHERE id = $1", [
      id,
    ]);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export default {
  getCars,
  getCarById,
  createCar,
  editCar,
  deleteCar,
};
