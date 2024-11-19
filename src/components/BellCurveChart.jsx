import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

const CustomLabel = (props) => {
  console.log("value of data", props);
  return (
    <text dy={-4} fill={"#000"} fontSize={14} textAnchor="middle">
      label
    </text>
  );
};

const normalizeAndCountPrices = (prices, targetPercentages) => {
  const sortedPrices = [...prices].sort((a, b) => a - b);

  const normalizedData = targetPercentages.map((percentage) => {
    // Calculate the price at the given target percentage
    const index = Math.ceil((percentage / 100) * sortedPrices.length) - 1;
    const priceAtPercentage = sortedPrices[index];

    // Count how many prices are <= the price at the target percentage
    const count = sortedPrices.filter(
      (price) => price <= priceAtPercentage
    ).length;

    return {
      percentage: percentage.toFixed(2),
      price: priceAtPercentage,
      count,
    };
  });
  return normalizedData;
};

const BellCurveChart = () => {
  const prices = [
    936794, 798634, 729264, 398745, 574369, 732548, 687530, 591203, 738314,
    540786, 258279, 442134, 944531, 294731, 823914, 960247, 803627, 285432,
    455428, 619782, 168927, 917506, 671002, 430238, 527719, 307404, 238186,
    493632, 791227, 712609, 902874, 647092, 393865, 596850, 765350, 587812,
    356099, 905711, 976636, 572292, 515017, 746706, 318546, 438987, 784519,
    910758, 953426, 697620, 598104, 724083, 609837, 767410, 895748, 955873,
    612990, 307721, 773193, 313981, 468450, 458318, 894207, 945349, 480035,
    300822, 894423, 806116, 850107, 452292, 792324, 553283, 277362, 644797,
    226343, 777671, 938869, 877602, 708366, 660706, 600267, 227056, 515014,
    817291, 698231, 779731, 673437, 254416, 964552, 982079, 625504, 227952,
    647122, 537680, 741150, 531693, 850719, 799564, 409446, 429508, 944859,
    397826,
  ];
  // Count
  //price
  //
  //   console.log("property prices", prices);

  const targetPercentages = [10, 25, 50, 75, 90];
  const normalizedData = normalizeAndCountPrices(prices, targetPercentages);

  const data = normalizedData.map((item) => {
    const x = parseFloat(item.percentage);
    const y =
      (1 / (15 * Math.sqrt(2 * Math.PI))) *
      Math.exp(-((x - 50) ** 2) / (2 * 15 ** 2));
    return { x, y: y.toFixed(5), price: item.price, count: item.count };
  });

  console.log("property datas", data);

  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 30,
          right: 50,
          left: 40,
          bottom: 20,
        }}
      >
        <XAxis
          dataKey="x"
          tickFormatter={(tick) => `${tick}%`}
          label={{
            value: "Percentages",
            position: "insideBottom",
            offset: -20,
          }}
        />
        <YAxis
          domain={[0, 0.05]}
          label={{
            value: "Properties",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="y"
          data={data}
          stroke="#0071BC"
          strokeWidth={4}
          dot={false}
          label={<CustomLabel />}
        />
        {data.map((point, index) => (
          <ReferenceDot
            key={index}
            x={point.x}
            y={point.y}
            r={8}
            fill="#0071BC"
            stroke="none"
            label={{
              position: "top",
              value: `
              ${point.x}%, (${point.count}),
              $${point.price}`,
              fill: "black",
              fontSize: 14,
              fontWeight: 600,
            }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BellCurveChart;
