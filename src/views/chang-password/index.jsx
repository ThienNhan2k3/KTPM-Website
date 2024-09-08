import { InfoCircledIcon } from "@radix-ui/react-icons";

import * as Form from "@radix-ui/react-form";

import * as Toast from "@radix-ui/react-toast";

import React from "react";

import { baseAPI } from "@/services/api";

import "./styles.css";

import readCookie from "../../services/api/read_cookie";

const ChangePassword = () => {
  const formRef = React.useRef(null);
  const newPassword1Ref = React.useRef(null); // Tham chiếu đến new_password1
  const newPassword2Ref = React.useRef(null); // Tham chiếu đến new_password2
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const timerRef = React.useRef(0);

  const updateData = (data) => {
    if (data.new_password1 === data.new_password2) {
      setShowMessage(false);
      baseAPI
        .put(
          `/account/update/password/${readCookie("type")}/${readCookie("id")}`,
          data,
        )
        .then((result) => {
          console.log(result.message);
          if (result.message === "Success") {
            // Hiển thị toast khi xóa thành công
            setOpen1(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen1(true);
            }, 100);
          } else if (result.message === "Fail") {
            setOpen2(false);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => {
              setOpen2(true);
            }, 100);
          }
          if (formRef.current) {
            formRef.current.reset();
          }
        })
        .catch((err) => console.log(err));
    } else {
      setShowMessage(true);
      // Reset new_password1 và new_password2 thành trống
      if (newPassword1Ref.current) newPassword1Ref.current.value = "";
      if (newPassword2Ref.current) newPassword2Ref.current.value = "";
    }
  };

  return (
    <div className="ProfilePageDesign">
      <strong className="DialogTitle">Thay đổi mật khẩu</strong>

      <Form.Root
        className="FormRootProfile container flex-column"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          const data = Object.fromEntries(new FormData(event.currentTarget));
          // console.log(data);
          updateData(data);
        }}
      >
        <Form.Field className="FormField" name="old_password">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">
              Mật khẩu hiện tại (để trống nếu không muốn thay đổi){" "}
            </Form.Label>

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
            <input className="Input" type="password" minLength={5} required />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="new_password1">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">
              Mật khẩu mới (để trống nếu không muốn thay đổi)
            </Form.Label>

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
              ref={newPassword1Ref}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="new_password2">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Xác nhận mật khẩu mới</Form.Label>

            <Form.Message className="FormMessage" match="valueMissing">
              <InfoCircledIcon className="FormIcon" />
              Trường này không được để trống!
            </Form.Message>

            <Form.Message className="FormMessage" match="tooShort">
              <InfoCircledIcon className="FormIcon" />
              Vui lòng nhập mật khẩu hợp lệ!
            </Form.Message>

            {showMessage && (
              <Form.Message className="FormMessage">
                <InfoCircledIcon className="FormIcon" />
                Mật khẩu xác nhận không khớp với mật khẩu mới. Vui lòng kiểm tra
                lại!
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <input
              className="Input"
              type="password"
              minLength={5}
              required
              ref={newPassword2Ref}
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
          open={open1}
          onOpenChange={setOpen1}
        >
          <Toast.Title className="ToastTitleSuccess">
            Cập nhật mật khẩu thành công!
          </Toast.Title>
          <Toast.Description asChild>
            <span className="ToastDescription">
              Mật khẩu của bạn đã được cập nhật thành công trong hệ thống.
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

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="ToastRoot UpdateFail"
          open={open2}
          onOpenChange={setOpen2}
        >
          <Toast.Title className="ToastTitleFail">
            Cập nhật tài khoản không thành công!
          </Toast.Title>
          <Toast.Description asChild>
            <span className="ToastDescription">
              Tài khoản của người dùng không được cập nhật trong hệ thống.
            </span>
          </Toast.Description>
          <Toast.Action
            className="ToastAction"
            asChild
            altText="Goto schedule to undo"
          >
            <button className="ButtonInToast small red">Đóng</button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </div>
  );
};

export default ChangePassword;
