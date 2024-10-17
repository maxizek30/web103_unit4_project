import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import "../App.css";
import CarsAPI from "../services/CarsAPI";
import { useParams, useNavigate } from "react-router-dom";
import isCombinationValid from "../utilities/validation";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState(""); // Use empty string as default instead of undefined
  const [exteriorColor, setExteriorColor] = useState("#fff");
  const [interiorColor, setInteriorColor] = useState("#fff");
  const [wheelType, setWheelType] = useState(""); // Ensure default is not undefined
  const [roofType, setRoofType] = useState("");
  const [wheelImage, setWheelImage] = useState("");
  const [roofImage, setRoofImage] = useState("");
  const [wheelTypes, setWheelTypes] = useState([]);
  const [roofTypes, setRoofTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CarsAPI.getCarById(id);
        const carData = response[0];
        console.log("Car Data:", carData);
        setName(carData.name || ""); // Ensure the value is always defined
        setExteriorColor(carData.exterior_color || "#fff");
        setInteriorColor(carData.interior_color || "#fff");
        setWheelType(carData.wheel_type || "");
        setRoofType(carData.roof_type || "");

        const wheels = await CarsAPI.getWheelTypes();
        const roofs = await CarsAPI.getRoofTypes();

        setWheelTypes(wheels);
        setRoofTypes(roofs);

        const selectedWheel = wheels.find((w) => w.type === carData.wheel_type);
        const selectedRoof = roofs.find((r) => r.type === carData.roof_type);
        if (selectedWheel) setWheelImage(selectedWheel.image_url);
        if (selectedRoof) setRoofImage(selectedRoof.image_url);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const selectedWheel = wheelTypes.find((w) => w.type === wheelType);
    if (selectedWheel) {
      setWheelImage(selectedWheel.image_url);
    }
  }, [wheelType, wheelTypes]);

  useEffect(() => {
    const selectedRoof = roofTypes.find((r) => r.type === roofType);
    if (selectedRoof) {
      setRoofImage(selectedRoof.image_url);
    }
  }, [roofType, roofTypes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCombinationValid(roofType, wheelType)) {
      setErrorMessage("Invalid combination of roof type and wheel type!");
      return;
    }

    const updatedCar = {
      name,
      exterior_color: exteriorColor,
      interior_color: interiorColor,
      wheel_type: wheelType,
      roof_type: roofType,
    };

    console.log("Updated Car:", updatedCar);

    await CarsAPI.editCar(id, updatedCar);
    navigate(`/customcars/${id}`, { replace: true });
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
    imagePreview: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.formContainer}>
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <label>Car Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={styles.colorPickers}>
          <div>
            <label>Exterior Color: </label>
            <ChromePicker
              color={exteriorColor}
              onChange={(color) => setExteriorColor(color.hex)}
            />
          </div>

          <div>
            <label>Interior Color: </label>
            <ChromePicker
              color={interiorColor}
              onChange={(color) => setInteriorColor(color.hex)}
            />
          </div>
        </div>

        <div>
          <label>Wheel Type: </label>
          <select
            value={wheelType || ""} // Ensure value is always defined
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
          {wheelImage && (
            <img
              src={wheelImage}
              alt="Selected Wheel"
              style={styles.imagePreview}
            />
          )}
        </div>

        <div>
          <label>Roof Type: </label>
          <select
            value={roofType || ""} // Ensure value is always defined
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
          {roofImage && (
            <img
              src={roofImage}
              alt="Selected Roof"
              style={styles.imagePreview}
            />
          )}
        </div>

        <div>
          <button type="submit">Update Car</button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
