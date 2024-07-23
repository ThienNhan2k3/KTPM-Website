import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "./styles.css";
import BaseChart from '../../../../components/base-chart';

export default function UserReport() {
    return (
        <div className='admin-user-report-container'>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <DropdownButton id="game-selector" className="selector" title="Trò chơi">
                            <Dropdown.Item href="#/action-1">Quizz</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Lắc xì</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div className="col-3">
                        <DropdownButton id="dropdown-basic-button" className="selector" title="Thời gian">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div className="col-3">
                        <Button variant="success" className='search-button'>Tìm kiếm</Button>
                    </div>
                    
                </div>
            </div>

            <div className="content d-flex flex-column justify-content-center mt-5">
                <BaseChart title="Số lượng người chơi tham gia"/>
                <BaseChart title="Thời gian tham gia trung bình của mỗi người chơi"/>

            </div>
    
        </div>
    )
}