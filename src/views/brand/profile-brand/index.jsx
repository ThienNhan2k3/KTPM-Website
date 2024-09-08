import { InfoCircledIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import * as Select from "@radix-ui/react-select";

import * as Form from "@radix-ui/react-form";

import * as Toast from "@radix-ui/react-toast";

import * as Avatar from "@radix-ui/react-avatar";

import * as Dialog from "@radix-ui/react-dialog";

import React from "react";

import LocationMarker from "@/components/location-marker";

import Map from "@/components/map";

import { baseAPI } from "@/services/api";

import plus from "@assets/images/plus-icon.png";

import "./styles.css";

import readCookie from "../../../services/api/read_cookie";

const ProfileBrand = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [prevImage, setPrevImage] = React.useState(null);
  const timerRef = React.useRef(0);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setPrevImage(null);
    setShow(false);
  };

  const id = readCookie("id");

  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      setPrevImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const getData = () => {
    baseAPI
      .get(`/account/getAccount/${"brand"}/${id}`)
      .then((account) => {
        setData(account);
        // console.log(accounts);

        const gps = account.gps.split(",").map((item) => Number(item.trim()));
        console.log(gps);
        setMarkerPos([gps[0], gps[1]]);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData();
  }, []);

  const [markerPos, setMarkerPos] = React.useState([10.76218, 106.682257]);

  const updateData = (data) => {
    baseAPI
      .putForm(`/account/update/information/brand/${id}`, data, file)
      .then((result) => {
        console.log(result.message);
        if (result.message === "Success") {
          // Hiển thị toast khi xóa thành công
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 100);
          getData();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="ProfilePageDesign">
      <strong className="DialogTitle">Loại người dùng</strong>

      <Select.Root defaultValue="brand" disabled>
        <Select.Trigger className="SelectTrigger" aria-label="UserType">
          <Select.Value />
          <Select.Icon className="SelectIcon">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="SelectContent">
            <Select.Viewport className="SelectViewport">
              <Select.Item value="brand" className="SelectItem">
                <Select.ItemText>Thương hiệu</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <Form.Root
        className="FormRootProfile container flex-column"
        onSubmit={(event) => {
          event.preventDefault();
          const data = Object.fromEntries(new FormData(event.currentTarget));
          updateData(data);
        }}
      >
        <Form.Field className="FormField" name="avatar">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label />
          </div>
          <Form.Control asChild>
            <div className="AvatarSpace">
              <Avatar.Root className="AvatarRootProfile" onClick={handleShow}>
                <Avatar.Image
                  className="AvatarImage"
                  src={image == null ? data.avatar : image}
                  alt="VOU"
                />
                <Avatar.Fallback className="AvatarFallback" delayMs={100}>
                  VOU
                </Avatar.Fallback>
              </Avatar.Root>

              <Dialog.Root centered open={show} onHide={handleClose}>
                <Dialog.Portal>
                  <Dialog.Overlay className="DialogOverlayI" />
                  <Dialog.Content className="DialogContentI">
                    <Dialog.Title className="DialogTitleI">
                      Chọn ảnh
                    </Dialog.Title>

                    <div className="d-flex justify-content-center">
                      <label
                        className="btn d-flex flex-row align-items-center"
                        style={{
                          backgroundColor: "#D9D9D9",
                          cursor: "pointer",
                          color: "black",
                          border: "none",
                          minHeight: "40px",
                          marginTop: "16px",
                          marginBottom: "28px",
                        }}
                        htmlFor="thumbnail-image"
                      >
                        {prevImage == null ? (
                          <>
                            <img
                              src={plus}
                              alt=""
                              style={{
                                width: "22px",
                                marginRight: "8px",
                              }}
                            />
                            Tải ảnh lên
                          </>
                        ) : (
                          <img
                            src={prevImage}
                            alt=""
                            style={{ width: "300px" }}
                          />
                        )}
                      </label>
                      <input
                        type="file"
                        id="thumbnail-image"
                        name="thumbnail-image"
                        accept="image/*"
                        onChange={(event) => handleChangeImage(event)}
                      />
                    </div>

                    <div
                      style={{
                        border: "none",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Dialog.Close className="DialogCloseI">
                        <button
                          style={{
                            backgroundColor: "#FF5526",
                            color: "white",
                            padding: "5px 15px",
                          }}
                          onClick={handleClose}
                        >
                          Hủy
                        </button>
                      </Dialog.Close>

                      <Dialog.Close className="DialogCloseI">
                        <button
                          style={{
                            backgroundColor: "#1FAB89",
                            color: "white",
                            padding: "5px 15px",
                          }}
                          onClick={() => {
                            if (prevImage != null) {
                              setImage(prevImage);
                            }
                            handleClose();
                          }}
                        >
                          Lưu ảnh đại diện
                        </button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </Form.Control>
        </Form.Field>

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
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                defaultValue={data.brand_name}
                disabled
              />
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
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="email"
                defaultValue={data.email}
                disabled
              />
            </Form.Control>
          </Form.Field>
        </div>

        <div className="row">
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
                defaultValue={data.phone}
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
              <input
                className="Input"
                type="text"
                minLength={5}
                required
                defaultValue={data.industry}
              />
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
              <input
                className="Input"
                type="text"
                minLength={5}
                required
                defaultValue={data.address}
              />
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
                    setMarkerPos([Number(event.target.value), markerPos[1]]);
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
                required
              />
            </Form.Control>
          </Form.Field>
        </div>

        <div className="MapDesign">
          <Map markerPos={markerPos}>
            <LocationMarker onMove={setMarkerPos} pos={markerPos} />
          </Map>
        </div>

        <Form.Submit asChild>
          <div className="FormSubmit">
            <button className="design-save-button rounded-3">
              Lưu thay đổi
            </button>
          </div>
        </Form.Submit>
      </Form.Root>

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="ToastRoot UpdateSuccess"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="ToastTitleSuccess">
            Cập nhật tài khoản thành công!
          </Toast.Title>
          <Toast.Description asChild>
            <span className="ToastDescription">
              Tài khoản của bạn đã được cập nhật thành công trong hệ thống.
            </span>
          </Toast.Description>
          <Toast.Action
            className="ToastAction"
            asChild
            altText="Goto schedule to undo"
          >
            <button className="ButtonInToast small green">Đóng</button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </div>
  );
};

export default ProfileBrand;
