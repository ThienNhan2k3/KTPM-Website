import Card from "react-bootstrap/Card";
import cardImage from "@assets/images/tay-cam-console.png";
import "./styles.css";
import { Link } from "react-router-dom";
import { changeHeaderTitle } from "@/lib/utils";

import { useEffect, useState } from "react";
import { fetchAllGame } from "@/services/api/gameApi";

export default function GameManagement() {
  changeHeaderTitle("Quản lý trò chơi")
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function fetchGames() {
      try {
        const data = await fetchAllGame();
        if (data.code === 200) {
          setGames(data.metadata);
        }
      } catch(err) {
        console.error(err);
      }
    }

    fetchGames();
  }, []);

  return (
    <div className="container container-md game-management-page-container">
      <div className="row g-3">
        {games.map((game, i) => (
          <Link
          className="col d-flex justify-content-center"
          to={`./gamedetail/${game.id}`}
          key={game.id}
        >
          <Card className={`${i % 2 === 0 ? "red-card" : "blue-card" }`}>
            <Card.Img variant="top" src={`http://localhost:5000/${game.image}`} />
            <Card.Body>
              <Card.Text>{game.name}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
        ))}
        
      </div>
    </div>
  );
}
