import React from "react";

import * as Dialog from "@radix-ui/react-dialog";

import * as Form from "@radix-ui/react-form";

import * as Checkbox from "@radix-ui/react-checkbox";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import { Cross2Icon, CheckIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";

const EditDialog = ({ selectedRow, onSubmit }) => {
  const [isChecked, setIsChecked] = React.useState(
    selectedRow?.status === "Active",
  );

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle" />
            <Form.Root className="FormRoot" onSubmit={onSubmit} noValidate>
              <Form.Field
                className="FormField"
                name="voucher_code"
                style={{ marginTop: "10px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Mã khuyến mãi</Form.Label>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input"
                    type="text"
                    disabled
                    defaultValue={selectedRow?.voucher_code}
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField" name="value">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Giá trị (%)</Form.Label>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input"
                    type="number"
                    disabled
                    defaultValue={selectedRow?.value}
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField" name="max_discount">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">
                    Giảm giá tối đa (VND)
                  </Form.Label>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input"
                    type="number"
                    disabled
                    defaultValue={selectedRow?.max_discount}
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField" name="description">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Mô tả</Form.Label>
                </div>
                <Form.Control asChild>
                  <textarea
                    className="Input-description"
                    type="text"
                    disabled
                    defaultValue={selectedRow?.description}
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField" name="image">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Hình ảnh</Form.Label>
                </div>
                <Form.Control asChild>
                  <div className="ChooseFileSpace">
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #3FA2F6",
                        padding: "5px 15px",
                        width: "fit-content",
                        borderRadius: "8px",
                        pointerEvents: "none",
                      }}
                      htmlFor="thumbnail-image"
                    >
                      {selectedRow?.image == null ? (
                        <>
                          <div
                            style={{
                              color: "#69b4f3",
                              fontWeight: "500",
                            }}
                          >
                            Choose File
                          </div>
                        </>
                      ) : (
                        <img
                          src={selectedRow?.image}
                          alt=""
                          style={{ width: "150px" }}
                        />
                      )}
                    </label>

                    <label
                      style={{
                        marginLeft: "15px",
                        display: "flex",
                        alignItems: "end",
                        width: "180px",
                        pointerEvents: "none",
                      }}
                      htmlFor="thumbnail-image"
                    >
                      {selectedRow?.image == null ? (
                        <>
                          <div>file...name.jpg</div>
                        </>
                      ) : (
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            height: "24px",
                          }}
                        >
                          {selectedRow?.image}
                        </span>
                      )}
                    </label>
                  </div>
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField" name="time_update">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel">Ngày cập nhật</Form.Label>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input"
                    type="datetime"
                    style={{ display: "flow" }}
                    disabled
                    defaultValue={dayjs(selectedRow?.time_update).format(
                      "DD-MM-YYYY HH:mm:ss",
                    )}
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
                    Kích hoạt mã khuyến mãi.
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
