import "./styles.css";
import Table from 'react-bootstrap/Table';
import { Button } from '@components/ui/button';
import CustomDropdown from "@components/custom-dropdown";
import DatePicker from "@components/date-picker";
import { changeHeaderTitle } from "@/lib/utils";
import { fetchTopBrand } from "@/services/api/playTimeReportApi";

import { useState, useEffect } from "react";
import HorizontalBarChart from "@/components/HorizontalBarChart";


// const data = [
//     { name: "Page A", pv: 240 },
//     { name: "B", pv: 2210 },
//     { name: "C", pv: 2300 },
//     { name: "Page D", pv: 2000 },
//     { name: "Zero", pv: 0 },
//     { name: "Hi", pv: 123 },
//     { name: "Bye", pv: 2091 }
// ];

export default function BrandReport() {
    changeHeaderTitle("Thống kê thương hiệu");
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7)

    const [prevDate, setPrevDate] = useState(pastDate);
    const [posDate, setPosDate] = useState(new Date());
    const [type, setType] = useState("All");
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        // const rawGameAttendanceData = generateDataForGameAttendance(50);
        // const rawPlayTimeData = generateDataForPlayTime(50);
        // setGameAttendanceData(convertToChartData(rawGameAttendanceData, "attendance"));
        // setPlayTimeData(convertToChartData(rawPlayTimeData, "time"));
        async function getTopBrandData(start_time, end_time) {
            let data = await fetchTopBrand(start_time, end_time, type);
            console.log(data);
            setBrands(data.metadata);
        }

        getTopBrandData(prevDate, posDate);
    }, [prevDate, posDate, type]);

    return (
        <div className='admin-user-report-container  d-flex flex-column flex-grow-1'>
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-3 col-xl-2">
                        <CustomDropdown title={type} handleChange={setType} items={["All", "Quiz", "Lắc xì"]}/>
                    </div>

                    <div className="col-6 col-md-3 col-xl-3 col-xll-2">
                        <DatePicker title="Ngày bắt đầu" date={prevDate} setDate={setPrevDate} />
                    </div>

                    <div className="col-6 col-md-3 col-xl-3 col-xll-2">
                        <DatePicker title="Ngày kết thúc" date={posDate} setDate={setPosDate} />
                    </div>

                    <div className="col-6 col-md-3 col-xl-2">
                        <Button className="tw-w-full tw-bg-green-700">Tìm kiếm</Button>
                    </div>
                    
                </div>
            </div>

            <div className="content d-flex flex-column align-items-center mt-3">
                <HorizontalBarChart data={brands} xKey="name" yKey="events"/>

            </div>
        </div>
    )   
}