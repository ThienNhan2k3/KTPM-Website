import { Cross2Icon, ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";

import * as Form from "@radix-ui/react-form";
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
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Loại người dùng</Dialog.Title>

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

        <Form.Root className="FormRoot" onSubmit={onSubmit} disabled>
          <Form.Field className="FormField" name="brand_name">
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
                disabled
                defaultValue={selectedRow?.brand_name}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="FormField" name="industry">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Lĩnh vực</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                disabled
                defaultValue={selectedRow?.industry}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="FormField" name="address">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Địa chỉ</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                disabled
                defaultValue={selectedRow?.address}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="FormField" name="gps">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">GPS (Lat/Long)</Form.Label>
            </div>
            <Form.Control asChild>
              <input
                className="Input"
                type="text"
                disabled
                defaultValue={selectedRow?.gps}
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

          <Form.Field className="FormField" name="status">
            <div style={{ display: "flex", alignItems: "center" }}>
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
                <button className="design-cancel-button rounded-3">Hủy</button>
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
    </Dialog.Portal>
  );
};

export default EditDialog;
