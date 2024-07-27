import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './styles.css';

const LineChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Line Chart',
            data: data.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              position: 'bottom'
            },
            y: {
              type: 'linear',
              position: 'left'
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartContainer} width="400" height="400"></canvas>;
};

export default function BrandReports() {
  const [data, setData] = useState({
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
    values: [12, 19, 3, 5, 2]
  });

  return (
    <div className='col'> 
      <div className="row">
        <div className='type-button-group'>
          <button className='type-button'>
            Voucher
          </button>
          <button >
            Ngân sách
          </button>
        </div>
      </div>
      
      <div className="chart">
        <LineChart data={data} />
      </div>
    </div>
  );
}
