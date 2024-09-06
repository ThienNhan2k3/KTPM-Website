import { Cross2Icon, ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

import * as Dialog from "@radix-ui/react-dialog";

import * as Select from "@radix-ui/react-select";

import * as Checkbox from "@radix-ui/react-checkbox";

import * as Form from "@radix-ui/react-form";

import * as RadioGroup from "@radix-ui/react-radio-group";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import * as Avatar from "@radix-ui/react-avatar";

import * as Label from "@radix-ui/react-label";

import * as Toast from "@radix-ui/react-toast";

import React from "react";

import { baseAPI } from "@/services/api";

const EditDialog = ({ selectedRow, onSubmit, callbackfn }) => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const timerRef = React.useRef(0);

  const updateData = (data) => {
    data.status = data.status ? "Active" : "Inactive";

    baseAPI
      .put(`/account/update/${"user"}/${selectedRow.id}`, data)
      .then((result) => {
        console.log(result.message);
        if (result.message === "Success") {
          // Hiển thị toast khi xóa thành công
          callbackfn();
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <ScrollArea.Root className="ScrollAreaRoot">
          <ScrollArea.Viewport className="ScrollAreaViewport">
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle">
                Loại người dùng
              </Dialog.Title>

              <Select.Root defaultValue={selectedRow?.type} disabled>
                <Select.Trigger className="SelectTrigger" aria-label="UserType">
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

                      <Select.Item value="Người chơi" className="SelectItem">
                        <Select.ItemText>Người chơi</Select.ItemText>
                        <Select.ItemIndicator className="SelectItemIndicator">
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              <div className="LabelSpace">
                <Label.Root className="LabelRoot">ID:</Label.Root>
                <input
                  className="Input-id"
                  type="text"
                  defaultValue={selectedRow?.id}
                  disabled
                />
              </div>

              <div className="AvatarSpace" style={{ pointerEvents: "none" }}>
                <Avatar.Root className="AvatarRoot">
                  <Avatar.Image
                    className="AvatarImage"
                    src={selectedRow?.avatar}
                    alt="VOU"
                  />
                  <Avatar.Fallback className="AvatarFallback" delayMs={100}>
                    VOU
                  </Avatar.Fallback>
                </Avatar.Root>
              </div>

              <Form.Root
                className="FormRoot"
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = Object.fromEntries(
                    new FormData(event.currentTarget),
                  );
                  updateData(data);
                  onSubmit();
                }}
              >
                <Form.Field className="FormField" name="full_name">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Label className="FormLabel">Họ và tên</Form.Label>
                  </div>
                  <Form.Control asChild>
                    <input
                      className="Input"
                      type="text"
                      disabled
                      defaultValue={selectedRow?.full_name}
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
                      disabled
                      defaultValue={selectedRow?.user_name}
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
                  </div>
                  <Form.Control asChild>
                    <input
                      className="Input"
                      type="password"
                      disabled
                      defaultValue={selectedRow?.password}
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
                      disabled
                      defaultValue={selectedRow?.email}
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
                  </div>
                  <Form.Control asChild>
                    <input
                      className="Input"
                      type="tel"
                      disabled
                      defaultValue={selectedRow?.phone}
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
                  </div>
                  <Form.Control asChild>
                    <input
                      className="Input"
                      type="date"
                      style={{ display: "flow" }}
                      disabled
                      defaultValue={selectedRow?.dob}
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
                      defaultValue={selectedRow?.gender}
                      aria-label="View density"
                      disabled
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <RadioGroup.Item className="RadioGroupItem" value="Nam">
                          <RadioGroup.Indicator className="RadioGroupIndicator" />
                        </RadioGroup.Item>
                        <label className="Label-radiogroup" htmlFor="r1">
                          Nam
                        </label>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <RadioGroup.Item className="RadioGroupItem" value="Nữ">
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
                  </div>
                  <Form.Control asChild>
                    <input
                      className="Input"
                      type="text"
                      disabled
                      defaultValue={selectedRow?.fb_acc}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className="FormField" name="status">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Form.Control asChild>
                      <Checkbox.Root
                        className="CheckboxRoot"
                        defaultChecked={selectedRow?.status === "Active"}
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
                      Lưu thay đổi
                    </button>
                  </div>
                </Form.Submit>
              </Form.Root>

              <Dialog.Close asChild>
                <div className="DialogCloseButton">
                  <button
                    onClick={() => {
                      onSubmit();
                    }}
                    className="design-cancel-button rounded-3"
                  >
                    Hủy
                  </button>
                </div>
              </Dialog.Close>

              <Dialog.Close asChild>
                <button
                  onClick={() => {
                    onSubmit();
                  }}
                  className="IconButton"
                  aria-label="Close"
                >
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

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="ToastRoot UpdateSuccess"
          open={open1}
          onOpenChange={setOpen1}
        >
          <Toast.Title className="ToastTitleSuccess">
            Cập nhật tài khoản thành công!
          </Toast.Title>
          <Toast.Description asChild>
            <span className="ToastDescription">
              Tài khoản của người dùng đã được cập nhật thành công trong hệ
              thống.
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

export default EditDialog;
