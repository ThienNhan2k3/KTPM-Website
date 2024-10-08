import add from "@assets/images/plus-icon-white.png";

import { Cross2Icon, CheckIcon, InfoCircledIcon } from "@radix-ui/react-icons";

import * as Dialog from "@radix-ui/react-dialog";

import * as Form from "@radix-ui/react-form";

import * as Checkbox from "@radix-ui/react-checkbox";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import * as Toast from "@radix-ui/react-toast";

import * as RadioGroup from "@radix-ui/react-radio-group";

import React from "react";

import { baseAPI } from "@/services/api";

import readCookie from "../../../../../../services/api/read_cookie";

const AddDialog = ({ callbackfn }) => {
  const [open1, setOpen1] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [, setShow] = React.useState(false);
  const [, setImage] = React.useState(null);
  const [prevImage, setPrevImage] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const timerRef = React.useRef(0);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

  const handleClose = () => {
    setShow(false);
    setPrevImage(null);
    setImageError(false);
  };

  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      setImage(file);
      setPrevImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleSubmit = (event, data) => {
    event.preventDefault();

    // Validate all fields manually
    const form = event.target;
    let hasError = false;

    // Check all required fields
    form.querySelectorAll("[required]").forEach((input) => {
      if (!input.value) {
        input.setCustomValidity("Trường này không được để trống!");
        hasError = true;
      } else {
        input.setCustomValidity("");
      }
    });

    // Validate image and qrCode specifically
    if (!prevImage) {
      setImageError(true);
      hasError = true;
    } else {
      setImageError(false);
    }

    if (hasError) {
      // Trigger native validation messages
      form.reportValidity();
    } else {
      // Submit the form
      console.log("Form submitted");
      saveData(data);
    }
  };

  const saveData = (data) => {
    data.status = data.status ? "Active" : "Inactive";

    console.log(data);

    baseAPI
      .postForm(`/voucher/create/${readCookie("id")}`, data, file)
      .then((result) => {
        console.log(result.message);
        if (result.message === "voucher_code") {
          setShowMessage(true);
        } else {
          setShowMessage(false);
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
            }}
          >
            <img src={add} alt="" />
            Thêm mã khuyến mãi
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
                    const data = Object.fromEntries(
                      new FormData(event.currentTarget),
                    );
                    handleSubmit(event, data);
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
                      <Form.Label className="FormLabel">
                        Mã khuyến mãi
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
                        Vui lòng mã khuyến mãi hợp lệ!
                      </Form.Message>

                      {showMessage && (
                        <Form.Message className="FormMessage">
                          <InfoCircledIcon className="FormIcon" />
                          Mã khuyến mãi đã tồn tại!
                        </Form.Message>
                      )}
                    </div>
                    <Form.Control asChild>
                      <input
                        className="Input"
                        type="text"
                        minLength={6}
                        required
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
                      <Form.Message
                        className="FormMessage"
                        match="valueMissing"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Trường này không được để trống!
                      </Form.Message>

                      <Form.Message
                        className="FormMessage"
                        match="rangeUnderflow"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Vui lòng nhập giá trị hợp lệ!
                      </Form.Message>

                      <Form.Message
                        className="FormMessage"
                        match="rangeOverflow"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Vui lòng nhập giá trị hợp lệ!
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <input
                        className="Input"
                        type="number"
                        min="1"
                        max="100"
                        required
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
                      <Form.Message
                        className="FormMessage"
                        match="valueMissing"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Trường này không được để trống!
                      </Form.Message>

                      <Form.Message
                        className="FormMessage"
                        match="rangeUnderflow"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Vui lòng nhập giá trị hợp lệ!
                      </Form.Message>

                      <Form.Message
                        className="FormMessage"
                        match="rangeOverflow"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Vui lòng nhập giá trị hợp lệ!
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <input
                        className="Input"
                        type="number"
                        min="1000"
                        max="10000000"
                        required
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
                      <Form.Message
                        className="FormMessage"
                        match="valueMissing"
                      >
                        <InfoCircledIcon className="FormIcon" />
                        Trường này không được để trống!
                      </Form.Message>

                      <Form.Message className="FormMessage" match="tooShort">
                        <InfoCircledIcon className="FormIcon" />
                        Vui lòng nhập mô tả hợp lệ!
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <input
                        className="Input"
                        type="text"
                        minLength={5}
                        required
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
                      {imageError && (
                        <Form.Message className="FormMessage">
                          <InfoCircledIcon className="FormIcon" />
                          Trường này không được để trống!
                        </Form.Message>
                      )}
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
                            cursor: "pointer",
                          }}
                          htmlFor="thumbnail-image"
                        >
                          {prevImage == null ? (
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
                              src={prevImage}
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
                          {prevImage == null ? (
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
                              {prevImage}
                            </span>
                          )}
                        </label>
                        <input
                          type="file"
                          id="thumbnail-image"
                          name="thumbnail-image"
                          accept="image/*"
                          onChange={(event) => handleChangeImage(event)}
                          style={{ display: "none" }}
                        />
                      </div>
                    </Form.Control>
                  </Form.Field>

                  <Form.Field className="FormField" name="type">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Label className="FormLabel">
                        Hình thức sử dụng
                      </Form.Label>
                    </div>
                    <Form.Control asChild>
                      <RadioGroup.Root
                        className="RadioGroupRoot"
                        defaultValue="ONLINE"
                        aria-label="View density"
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <RadioGroup.Item
                            className="RadioGroupItem"
                            value="ONLINE"
                            id="ONLINE"
                          >
                            <RadioGroup.Indicator className="RadioGroupIndicator" />
                          </RadioGroup.Item>
                          <label className="Label-radiogroup" htmlFor="r2">
                            Online
                          </label>
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <RadioGroup.Item
                            className="RadioGroupItem"
                            value="OFFLINE"
                            id="OFFLINE"
                          >
                            <RadioGroup.Indicator className="RadioGroupIndicator" />
                          </RadioGroup.Item>
                          <label className="Label-radiogroup" htmlFor="r1">
                            Offline
                          </label>
                        </div>
                      </RadioGroup.Root>
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
                        Kích hoạt mã khuyến mãi.
                      </label>
                    </div>
                  </Form.Field>

                  <Form.Submit asChild>
                    <div className="FormSubmit">
                      <button className="design-save-button rounded-3">
                        Lưu mã khuyến mãi
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
        <Toast.Root
          className="ToastRoot UpdateSuccess"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="ToastTitle">
            Tạo voucher thành công!
          </Toast.Title>
          <Toast.Description asChild>
            <span className="ToastDescription">
              Voucher của bạn đã được tạo thành công trong hệ thống.
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
