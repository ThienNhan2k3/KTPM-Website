import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './styles.css';
import Checkmark from "@assets/images/checked-mark.png";
import Loading from "@assets/images/loading.png";

import { fetchCountAllActiveVouchers, fetchCountAllInactiveVouchers } from "@/services/api/voucherApi";
import { fetchAllEvents } from "@/services/api/eventApi";

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
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    values: [4, 5.5, 6, 7, 8, 12, 19, 3, 5, 30, 11, 40]
  });

  const [event, setEvent] = useState([]);

  const [activeVouchersCount, setActiveVouchersCount] = useState(null);
  const [inactiveVouchersCount, setInactiveVouchersCount] = useState(null); // Store count of active vouchers

  //get all event data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAllEvents();
        setEvent(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch the count of active vouchers when the component mounts
    const fetchActiveVouchers = async () => {
      try {
        const active_response = await fetchCountAllActiveVouchers();
        const inactive_response = await fetchCountAllInactiveVouchers();
        setActiveVouchersCount(active_response.activeVouchersCount);
        setInactiveVouchersCount(inactive_response.inactiveVouchersCount); // Set the active voucher count
      } catch (error) {
        console.error("Error fetching active vouchers count", error);
      }
    };

    fetchActiveVouchers();
  }, []);

  return (
    <div className='brand-report-screen-col'> 
      <div className="brand-report-screen-row">
        <div className='brand-report-screen-type-button-group'>
          
        </div>

        <div className='brand-report-screen-select-group'>
          <select className='brand-report-select'>
            <option disabled selected>Sự kiện</option>
            {event.map((item, index) => (
              <option key={index} value={item}>
                {item.name}
              </option>
            ))}
          </select>
          <select className='brand-report-select'>
            <option disabled selected>Trò chơi</option>
            <option value="volvo">Quiz</option>
            <option value="saab">Lắc xì</option>
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
              <div className="brand-report-screen-box-number">
                  {inactiveVouchersCount !== null ? inactiveVouchersCount : 'Loading...'}
                </div>
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
                {/* Dynamically display the count of active vouchers */}
                <div className="brand-report-screen-box-number">
                  {activeVouchersCount !== null ? activeVouchersCount : 'Loading...'}
                </div>
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
