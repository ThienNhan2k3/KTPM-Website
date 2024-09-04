import add from "@assets/images/plus-icon-white.png";
import plus from "@assets/images/plus-icon.png";
import {
  Cross2Icon,
  ChevronDownIcon,
  CheckIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

import * as Dialog from "@radix-ui/react-dialog";

import * as Select from "@radix-ui/react-select";

import * as Form from "@radix-ui/react-form";

import * as Checkbox from "@radix-ui/react-checkbox";

import * as RadioGroup from "@radix-ui/react-radio-group";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import * as Avatar from "@radix-ui/react-avatar";

import * as Toast from "@radix-ui/react-toast";

import React from "react";

import { baseAPI } from "@/services/api";

const AddDialog = ({ callbackfn }) => {
  const [open1, setOpen1] = React.useState(false);
  const [prevImage, setPrevImage] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [showMessage1, setShowMessage1] = React.useState(false);
  const [showMessage2, setShowMessage2] = React.useState(false);
  const timerRef = React.useRef(0);
  const handleShow = () => setShow(true);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

  const handleClose = () => {
    setPrevImage(null);
    setShow(false);
  };

  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      setPrevImage(URL.createObjectURL(file));
    }
  };

  const saveData = (data) => {
    data.status = data.status ? "Active" : "Inactive";

    console.log(data);

    baseAPI
      .post(`http://localhost:5000/account/create/user`, data)
      .then((result) => {
        console.log(result.message);
        if (result.message === "user_name, email") {
          setShowMessage1(true);
          setShowMessage2(true);
        } else if (result.message === "user_name") {
          setShowMessage1(true);
          setShowMessage2(false);
        } else if (result.message === "email") {
          setShowMessage1(false);
          setShowMessage2(true);
        } else {
          setShowMessage1(false);
          setShowMessage2(false);
          wait().then(() => setOpen1(false));
          // Hiển thị toast khi xóa thành công
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 100);
          callbackfn();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog.Root open={open1} onOpenChange={setOpen1}>
        <Dialog.Trigger asChild>
          <button
            className="design-add-button rounded-4"
            onClick={() => {
              handleClose();
              setImage(null);
            }}
          >
            <img src={add} alt="" />
            Thêm người chơi
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay-add" />

          <ScrollArea.Root className="ScrollAreaRoot">
            <ScrollArea.Viewport className="ScrollAreaViewport">
              <Dialog.Content className="DialogContent">
                <Dialog.Title />

                <Form.Root
                  className="FormRoot"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = Object.fromEntries(
                      new FormData(event.currentTarget),
                    );
                    saveData(data);
                  }}
                >
                  <Form.Field className="DialogTitle" name="type">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Label className="FormLabel">
                        Loại người dùng
                      </Form.Label>
                    </div>
                    <Form.Control asChild>
                      <Select.Root defaultValue="Admin">
                        <Select.Trigger
                          className="SelectTrigger"
                          aria-label="UserType"
                        >
                          <Select.Value />
                          <Select.Icon className="SelectIcon">
                            <ChevronDownIcon />
                          </Select.Icon>
                        </Select.Trigger>

                        <Select.Portal>
                          <Select.Content className="SelectContent">
                            <Select.Viewport className="SelectViewport">
                              <Select.Item value="Admin" className="SelectItem">
                                <Select.ItemText>Admin</Select.ItemText>
                                <Select.ItemIndicator className="SelectItemIndicator">
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>

                              <Select.Item
                                value="Người chơi"
                                className="SelectItem"
                              >
                                <Select.ItemText>Người chơi</Select.ItemText>
                                <Select.ItemIndicator className="SelectItemIndicator">
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </Form.Control>
                  </Form.Field>

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
                        <Avatar.Root
                          className="AvatarRoot"
                          onClick={handleShow}
                        >
                          <Avatar.Image
                            className={`AvatarImage ${image == null ? "change-image-button" : ""}`}
                            src={image == null ? plus : image}
                            alt="Avatar"
                          />
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
                      <Form.Message
                        className="FormMessage"
                        match="valueMissing"
                      >
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
                      <Form.Label className="FormLabel">
                        Tên đăng nhập
                      </Form.Label>
                      <Form.Message
                        className="FormMessage"
                        match="valueMissing"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Trường này không được để trống!
                      </Form.Message>

                      <Form.Message className="FormMessage" match="tooShort">
                        <InfoCircledIcon className="FormIcon" />
                        Vui lòng nhập tên đăng nhập hợp lệ!
                      </Form.Message>

                      {showMessage1 && (
                        <Form.Message className="FormMessage">
                          <InfoCircledIcon className="FormIcon" />
                          Tên tài khoản đã tồn tại!
                        </Form.Message>
                      )}
                    </div>
                    <Form.Control asChild>
                      <input
                        className="Input"
                        type="text"
                        minLength={3}
                        required
                      />
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
                      <Form.Message
                        className="FormMessage"
                        match="valueMissing"
                      >
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

                  <Form.Field className="FormField" name="email">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Label className="FormLabel">Email</Form.Label>
                      <Form.Message
                        className="FormMessage"
                        match="valueMissing"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Trường này không được để trống!
                      </Form.Message>

                      <Form.Message
                        className="FormMessage"
                        match="typeMismatch"
                      >
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

                  <Form.Field className="FormField" name="phone">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Label className="FormLabel">
                        Số điện thoại
                      </Form.Label>
                      <Form.Message
                        className="FormMessage"
                        match="valueMissing"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Trường này không được để trống!
                      </Form.Message>

                      <Form.Message
                        className="FormMessage"
                        match="patternMismatch"
                      >
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

                  <Form.Field className="FormField" name="dob">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Label className="FormLabel">Ngày sinh</Form.Label>
                      <Form.Message
                        className="FormMessage"
                        match="valueMissing"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Trường này không được để trống!
                      </Form.Message>

                      <Form.Message
                        className="FormMessage"
                        match="patternMismatch"
                      >
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
                        defaultValue="Nam"
                        aria-label="View density"
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
                          <RadioGroup.Item
                            className="RadioGroupItem"
                            value="Nữ"
                            id="Nữ"
                          >
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
                      <Form.Label className="FormLabel">
                        Tài khoản Facebook
                      </Form.Label>
                      <Form.Message
                        className="FormMessage"
                        match="valueMissing"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Trường này không được để trống!
                      </Form.Message>

                      <Form.Message className="FormMessage" match="tooShort">
                        <InfoCircledIcon className="FormIcon" />
                        Vui lòng nhập tài khoản Facebook hợp lệ!
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <input className="Input" type="text" minLength={3} />
                    </Form.Control>
                  </Form.Field>

                  <Form.Field className="FormField" name="status">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Form.Control asChild>
                        <Checkbox.Root
                          className="CheckboxRoot"
                          defaultChecked={false}
                        >
                          <Checkbox.Indicator className="CheckboxIndicator">
                            <CheckIcon />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                      </Form.Control>
                      <label className="Label" htmlFor="c1">
                        Kích hoạt tài khoản.
                      </label>
                    </div>
                  </Form.Field>

                  <Form.Submit asChild>
                    <div className="FormSubmit">
                      <button className="design-save-button rounded-3">
                        Lưu người chơi
                      </button>
                    </div>
                  </Form.Submit>
                </Form.Root>

                <Dialog.Close asChild>
                  <div className="DialogCloseButton">
                    <button className="design-cancel-button rounded-3">
                      Hủy
                    </button>
                  </div>
                </Dialog.Close>

                <Dialog.Close asChild>
                  <button className="IconButton" aria-label="Close">
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="ScrollAreaScrollbar"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Dialog.Portal>
      </Dialog.Root>

      <Toast.Provider swipeDirection="right">
        <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
          <Toast.Title className="ToastTitle">
            Tạo tài khoản thành công!
          </Toast.Title>
          <Toast.Description asChild>
            <span className="ToastDescription">
              Tài khoản của người dùng đã được tạo thành công trong hệ thống.
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

export default AddDialog;
