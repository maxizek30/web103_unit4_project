import { pool } from "../config/database.js";

const getWheels = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM wheel_types");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
const getWheelsByType = async (req, res) => {
  const { type } = req.params;
  try {
    const results = await pool.query(
      "SELECT * FROM wheel_types WHERE type = $1",
      [type]
    );
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
export default {
  getWheels,
  getWheelsByType,
};
