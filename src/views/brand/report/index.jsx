import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './styles.css';
import Checkmark from "@assets/images/checked-mark.png";
import Loading from "@assets/images/loading.png";

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
            data: data.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Số lượng Voucher đã được khai thác'
            },
            legend: {
              display: false
            },
            tooltip: {
              enabled: true
            }
          },
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
    <div className='brand-report-screen-col'> 
      <div className="brand-report-screen-row">
        <div className='brand-report-screen-type-button-group'>
          <button className='brand-report-screen-type-button'
            style={{
              backgroundColor: "#0F67B1"
            }}
          >
            Voucher
          </button>
          <button className='brand-report-screen-type-button'
            style={{
              backgroundColor: "#2EE982"
            }}
          >
            Ngân sách
          </button>
        </div>

        <div className='brand-report-screen-select-group'>
          <select className='brand-report-select'>
            <option disabled selected>Sự kiện</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <select className='brand-report-select'>
            <option disabled selected>Trò chơi</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
      <div className="brand-report-screen-row">
        <div className="brand-report-screen-chart">
          <LineChart data={data} />
        </div>
        <div className='brand-report-screen-box-group'>
          <div className="brand-report-screen-box">
            <div className="brand-report-screen-box1-content">
              <div className="brand-report-screen-col">
                <div className="brand-report-screen-box-number">2024</div>
                <div className="brand-report-screen-box-label">Voucher được khai thác</div>
              </div>
              <div className="brand-report-screen-box-icon">
                <img src={Checkmark} alt="Checkmark icon" />
              </div>
            </div>
          </div>

          <div className="brand-report-screen-box">
            <div className="brand-report-screen-box2-content">
              <div className="brand-report-screen-col">
                <div className="brand-report-screen-box-number">2024</div>
                <div className="brand-report-screen-box-label">Voucher còn lại</div>
              </div>
              <div className="brand-report-screen-box-icon">
                <img src={Loading} alt="Loading icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
