import { Button } from '@components/ui/button';
import "./styles.css";
import BaseChart from '@components/base-chart';
import CustomDropdown from "@components/custom-dropdown";
import DatePicker from '@/components/date-picker';
import { changeHeaderTitle } from '@/lib/utils';
import { useState, useEffect } from "react"

import {generateDataForNumBrands} from "./makeData";
import { convertToPlayTimeChartData } from '@/lib/utils';

export default function GameReport() {
    changeHeaderTitle("Thống kê trò chơi");
    const [numBrands, setNumBrands] = useState([]);
    useEffect(() => {
        setNumBrands(generateDataForNumBrands(30));
    }, []);
    
    return (
        <div className='admin-game-report-container  d-flex flex-column flex-grow-1'>
        <div className="container">
            <div className="row">
                <div className="col-6 col-md-3 col-xl-2">
                    <CustomDropdown title="Trò chơi" items={["Quizz", "Lắc xì"]}/>
                </div>

                <div className="col-6 col-md-3 col-xl-3 col-xll-2">
                    <DatePicker title="Ngày bắt đầu" />
                </div>

                <div className="col-6 col-md-3 col-xl-3 col-xll-2">
                    <DatePicker title="Ngày kết thúc" />
                </div>

                <div className="col-6 col-md-3 col-xl-2">
                    <Button className="tw-w-full tw-bg-green-700">Tìm kiếm</Button>
                </div>
                
            </div>
        </div>

        <div className="content d-flex flex-column align-items-center mt-3">
             {/* <BaseChart title="Lượt chơi hàng ngày/tuần/tháng"/> */}
            {/* <BaseChart title="Số lượng thương hiệu tham gia "/>  */}
            
            <BaseChart 
                data={convertToChartData(numBrands, "brands")} 
                title="Số lượng thương hiệu tham gia"
                yLabels={["quiz", "lacxi"]}
                xLabel="date"
                colors={[{name: "quiz", value: "#4F1787"},{name: "lacxi", value: "#EB3678"}]}
            />


        </div>

        <div className="content d-flex flex-column align-items-center mt-3">
            {/* <BaseChart title="Số lượng người chơi tham gia"/>
            <BaseChart title="Thời gian tham gia trung bình của mỗi người chơi"/> */}

        </div>

    </div>
    )
}