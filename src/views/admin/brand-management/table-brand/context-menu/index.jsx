import { flexRender } from "@tanstack/react-table";
import * as ContextMenu from "@radix-ui/react-context-menu";

import * as Dialog from "@radix-ui/react-dialog";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

const TableContextMenu = ({ row, onClick }) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <tr
          style={{
            borderBottom: "1px solid #0F67B1",
            textWrap: "nowrap",
          }}
          key={row.id}
        >
          {row.getVisibleCells().map((cell) => {
            return (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className="ContextMenuContent">
          <Dialog.Trigger asChild>
            <ContextMenu.Item
              className="ContextMenuItem"
              onClick={() => onClick(row)}
            >
              Chỉnh sửa
            </ContextMenu.Item>
          </Dialog.Trigger>

          <AlertDialog.Trigger asChild>
            <ContextMenu.Item
              className="ContextMenuItem"
              onClick={() => onClick(row)}
            >
              Xóa
            </ContextMenu.Item>
          </AlertDialog.Trigger>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default TableContextMenu;
