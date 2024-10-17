import { pool } from "./database.js";
import "./dotenv.js";
import carData from "../data/cars.js";
import wheelTypesData from "../data/wheelTypesData.js";
import roofTypesData from "../data/roofTypesData.js";

const createCustomCarsTable = async () => {
  const dropQuery = "DROP TABLE IF EXISTS custom_cars";
  const query = `
    CREATE TABLE IF NOT EXISTS custom_cars (
        id SERIAL PRIMARY KEY,
        name TEXT,
        exterior_color TEXT,
        wheel_type TEXT,
        interior_color TEXT,
        roof_type TEXT
    )
  `;
  try {
    await pool.query(dropQuery);
    await pool.query(query);
    console.log("🎉 Custom Cars table created successfully");
  } catch (err) {
    console.error("⚠️ error creating custom cars table", err);
  }
};

const createWheelTypesTable = async () => {
  const dropQuery = "DROP TABLE IF EXISTS wheel_types";
  const query = `
    CREATE TABLE IF NOT EXISTS wheel_types (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL UNIQUE,
      price DECIMAL NOT NULL,
      image_url TEXT  -- Added image_url for the wheel type
    )
  `;
  try {
    await pool.query(dropQuery);
    await pool.query(query);
    console.log("🎉 Wheel Types table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating wheel types table", err);
  }
};

const createRoofTypesTable = async () => {
  const dropQuery = "DROP TABLE IF EXISTS roof_types";
  const query = `
    CREATE TABLE IF NOT EXISTS roof_types (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL UNIQUE,
      price DECIMAL NOT NULL,
      image_url TEXT  -- Added image_url for the roof type
    )
  `;
  try {
    await pool.query(dropQuery);
    await pool.query(query);
    console.log("🎉 Roof Types table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating roof types table", err);
  }
};

const seedCarsTable = async () => {
  await createCustomCarsTable();

  carData.forEach(async (car) => {
    const query = `INSERT INTO custom_cars (name, exterior_color, wheel_type, interior_color, roof_type) VALUES ($1, $2, $3, $4, $5)`;
    try {
      const res = await pool.query(query, [
        car.name,
        car.exterior_color,
        car.wheel_type,
        car.interior_color,
        car.roof_type,
      ]);
      console.log(`🎉 Car with id ${car.id} inserted successfully`);
    } catch (err) {
      console.error(`⚠️ error inserting car with id ${car.id}`, err);
    }
  });
};

const seedWheelTypesTable = async () => {
  await createWheelTypesTable();

  wheelTypesData.forEach(async (wheel) => {
    const query = `INSERT INTO wheel_types (type, price, image_url) VALUES ($1, $2, $3)`;
    try {
      await pool.query(query, [wheel.type, wheel.price, wheel.image_url]); // Added image_url
      console.log(`🎉 Wheel Type ${wheel.type} inserted successfully`);
    } catch (err) {
      console.error(`⚠️ Error inserting wheel type ${wheel.type}`, err);
    }
  });
};

// Function to seed roof types table with image_url
const seedRoofTypesTable = async () => {
  await createRoofTypesTable();

  roofTypesData.forEach(async (roof) => {
    const query = `INSERT INTO roof_types (type, price, image_url) VALUES ($1, $2, $3)`;
    try {
      await pool.query(query, [roof.type, roof.price, roof.image_url]); // Added image_url
      console.log(`🎉 Roof Type ${roof.type} inserted successfully`);
    } catch (err) {
      console.error(`⚠️ Error inserting roof type ${roof.type}`, err);
    }
  });
};

const resetDatabase = async () => {
  try {
    await seedWheelTypesTable();
    await seedRoofTypesTable();
    await seedCarsTable();
    console.log("🎉 All tables created and seeded successfully");
  } catch (err) {
    console.error("⚠️ Error resetting the database", err);
  }
};
export { resetDatabase };
