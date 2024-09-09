import { InfoCircledIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import * as Select from "@radix-ui/react-select";

import * as Form from "@radix-ui/react-form";

import * as Toast from "@radix-ui/react-toast";

import * as Avatar from "@radix-ui/react-avatar";

import * as Dialog from "@radix-ui/react-dialog";

import React from "react";

import * as RadioGroup from "@radix-ui/react-radio-group";

import { baseAPI } from "@/services/api";

import plus from "@assets/images/plus-icon.png";

import readCookie from "../../../services/api/read_cookie";

const ProfileAdmin = () => {
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
      .get(`/account/getAccount/${"user"}/${id}`)
      .then((account) => {
        setData(account);
        console.log(account);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData();
  }, []);

  const updateData = (data) => {
    baseAPI
      .putForm(`/account/update/information/user/${id}`, data, file)
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
                <Select.ItemText>Admin</Select.ItemText>
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
          // console.log(data);
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

        <Form.Field className="FormField" name="full_name">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Họ và tên</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              <InfoCircledIcon className="FormIcon" />
              Trường này không được để trống!
            </Form.Message>

            <Form.Message className="FormMessage" match="tooShort">
              <InfoCircledIcon className="FormIcon" />
              Vui lòng nhập họ và tên hợp lệ!
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              minLength={3}
              required
              defaultValue={data.full_name}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="user_name">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Tên đăng nhập</Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              defaultValue={data.user_name}
              disabled
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="email">
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

        <Form.Field className="FormField" name="phone">
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

        <Form.Field className="FormField" name="dob">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Ngày sinh</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              <InfoCircledIcon className="FormIcon" />
              Trường này không được để trống!
            </Form.Message>

            <Form.Message className="FormMessage" match="patternMismatch">
              <InfoCircledIcon className="FormIcon" />
              Vui lòng nhập ngày sinh hợp lệ!
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="date"
              required
              style={{ display: "flow" }}
              defaultValue={data.dob}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="gender">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Giới tính</Form.Label>
          </div>
          <Form.Control asChild>
            <RadioGroup.Root
              className="RadioGroupRoot"
              value={data.gender}
              aria-label="View density"
              onValueChange={(value) =>
                setData((prevData) => ({ ...prevData, gender: value }))
              } // Thay đổi giá trị khi người dùng chọn
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <RadioGroup.Item
                  className="RadioGroupItem"
                  value="Nam"
                  id="Nam"
                >
                  <RadioGroup.Indicator className="RadioGroupIndicator" />
                </RadioGroup.Item>
                <label className="Label-radiogroup" htmlFor="r1">
                  Nam
                </label>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <RadioGroup.Item className="RadioGroupItem" value="Nữ" id="Nữ">
                  <RadioGroup.Indicator className="RadioGroupIndicator" />
                </RadioGroup.Item>
                <label className="Label-radiogroup" htmlFor="r2">
                  Nữ
                </label>
              </div>
            </RadioGroup.Root>
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="fb_acc">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Tài khoản Facebook</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              <InfoCircledIcon className="FormIcon" />
              Trường này không được để trống!
            </Form.Message>

            <Form.Message className="FormMessage" match="tooShort">
              <InfoCircledIcon className="FormIcon" />
              Vui lòng nhập tài khoản Facebook hợp lệ!
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              minLength={3}
              defaultValue={data.fb_acc}
            />
          </Form.Control>
        </Form.Field>

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

export default ProfileAdmin;
