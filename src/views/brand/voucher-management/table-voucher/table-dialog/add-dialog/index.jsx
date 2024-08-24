import add from "@assets/images/plus-icon-white.png";

import { Cross2Icon, CheckIcon, InfoCircledIcon } from "@radix-ui/react-icons";

import * as Dialog from "@radix-ui/react-dialog";

import * as Form from "@radix-ui/react-form";

import * as Checkbox from "@radix-ui/react-checkbox";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import React from "react";
const AddDialog = () => {
  const [open1, setOpen1] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [qrCodeError, setQrCodeError] = React.useState(false);
  const [, setShow] = React.useState(false);
  const [, setImage] = React.useState(null);
  const [prevImage, setPrevImage] = React.useState(null);
  const [, setQrCode] = React.useState(null);
  const [prevQrCode, setPrevQrCode] = React.useState(null);

  const handleClose = () => {
    setShow(false);
    setPrevImage(null);
    setPrevQrCode(null);
    setImageError(false);
    setQrCodeError(false);
  };

  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      setImage(file);
      setPrevImage(URL.createObjectURL(file));
    }
  };

  const handleChangeQrCode = (event) => {
    const [file] = event.target.files;
    if (file) {
      setQrCode(file);
      setPrevQrCode(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
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

    if (!prevQrCode) {
      setQrCodeError(true);
      hasError = true;
    } else {
      setQrCodeError(false);
    }

    if (hasError) {
      // Trigger native validation messages
      form.reportValidity();
    } else {
      // Submit the form
      console.log("Form submitted");
      setOpen1(false);
    }
  };

  return (
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
                  handleSubmit(event);
                }}
                noValidate
              >
                <Form.Field
                  className="FormField"
                  name="voucherCode"
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
                    <Form.Message className="FormMessage" match="valueMissing">
                      <InfoCircledIcon className="FormIcon" />
                      Trường này không được để trống!
                    </Form.Message>

                    <Form.Message className="FormMessage" match="tooShort">
                      <InfoCircledIcon className="FormIcon" />
                      Vui lòng mã khuyến mãi hợp lệ!
                    </Form.Message>
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
                    <Form.Message className="FormMessage" match="valueMissing">
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

                    <Form.Message className="FormMessage" match="rangeOverflow">
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

                <Form.Field className="FormField" name="maxDiscount">
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
                    <Form.Message className="FormMessage" match="valueMissing">
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

                    <Form.Message className="FormMessage" match="rangeOverflow">
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
                    <Form.Message className="FormMessage" match="valueMissing">
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

                <Form.Field className="FormField" name="qrCode">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Label className="FormLabel">Mã QR</Form.Label>
                    {qrCodeError && (
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
                        htmlFor="thumbnail-qrCode"
                      >
                        {prevQrCode == null ? (
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
                            src={prevQrCode}
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
                        htmlFor="thumbnail-qrCode"
                      >
                        {prevQrCode == null ? (
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
                            {prevQrCode}
                          </span>
                        )}
                      </label>
                      <input
                        type="file"
                        id="thumbnail-qrCode"
                        name="thumbnail-qrCode"
                        accept="image/*"
                        onChange={(event) => handleChangeQrCode(event)}
                        style={{ display: "none" }}
                      />
                    </div>
                  </Form.Control>
                </Form.Field>

                <Form.Field className="FormField" name="expDate">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Label className="FormLabel">Ngày hết hạn</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                      <InfoCircledIcon className="FormIcon" />
                      Trường này không được để trống!
                    </Form.Message>

                    <Form.Message
                      className="FormMessage"
                      match="patternMismatch"
                    >
                      <InfoCircledIcon className="FormIcon" />
                      Vui lòng nhập ngày hết hạn hợp lệ!
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

                <Form.Field className="FormField" name="status">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox.Root className="CheckboxRoot">
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
                        Lưu mã khuyến mãi
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
    </Dialog.Root>
  );
};

export default AddDialog;
