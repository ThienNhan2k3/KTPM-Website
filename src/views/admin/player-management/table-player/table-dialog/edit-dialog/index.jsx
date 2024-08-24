import { Cross2Icon, ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

import * as Select from "@radix-ui/react-select";

import * as Checkbox from "@radix-ui/react-checkbox";

import * as Form from "@radix-ui/react-form";

import * as RadioGroup from "@radix-ui/react-radio-group";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import * as Avatar from "@radix-ui/react-avatar";

import * as Label from "@radix-ui/react-label";

const EditDialog = ({ selectedRow, onSubmit }) => {
  const [isChecked, setIsChecked] = React.useState(
    selectedRow?.status === "Active",
  );

  React.useEffect(() => {
    setIsChecked(selectedRow?.status === "Active");
  }, [selectedRow]);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Loại người dùng</Dialog.Title>
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
                <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                  VOU
                </Avatar.Fallback>
              </Avatar.Root>
            </div>
            <Form.Root className="FormRoot" onSubmit={onSubmit}>
              <Form.Field className="FormField" name="fullName">
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
                    defaultValue={selectedRow?.fullName}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="userName">
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
                    defaultValue={selectedRow?.userName}
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
              </Form.Field>
              <Form.Field className="FormField" name="facebookacc">
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
                    defaultValue={selectedRow?.facebookacc}
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
                  <Checkbox.Root
                    className="CheckboxRoot"
                    checked={isChecked}
                    onCheckedChange={(checked) => setIsChecked(checked)}
                  >
                    <Checkbox.Indicator className="CheckboxIndicator">
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label className="Label" htmlFor="c1">
                    Kích hoạt tài khoản.
                  </label>
                </div>
              </Form.Field>
              <div className="custom-layout-submit">
                <Dialog.Close asChild>
                  <div className="DialogClose">
                    <button className="design-cancel-button rounded-3">
                      Hủy
                    </button>
                  </div>
                </Dialog.Close>
                <Form.Submit asChild>
                  <div className="FormSubmit">
                    <button className="design-save-button rounded-3">
                      Lưu thay đổi
                    </button>
                  </div>
                </Form.Submit>
              </div>
            </Form.Root>
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
  );
};

export default EditDialog;
