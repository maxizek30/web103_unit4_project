const invalidCombinations = [
  { roofType: "Convertible", wheelType: "Steel" },
  { roofType: "Hardtop", wheelType: "Steel" },
];

const isCombinationValid = (roofType, wheelType) => {
  return !invalidCombinations.some(
    (combo) => combo.roofType === roofType && combo.wheelType === wheelType
  );
};
export default isCombinationValid;
