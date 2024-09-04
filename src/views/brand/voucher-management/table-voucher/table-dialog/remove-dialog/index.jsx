import voucherDelete from "@assets/images/quan-ly-voucher-icon.png";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

import * as Toast from "@radix-ui/react-toast";

import React from "react";

import { baseAPI } from "@/services/api";

const RemoveDialog = ({ selectedRow, callbackfn }) => {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef(0);

  const deleteData = () => {
    console.log(selectedRow?.id);
    baseAPI
      .del(`http://localhost:5000/voucher/delete/${selectedRow?.voucher_code}`)
      .then((result) => {
        console.log(result.message);
        if (result.message === "Success") {
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
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            <img src={voucherDelete} alt="" />
          </AlertDialog.Title>

          <AlertDialog.Title className="AlertDialogTitle">
            <span>Xóa voucher</span>
          </AlertDialog.Title>

          <AlertDialog.Description className="AlertDialogDescription">
            <h5>Mã: {selectedRow?.voucher_code}</h5>
          </AlertDialog.Description>

          <div
            style={{
              display: "flex",
              gap: 25,
              justifyContent: "center",
            }}
          >
            <AlertDialog.Cancel asChild>
              <button className="Button rounded-pill">Hủy</button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={() => deleteData()}
                className="Button rounded-pill"
              >
                Xóa voucher
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>

      <Toast.Provider swipeDirection="right">
        <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
          <Toast.Title className="ToastTitle">
            Xóa tài khoản thành công!
          </Toast.Title>
          <Toast.Description asChild>
            <span className="ToastDescription">
              Tài khoản của thương hiệu đã bị vô hiệu hoá thành công trong hệ
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
    </div>
  );
};

export default RemoveDialog;
