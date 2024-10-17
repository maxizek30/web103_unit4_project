import CarsAPI from "../services/CarsAPI";

const calcPrice = async (car) => {
  const basePrice = 2000;
  try {
    const roof = await CarsAPI.getRoofTypeByType(car.roof_type);
    const wheel = await CarsAPI.getWheelTypeByType(car.wheel_type);
    console.log("roof", roof);

    const totalPrice =
      basePrice + parseInt(roof[0].price) + parseInt(wheel[0].price);

    return totalPrice;
  } catch (error) {
    console.error("Error calculating car price:", error);
    throw new Error("Failed to calculate the car price.");
  }
};

export default calcPrice;
