import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SimpleBarChart({title, data, xLabel, cols, colors}) {
    return (
    <div className="chart-wrapper">
      <h3 className='fw-bold fs-5 text-center mt-2 mb-3'>{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xLabel} />
          <YAxis />
          <Tooltip />
          <Legend />
          {cols.map((col, i) => (
            <Bar dataKey={col} fill={colors[i]} activeBar={<Rectangle fill="pink" stroke="blue" />} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
