import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./styles.css";

const data = [
  {
    name: '01/07/2024',
    players: 4000,
    amt: 2400,
  },
  {
    name: '02/07/2024',
    players: 3000,
    amt: 2210,
  },
  {
    name: '03/07/2024',
    players: 2000,
    amt: 2290,
  },
  {
    name: '04/07/2024',
    players: 2780,
    amt: 2000,
  },
  {
    name: '05/07/2024',
    players: 1890,
    amt: 2181,
  },
  {
    name: '06/07/2024',
    players: 2390,
    amt: 2500,
  },
  {
    name: '07/07/2024',
    players: 3490,
    amt: 2100,
  },
];

export default function BaseChart({title}) {

    return (
      <div className="chart-wrapper">
          <h3 className='text-center mt-2 mb-3'>{title}</h3>
          <ResponsiveContainer width="100%" height="94%">
          <AreaChart
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
              <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#66D7FB" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#66D7FB" stopOpacity={0}/>
                  </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" fill={`url(#colorUv)`} dataKey="players" stroke="#66D7FB" activeDot={{ r: 8 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
    );
}
