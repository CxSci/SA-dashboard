/* eslint-disable react/prop-types */
import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Scatter,
  LabelList
} from "recharts";

const GradientBar = ({ width = 150, height = 24, value = 0.6 }) => {
  const data = [{
    name: "HIGH",
    name2: "LOW",
    max: 1.2,
    value: value,
  }];

  return (
    <ComposedChart
      width={width}
      height={height}
      data={data}
      layout="vertical"
      margin={{
        top: 4,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <XAxis type="number" domain={[0, 1]} hide={true} />
      <YAxis type="category" dataKey="name" hide={true} />
      <Bar dataKey="value"
        barSize={18}
        background={renderGradientShape('max')}
        shape={renderGradientShape('value')}
        isAnimationActive={false}
      >
        <LabelList dataKey="name" position="insideLeft" />
        <LabelList dataKey="name2" position="insideRight" />
      </Bar>
      <Scatter dataKey="value"
        shape={renderTriangleShape}
        isAnimationActive={false}
      />
    </ComposedChart>
  )
}

const renderGradientShape = (key) => {
  const component = ({ height, width, x, y, ...rest }) => {
    const gradX = rest.max / rest[key];
    const style = {
      "max": [
        { stopColor: "rgb(255,244,146)" },
        { stopColor: "rgb(249,133,133)" },
      ],
      "value": [
        { stopColor: "rgb(255,233,0)" },
        { stopColor: "rgb(242,11,11)" },
      ]
    }

    return (
      <svg x={x} y={y} key={key}>
        <defs>
          <linearGradient id={`grad-${key}`} x1="0" y1="0" x2={gradX} y2="0" >
            <stop offset="0%" style={style[key][0]} />
            <stop offset="100%" style={style[key][1]} />
          </linearGradient>
        </defs>
        <rect width={width} height={height} x={x} fill={`url(#grad-${key})`} />
      </svg>
    );
  };
  
  return component;
}

const renderTriangleShape = (props) => {
  const x = props.x;
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" x={x-5} y={0}>
      <path d="M9 12L0.33 0L17.66 0L9 12Z" fill="black"/>
    </svg>
  )
}

export default GradientBar;