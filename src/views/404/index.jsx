
import styles from "./styles.module.css";
import image404 from "../../assets/images/404.svg";
import { Link } from "react-router-dom";

export default function PageNotFound({homeLink="/"}) {
    return (
        <div className={styles["container"]}>
            <header className={styles["header"]}>
                <h1>404</h1>
                <h3>Page not found</h3>
            </header>
            <img src={image404} alt="404 image" />
            <footer className={styles["footer"]}>
                <p>Trang mà bạn yêu cầu không tồn tại. Làm ơn trở về trang chủ!</p>
                <Link to={homeLink}>Trang chủ</Link>
            </footer>
        </div>
    )
}