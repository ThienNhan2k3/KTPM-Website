import "./styles.css";
import Table from 'react-bootstrap/Table';
import { Button } from '@components/ui/button';
import CustomDropdown from "@components/custom-dropdown";
import DatePicker from "@components/date-picker";
import { changeHeaderTitle } from "@/lib/utils";


export default function BrandReport() {
    changeHeaderTitle("Thống kê thương hiệu");
    const rows = [];
    for (let i = 0; i < 5; i++) {
        const row = <tr>
                        <td>{i}</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                    </tr>
        rows.push(row);
    }

    return (
        <>
            <div className="container d-flex flex-column flex-grow-1">
                <div className="row mb-3">
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
                <div className="row">
                    <Table responsive="sm" className="admin-brand-report-container" >
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Thương hiệu</th>
                            <th>Sự kiện đã tạo</th>
                            <th>Voucher đã thêm</th>
                        </tr>
                        
                        </thead>
                        <tbody>
                            {rows.map(item => (
                                item
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            
        </>
        
    )
    
}