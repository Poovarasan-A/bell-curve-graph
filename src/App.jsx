import BellCurveChart from "./components/BellCurveChart";

const propertyPrices = [
  300000, 390000, 400000, 450000, 500000, 550000, 600000, 650000, 700000,
  750000, 800000, 850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000,
  1200000,
];

const App = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <BellCurveChart propertyPrices={propertyPrices} />
    </div>
  );
};
export default App;
