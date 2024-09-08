import { Link } from "react-router-dom";
import * as Form from "@radix-ui/react-form";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { InfoCircledIcon } from "@radix-ui/react-icons";

import welcome from "@assets/images/welcome-icon.png";
import logo from "@assets/images/logo.png";
import logo1 from "@assets/images/logo-icon-1.png";
import logo2 from "@assets/images/logo-icon-2.png";

import { useState } from "react";
import LocationMarker from "@/components/location-marker";
import Map from "@/components/map";
import "./styles.css";
import { baseAPI } from "@/services/api";
import NotiDialog from "./noti-dialog";

function SignUp() {
  const [showMessage1, setShowMessage1] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    baseAPI
      .post(`/account/create/brand`, data)
      .then((result) => {
        console.log(result.message);
        if (result.message === "brand_name, email") {
          setShowMessage1(true);
          setShowMessage2(true);
        } else if (result.message === "brand_name") {
          setShowMessage1(true);
          setShowMessage2(false);
        } else if (result.message === "email") {
          setShowMessage1(false);
          setShowMessage2(true);
        } else {
          setShowMessage1(false);
          setShowMessage2(false);
          setOpenDialog(true);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const [markerPos, setMarkerPos] = useState([10.76218, 106.682257]);

  return (
    <div className="sign-up-conatiner container-fluid p-0 m-0 vh-100 d-flex flex-column justify-content-center">
      <div className="row h-100 m-0">
        <div className="col-md-4 left-part d-flex flex-column align-items-center p-0 m-0">
          <img className="welcome" src={welcome} alt="" />
          <img className="logo" src={logo} alt="" />
          <img className="logo1" src={logo1} alt="" />
          <img className="logo2" src={logo2} alt="" />
        </div>

        <div className="col-md-8 right-part d-flex flex-column justify-content-center align-items-center p-0 m-0">
          <h1 className="title">Đăng ký cho thương hiệu</h1>

          <Form.Root
            className="FormRootLogin container flex-column"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <Form.Field className="FormField col" name="brand_name">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Tên thương hiệu</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    <InfoCircledIcon className="FormIcon" />
                    Trường này không được để trống!
                  </Form.Message>

                  <Form.Message className="FormMessage" match="tooShort">
                    <InfoCircledIcon className="FormIcon" />
                    Vui lòng nhập tên thương hiệu hợp lệ!
                  </Form.Message>

                  {showMessage1 && (
                    <Form.Message className="FormMessage">
                      <InfoCircledIcon className="FormIcon" />
                      Tên thương hiệu đã tồn tại!
                    </Form.Message>
                  )}
                </div>
                <Form.Control asChild>
                  <input className="Input" type="text" minLength={3} required />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField col" name="email">
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

                  {showMessage2 && (
                    <Form.Message className="FormMessage">
                      <InfoCircledIcon className="FormIcon" />
                      Email đã tồn tại!
                    </Form.Message>
                  )}
                </div>
                <Form.Control asChild>
                  <input className="Input" type="email" required />
                </Form.Control>
              </Form.Field>
            </div>

            <div className="row">
              <Form.Field className="FormField col" name="password">
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

                  <Form.Message className="FormMessage" match="tooShort">
                    <InfoCircledIcon className="FormIcon" />
                    Vui lòng nhập mật khẩu hợp lệ!
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input"
                    type="password"
                    minLength={5}
                    required
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField col" name="phone">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Số điện thoại</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    <InfoCircledIcon className="FormIcon" />
                    Trường này không được để trống!
                  </Form.Message>

                  <Form.Message className="FormMessage" match="patternMismatch">
                    <InfoCircledIcon className="FormIcon" />
                    Vui lòng nhập số điện thoại hợp lệ!
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input"
                    type="tel"
                    pattern="\d{10}"
                    required
                  />
                </Form.Control>
              </Form.Field>
            </div>

            <div className="row">
              <Form.Field className="FormField col" name="industry">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Lĩnh vực</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    <InfoCircledIcon className="FormIcon" />
                    Trường này không được để trống!
                  </Form.Message>

                  <Form.Message className="FormMessage" match="tooShort">
                    <InfoCircledIcon className="FormIcon" />
                    Vui lòng nhập lĩnh vực hợp lệ!
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="text" minLength={5} required />
                </Form.Control>
              </Form.Field>
            </div>

            <div className="row">
              <Form.Field className="FormField col" name="address">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Địa chỉ</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    <InfoCircledIcon className="FormIcon" />
                    Trường này không được để trống!
                  </Form.Message>

                  <Form.Message className="FormMessage" match="tooShort">
                    <InfoCircledIcon className="FormIcon" />
                    Vui lòng nhập địa chỉ hợp lệ!
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="text" minLength={5} required />
                </Form.Control>
              </Form.Field>
            </div>

            <div className="row">
              <Form.Field className="FormField col" name="lat">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Lat</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    <InfoCircledIcon className="FormIcon" />
                    Trường này không được để trống!
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input"
                    type="text"
                    value={markerPos[0]}
                    onChange={(event) => {
                      console.log("Change");
                      if (event.target.value != null) {
                        setMarkerPos([
                          Number(event.target.value),
                          markerPos[1],
                        ]);
                      }
                    }}
                    required
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField col" name="long">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Long</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    <InfoCircledIcon className="FormIcon" />
                    Trường này không được để trống!
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input"
                    type="text"
                    value={markerPos[1]}
                    onChange={(event) => {
                      console.log("Change");
                      if (event.target.value != null) {
                        setMarkerPos([
                          markerPos[0],
                          Number(event.target.value),
                        ]);
                      }
                    }}
                    required
                  />
                </Form.Control>
              </Form.Field>
            </div>

            <div className="row">
              <Map markerPos={markerPos}>
                <LocationMarker onMove={setMarkerPos} pos={markerPos} />
              </Map>
            </div>

            <Form.Submit asChild>
              <button className="SignUp">Đăng ký</button>
            </Form.Submit>
          </Form.Root>

          <AlertDialog.Root open={openDialog} onOpenChange={setOpenDialog}>
            <NotiDialog />
          </AlertDialog.Root>

          <div className="link-to-login-screen ">
            <span>Bạn đã có tài khoản?</span>
            <Link to="..">
              <span className="link">Đăng nhập</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
