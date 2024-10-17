import React, { useEffect, useState } from "react";
import "../App.css";
import CarsAPI from "../services/CarsAPI";
import CarItem from "../components/CarItem";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const temp = await CarsAPI.getAllCars(); // Await the promise
        setCars(temp);
        console.log("cars", temp);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div>
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default ViewCars;
