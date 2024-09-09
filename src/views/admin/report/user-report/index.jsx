import "./styles.css";
import BaseChart from '../../../../components/base-chart';
import CustomDropdown from "@/components/custom-dropdown";
import DatePicker from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { changeHeaderTitle } from "@/lib/utils";

import { generateDataForGameAttendance, generateDataForPlayTime } from "./makeData";
import { useEffect, useState } from "react";
import { convertToPlayTimeChartData, convertToGameAttendanceChartData } from "@/lib/utils";
import { fetchAllPlayTime } from "@/services/api/playTimeReportApi";

export default function UserReport() {
    changeHeaderTitle("Thống kê người dùng");
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7)

    const [prevDate, setPrevDate] = useState(pastDate);
    const [posDate, setPosDate] = useState(new Date());
    const [type, setType] = useState("All");
    const [gameAttendanceData, setGameAttendanceData] = useState([]);
    const [playTimeData, setPlayTimeData] = useState([]);

    useEffect(() => {
        // const rawGameAttendanceData = generateDataForGameAttendance(50);
        // const rawPlayTimeData = generateDataForPlayTime(50);
        // setGameAttendanceData(convertToChartData(rawGameAttendanceData, "attendance"));
        // setPlayTimeData(convertToChartData(rawPlayTimeData, "time"));
        async function getAllPlayTimeData(start_time, end_time) {
            let data = await fetchAllPlayTime(start_time, end_time);
            console.log(data);
            const newPlayTimeData = convertToPlayTimeChartData(data.metadata);
            setPlayTimeData(newPlayTimeData);
            const newGameAttendanceData = convertToGameAttendanceChartData(data.metadata);
            console.log(newGameAttendanceData);
            setGameAttendanceData(newGameAttendanceData);
        }

        getAllPlayTimeData(prevDate, posDate);
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
                <BaseChart 
                    data={gameAttendanceData} 
                    title="Số lượng người chơi tham gia"
                    yLabels={type == "All" ? ["Quiz", "LacXi"] : [type == "Lắc xì" ? "LacXi" : type]}
                    xLabel="date"
                    colors={[{name: "Quiz", value: "#4F1787"},{name: "LacXi", value: "#EB3678"}]}
                />
                <BaseChart 
                    data={playTimeData} 
                    title="Thời gian tham gia trung bình của mỗi người chơi"
                    yLabels={type == "All" ? ["Quiz", "LacXi"] : [type == "Lắc xì" ? "LacXi" : type]}
                    xLabel="date"
                    colors={[{name: "Quiz", value: "#4F1787"},{name: "LacXi", value: "#EB3678"}]}
                />

            </div>
        </div>
    )
}