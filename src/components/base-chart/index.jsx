import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./styles.css";

export default function BaseChart({title, data, yLabels, xLabel, colors}) {
    return (
      <div className="chart-wrapper">
          <h3 className='fw-bold fs-5 text-center mt-2 mb-3'>{title}</h3>
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
                  {colors.map(color => (
                    <linearGradient key={`colorUv-${color.name}`} id={`colorUv-${color.name}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color.value} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={color.value} stopOpacity={0.2}/>
                    </linearGradient>
                  ))}
                  
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xLabel} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yLabels.map(y => (
                <Area type="monotone" fill={`url(#colorUv-${y})`} dataKey={y} stroke={`url(#colorUv-${y})`} activeDot={{ r: 8 }} />
              ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
    );
}
