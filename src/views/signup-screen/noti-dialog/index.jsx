import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { Link } from "react-router-dom";

const NotiDialog = () => {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">
          Đăng ký thành công!
        </AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          Tài khoản thương hiệu của bạn đã được tạo thành công! Hãy chờ tài
          khoản được xét duyệt và bạn có thể đăng nhập bằng thông tin đăng nhập
          của mình.
        </AlertDialog.Description>
        <div
          style={{
            display: "flex",
            gap: 25,
            justifyContent: "flex-end",
          }}
        >
          <AlertDialog.Action asChild>
            <button
              className="LoginTitle"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0",
                width: "180px",
              }}
            >
              <Link to=".." style={{ color: "white" }}>
                Đăng nhập
              </Link>
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  );
};

export default NotiDialog;
