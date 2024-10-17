import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import "../App.css";
import CarsAPI from "../services/CarsAPI";
import { useNavigate } from "react-router-dom";
import isCombinationValid from "../utilities/validation";

const CreateCar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [exteriorColor, setExteriorColor] = useState("#fff");
  const [interiorColor, setInteriorColor] = useState("#fff");
  const [wheelType, setWheelType] = useState("");
  const [roofType, setRoofType] = useState("");
  const [wheelTypes, setWheelTypes] = useState([]);
  const [roofTypes, setRoofTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const wheels = await CarsAPI.getWheelTypes();
        const roofs = await CarsAPI.getRoofTypes();
        setWheelTypes(wheels);
        setRoofTypes(roofs);
      } catch (error) {
        console.error("Failed to fetch types", error);
      }
    };
    fetchTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCombinationValid(roofType, wheelType)) {
      setErrorMessage("Invalid combination of roof type and wheel type!");
      return;
    }

    // Construct car object
    const newCar = {
      name,
      exterior_color: exteriorColor,
      interior_color: interiorColor,
      wheel_type: wheelType,
      roof_type: roofType,
    };

    console.log("Created Car:", newCar);

    await CarsAPI.createCar(newCar);
    navigate("/customcars");
  };

  const styles = {
    formContainer: {
      padding: "20px",
      margin: "20px",
      backgroundColor: "black",
      backgroundOpacity: "0.5",
    },
    colorPickers: {
      display: "flex",
      gap: "20px",
      marginBottom: "20px",
    },
    selectField: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
    },
  };

  return (
    <div style={styles.formContainer}>
      <h2>Create a Custom Car</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {/* Car Name */}
        <div>
          <label>Car Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Exterior Color Picker */}
        <div style={styles.colorPickers}>
          <div>
            <label>Exterior Color: </label>
            <ChromePicker
              color={exteriorColor}
              onChange={(color) => setExteriorColor(color.hex)}
            />
          </div>

          {/* Interior Color Picker */}
          <div>
            <label>Interior Color: </label>
            <ChromePicker
              color={interiorColor}
              onChange={(color) => setInteriorColor(color.hex)}
            />
          </div>
        </div>

        {/* Wheel Type Dropdown */}
        <div>
          <label>Wheel Type: </label>
          <select
            value={wheelType}
            onChange={(e) => setWheelType(e.target.value)}
            style={styles.selectField}
            required
          >
            <option value="">Select Wheel Type</option>
            {wheelTypes.map((wheel) => (
              <option key={wheel.id} value={wheel.type}>
                {wheel.type}
              </option>
            ))}
          </select>
        </div>

        {/* Roof Type Dropdown */}
        <div>
          <label>Roof Type: </label>
          <select
            value={roofType}
            onChange={(e) => setRoofType(e.target.value)}
            style={styles.selectField}
            required
          >
            <option value="">Select Roof Type</option>
            {roofTypes.map((roof) => (
              <option key={roof.id} value={roof.type}>
                {roof.type}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Create Car</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCar;
