import { useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";

import { InfoCircledIcon } from "@radix-ui/react-icons";

import gg from "@assets/images/google-icon.png";
import fb from "@assets/images/facebook-icon.png";
import welcome from "@assets/images/welcome-icon.png";
import logo from "@assets/images/logo.png";
import logo1 from "@assets/images/logo-icon-1.png";
import logo2 from "@assets/images/logo-icon-2.png";

import "./styles.css";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/admin");
  };

  return (
    <div className="container-fluid p-0 m-0 vh-100 d-flex flex-column justify-content-center">
      <div className="row h-100 m-0">
        <div className="col-md-4 left-part d-flex flex-column align-items-center p-0 m-0">
          <img className="welcome" src={welcome} alt="" />
          <img className="logo" src={logo} alt="" />
          <img className="logo1" src={logo1} alt="" />
          <img className="logo2" src={logo2} alt="" />
        </div>

        <div className="col-md-8 right-part d-flex flex-column justify-content-center align-items-center p-0 m-0">
          <h1 className="title">Đăng nhập</h1>

          <div className="combo-login-button">
            <button className="login-button" style={{ marginRight: "60px" }}>
              <img src={gg} alt="" />
              Đăng nhập với Google
            </button>

            <button className="login-button">
              <img src={fb} alt="" />
              Đăng nhập với Facebook
            </button>
          </div>

          {/* <div className="flex gap-3">
            <Button as="a" variant="primary">
              <Link to="/admin">Admin</Link>
            </Button>
            <Button as="a" variant="success">
              <Link to="/brand">Brand</Link>
            </Button>
          </div> */}

          <span className="or">- OR -</span>

          <Form.Root className="FormRootLogin" onSubmit={handleSubmit}>
            <Form.Field className="FormField" name="email">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label className="FormLabel">Email</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  <InfoCircledIcon className="FormIcon" />
                  Trường này không được để trống!
                </Form.Message>

                <Form.Message className="FormMessage" match="typeMismatch">
                  <InfoCircledIcon className="FormIcon" />
                  Vui lòng nhập email hợp lệ!
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input className="Input" type="email" required />
              </Form.Control>
            </Form.Field>

            <Form.Field className="FormField" name="password">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label className="FormLabel">Mật khẩu</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  <InfoCircledIcon className="FormIcon" />
                  Trường này không được để trống!
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input className="Input" type="password" required />
              </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
              <button className="Login">Đăng nhập</button>
            </Form.Submit>
          </Form.Root>

          <div className="link-to-logup-screen">
            <span>Chưa có tài khoản?</span>
            <span className="link">Đăng ký</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
