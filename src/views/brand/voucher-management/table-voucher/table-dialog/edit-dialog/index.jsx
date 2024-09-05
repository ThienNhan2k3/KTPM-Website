import * as Dialog from "@radix-ui/react-dialog";

import * as Form from "@radix-ui/react-form";

import * as Checkbox from "@radix-ui/react-checkbox";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import { Cross2Icon, CheckIcon } from "@radix-ui/react-icons";

import dayjs from "dayjs";

import * as Toast from "@radix-ui/react-toast";

import React from "react";

import { baseAPI } from "@/services/api";

const EditDialog = ({ selectedRow, onSubmit, callbackfn }) => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const timerRef = React.useRef(0);

  const updateData = (data) => {
    console.log(data);

    data.status = data.status ? "Active" : "Inactive";

    console.log(data);

    baseAPI
      .put(
        `http://localhost:5000/voucher/update/${selectedRow.voucher_code}`,
        data,
      )
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
              <Dialog.Title className="DialogTitle" />
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
                noValidate
              >
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
                      Kích hoạt mã khuyến mãi.
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
            Cập nhật voucher thành công!
          </Toast.Title>
          <Toast.Description asChild>
            <span className="ToastDescription">
              Voucher của bạn đã được cập nhật thành công trong hệ thống.
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
            Cập nhật voucher không thành công!
          </Toast.Title>
          <Toast.Description asChild>
            <span className="ToastDescription">
              Voucher của bạn không được cập nhật trong hệ thống.
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
