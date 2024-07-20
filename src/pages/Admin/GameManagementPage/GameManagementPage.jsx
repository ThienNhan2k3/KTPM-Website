import Card from 'react-bootstrap/Card';
import cardImage from "../../../assets/images/tay-cam-console.png";
import "./GameManagementPage.css";
import { Link } from 'react-router-dom';

export default function GameManagementPage() {
    return (
        <div className="container container-md game-management-page-container">
            <div className="row g-3">
                <Link className="col d-flex justify-content-center" to="./gamedetail" state={{game: "realtimequiz"}}>
                    <Card className='red-card'>
                        <Card.Img variant="top" src={cardImage} />
                        <Card.Body>
                            <Card.Text>
                                Realtime Quiz
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                
                <Link className="col d-flex justify-content-center" to="./gamedetail" state={{game: "lacxi"}}>
                    <Card className='blue-card'>
                        <Card.Img variant="top" src={cardImage} />
                        <Card.Body>
                            <Card.Text>
                                Lắc xì
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        </div>
    )
}