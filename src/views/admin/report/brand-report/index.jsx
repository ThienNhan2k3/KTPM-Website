import "./styles.css";
import Table from 'react-bootstrap/Table';
import { Button } from '@components/ui/button';
import CustomDropdown from "@components/custom-dropdown";
import DatePicker from "@components/date-picker";


export default function BrandReport() {
    return (
        <>
            <div className="container d-flex flex-column justify-content-center">
                <div className="row mb-3">
                <div className="col-6 col-md-3 col-lg-2">
                        <CustomDropdown title="Trò chơi" items={["Quizz", "Lắc xì"]}/>
                    </div>

                    <div className="col-6 col-md-3 col-lg-2">
                        <DatePicker title="Ngày bắt đầu" />
                    </div>

                    <div className="col-6 col-md-3 col-lg-2">
                        <DatePicker title="Ngày kết thúc" />
                    </div>

                    <div className="col-6 col-md-3 col-lg-2">
                        <Button className="tw-w-full tw-bg-green-700">Tìm kiếm</Button>
                    </div>
                    
                </div>
                <div className="row">
                    <Table responsive="sm" className="admin-brand-report-container" >
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            
        </>
        
    )
    
}