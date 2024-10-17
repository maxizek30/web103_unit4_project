import { pool } from "../config/database.js";

const getRoofs = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM roof_types");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
const getRoofByType = async (req, res) => {
  const { type } = req.params;
  try {
    const results = await pool.query(
      "SELECT * FROM roof_types WHERE type = $1",
      [type]
    );
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
export default {
  getRoofs,
  getRoofByType,
};
