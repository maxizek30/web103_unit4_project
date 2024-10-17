import React, { useEffect, useState } from "react";
import calcPrice from "../utilities/calcprice";

function CarItem({ car }) {
  const [carPrice, setCarPrice] = useState(0);
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const temp = await calcPrice(car);
        setCarPrice(temp);
      } catch (error) {
        console.error("Failed to fetch price", error);
      }
    };
    fetchPrice();
  }, []);

  const styles = {
    container: {
      backgroundColor: "#80808090",
      padding: "20px",
      margin: "20px",
      color: "white",
    },
    bottomContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    leftSide: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    middleSide: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    rightSide: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  };
  return (
    <div style={styles.container}>
      <h2>{car.name}</h2>
      <div style={styles.bottomContainer}>
        <div style={styles.leftSide}>
          <div style={{ display: "flex", gap: "20px" }}>
            <p>Exterior: {car.exterior_color}</p>
            <div
              style={{
                backgroundColor: car.exterior_color,
                width: "25px",
                height: "25px",
                borderColor: "black",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "50%",
              }}
            />
          </div>

          <p>Roof: {car.roof_type}</p>
        </div>
        <div style={styles.middleSide}>
          <p>Wheels: {car.wheel_type}</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <p>Interior: {car.interior_color}</p>
            <div
              style={{
                backgroundColor: car.interior_color,
                width: "25px",
                height: "25px",
                borderColor: "black",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
        <div style={styles.rightSide}>
          <h2>$ {carPrice}</h2>
          <a role="button" href={`/customcars/${car.id}`}>
            Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default CarItem;
