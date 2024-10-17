import React, { useEffect, useState } from "react";
import "../App.css";
import CarsAPI from "../services/CarsAPI";
import { useParams, useNavigate } from "react-router-dom";
import calcPrice from "../utilities/calcprice";

const CarDetails = () => {
  const navigate = useNavigate();
  const index = useParams().id;
  const [car, setCar] = useState(null);
  const [wheel, setWheel] = useState(null);
  const [roof, setRoof] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const temp = await CarsAPI.getCarById(index);
        setCar(temp[0]);
        console.log("car", temp);
      } catch (error) {
        console.error("Failed to fetch car", error);
      }
    };
    fetchCar();
  }, [index]);

  useEffect(() => {
    if (car) {
      const fetchWheel = async () => {
        try {
          const temp = await CarsAPI.getWheelTypeByType(car.wheel_type);
          setWheel(temp[0]);
          console.log("wheel", temp);
        } catch (error) {
          console.error("Failed to fetch wheel", error);
        }
      };

      const fetchRoof = async () => {
        try {
          const temp = await CarsAPI.getRoofTypeByType(car.roof_type);
          setRoof(temp[0]);
          console.log("roof", temp);
        } catch (error) {
          console.error("Failed to fetch roof", error);
        }
      };
      const fetchPrice = async () => {
        try {
          const temp = await calcPrice(car);
          setPrice(temp);
        } catch (error) {
          console.error("Failed to fetch price", error);
        }
      };
      fetchPrice();
      fetchWheel();
      fetchRoof();
    }
  }, [car]);

  const onDelete = async () => {
    try {
      await CarsAPI.deleteCar(index);
      navigate("/customcars");
      console.log("Car deleted");
    } catch (error) {
      console.error("Failed to delete car", error);
    }
  };

  const styles = {
    container: {
      backgroundColor: "grey",
      padding: "20px",
      margin: "20px",
      color: "white",
    },
    bottomContainer: {
      display: "flex",
      gap: "100px",
    },
    attributeContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      gap: "100px",
    },
    attributeSection: {
      width: "40%",
    },
    colordiv: {},
  };

  if (!car || !wheel || !roof) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>{car.name}</h2>
      <div style={styles.bottomContainer}>
        <div>
          <h2>$ {price}</h2>
          <a href={`/edit/${car.id}`} role="button">
            Edit
          </a>
          <button onClick={() => onDelete()}>Delete</button>
        </div>

        <div style={styles.attributeContainer}>
          <div style={styles.attributeSection}>
            <div>
              exterior color
              <div
                style={{
                  backgroundColor: car.exterior_color,
                  width: "100%",
                  height: "80px",
                  borderColor: "black",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              />
            </div>
            <div>
              wheel type
              <div
                style={{
                  backgroundImage: `url(${wheel.image_url})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: "100%",
                  height: "200px",
                  borderColor: "black",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              />
            </div>
          </div>
          <div style={styles.attributeSection}>
            <div>
              roof type
              <div
                style={{
                  backgroundImage: `url(${roof.image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "200px",
                  borderColor: "black",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              />
            </div>
            <div>
              interior color
              <div
                style={{
                  backgroundColor: car.interior_color,
                  width: "100%",
                  height: "80px",
                  borderColor: "black",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
