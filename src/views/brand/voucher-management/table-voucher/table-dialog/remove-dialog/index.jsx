import voucherDelete from "@assets/images/quan-ly-voucher-icon.png";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

const RemoveDialog = ({ selectedRow }) => {
  return (
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
          <h5>Mã: {selectedRow?.voucherCode}</h5>
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
            <button className="Button rounded-pill">Xóa voucher</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  );
};

export default RemoveDialog;
