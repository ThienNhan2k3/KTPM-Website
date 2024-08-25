import { useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";

import { InfoCircledIcon } from "@radix-ui/react-icons";

import gg from "@assets/images/google-icon.png";
import fb from "@assets/images/facebook-icon.png";
import welcome from "@assets/images/welcome-icon.png";
import logo from "@assets/images/logo.png";
import logo1 from "@assets/images/logo-icon-1.png";
import logo2 from "@assets/images/logo-icon-2.png";

import { Link } from "react-router-dom";

import "./styles.css";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    if (email != "" && password != "") {
      event.target.disabled = true;
    }
    
    fetch(`http://localhost:50000/login`, {
      body: JSON.stringify({
        email,
        password
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .then(data => {
      console.log("introduce:::", data);
      if (data.code === 200 && data.redirect) {
        navigate(data.redirect);
      }
    })
    .catch(err => console.log(err));

  };



  return (
    <div className="login-screen container-fluid p-0 m-0 vh-100 d-flex flex-column justify-content-center">
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

          <Form.Root className="FormRootLogin">
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
                <input className="Input" type="email" value={email} onChange={(event) => {
                  setEmail(event.target.value);
                }} required />
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
                <input className="Input" type="password" required value={password} onChange={(event) => {
                  setPassword(event.target.value);
                }} />
              </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
              <button className="LoginTitle" onClick={handleLogin}>Đăng nhập</button>
            </Form.Submit>
          </Form.Root>

          <div className="link-to-logup-screen">
            <span>Chưa có tài khoản?</span>
            <Link to="signup">
              <span className="link">Đăng ký</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
