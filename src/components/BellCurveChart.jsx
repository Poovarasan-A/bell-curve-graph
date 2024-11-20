import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Customized,
} from "recharts";

const CustomLabel = ({ xScale, yScale, data }) => {
  return (
    <g>
      {data.map((point, index) => {
        const x = xScale(point.x);
        const y = yScale(point.y);
        return (
          <g key={index}>
            {/* Draw vertical line */}
            <line
              x1={x}
              y1={y}
              x2={x}
              y2={y - 40}
              stroke="#808080"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
            {/* Draw label */}
            <text
              x={x}
              y={y - 50}
              textAnchor="middle"
              fontSize={14}
              fill="black"
              fontWeight={600}
            >
              {`$${point.price}`}
            </text>
            <text
              x={x}
              y={y - 70}
              textAnchor="middle"
              fontSize={16}
              fill="black"
              fontWeight={600}
            >
              {`${point.x}% (${point.count})`}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { x, y, price, count } = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "14px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>Percentage: {x}%</p>
        <p style={{ margin: 0 }}>Properties: {count}</p>
        <p style={{ margin: 0 }}>Price: $ {price}</p>
        {/* <p style={{ margin: 0 }}>Y Value: {y}</p> */}
      </div>
    );
  }

  return null; // Return null if tooltip is inactive
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

  const targetPercentages = [10, 25, 50, 75, 90];
  const normalizedData = normalizeAndCountPrices(prices, targetPercentages);

  const data = normalizedData.map((item) => {
    const x = parseFloat(item.percentage);
    const y =
      (1 / (15 * Math.sqrt(2 * Math.PI))) *
      Math.exp(-((x - 50) ** 2) / (2 * 15 ** 2));
    return { x, y: y.toFixed(5), price: item.price, count: item.count };
  });

  // console.log("property datas", data);

  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 80,
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
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Line
          type="monotone"
          dataKey="y"
          data={data}
          stroke="#0071BC"
          strokeWidth={4}
          dot={false}
        />
        <Customized
          component={({ xAxisMap, yAxisMap }) => {
            const xScale = xAxisMap[0].scale;
            const yScale = yAxisMap[0].scale;
            return <CustomLabel xScale={xScale} yScale={yScale} data={data} />;
          }}
        />
        {data.map((point, index) => (
          <ReferenceDot
            key={index}
            x={point.x}
            y={point.y}
            r={8}
            fill="#0071BC"
            stroke="none"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BellCurveChart;
