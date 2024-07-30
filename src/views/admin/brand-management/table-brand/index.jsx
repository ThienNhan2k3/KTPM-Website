import React from "react";
import search from "@assets/images/search-icon.png";
import userDelete from "@assets/images/delete-icon.png";

import "./styles.css";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";

// A TanStack fork of Kent C. Dodds' match-sorter library that provides ranking information
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";

import { makeData } from "./makeData";

import * as ContextMenu from "@radix-ui/react-context-menu";

import * as Dialog from "@radix-ui/react-dialog";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

import * as Select from "@radix-ui/react-select";

import * as Form from "@radix-ui/react-form";

import * as Checkbox from "@radix-ui/react-checkbox";

import { Cross2Icon, ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Define a custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank,
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export default function TableBrand() {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isChecked, setIsChecked] = React.useState(
    selectedRow?.status === "Active",
  );

  React.useEffect(() => {
    setIsChecked(selectedRow?.status === "Active");
  }, [selectedRow]);

  const getDataRow = (row) => {
    console.log(row.original);
    setSelectedRow(row.original);
  };

  const columns = React.useMemo(
    () => [
      {
        header: () => <span className="title">ID</span>,
        accessorKey: "id",
        size: 50,
        cell: (info) => (
          <div className="edit-id" id="id">
            {info.getValue()}
          </div>
        ),
        filterFn: "equalsString", //note: normal non-fuzzy filter column - exact match required
        sortingFn: "alphanumeric",
      },
      {
        header: () => <span className="title">Tên thương hiệu</span>,
        accessorKey: "brandName",
        id: "brandName",
        size: 160,
        cell: (info) => (
          <div className="edit-text" id="brandName">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesStringSensitive", //note: normal non-fuzzy filter column
        sortingFn: fuzzySort,
      },
      {
        header: () => <span className="title">Lĩnh vực</span>,
        accessorKey: "industry",
        size: 200,
        cell: (info) => (
          <div className="edit-text" id="industry">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //note: normal non-fuzzy filter column - case insensitive
        sortingFn: fuzzySort,
      },
      {
        header: () => <span className="title">Địa chỉ</span>,
        accessorKey: "address",
        size: 180,
        cell: (info) => (
          <div className="edit-text" id="address">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title">GPS(Lat/Long)</span>,
        accessorKey: "gps",
        size: 150,
        cell: (info) => (
          <div className="edit-text" id="gps">
            {info.getValue()}
          </div>
        ),
        filterFn: "equalsString", //using our custom fuzzy filter function
        sortingFn: "alphanumeric", //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title">Email</span>,
        accessorKey: "email",
        size: 200,
        cell: (info) => (
          <div className="edit-text" id="email">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title">Số điện thoại</span>,
        accessorKey: "phone",
        size: 130,
        cell: (info) => (
          <div className="edit-text" id="phone">
            {info.getValue()}
          </div>
        ),
        filterFn: "fuzzy", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title">Trạng thái</span>,
        accessorKey: "status",
        size: 90,
        cell: (info) => (
          <div className="edit-id" id="status">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
    ],
    [],
  );

  const [data] = React.useState(() => makeData(5000));
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy", //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  //apply the fuzzy sort if the fullName column is being filtered
  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "brandName") {
      if (table.getState().sorting[0]?.id !== "brandName") {
        table.setSorting([{ id: "brandName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="p-2">
      <div className="design-margin">
        <div className="display-title">
          <div className="design-title">
            <img src={search} alt="" />
            <span>Tìm kiếm</span>
          </div>
          <div>
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="search-box rounded-pill"
              placeholder="Search all columns..."
            />
          </div>
        </div>
      </div>
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: `${header.getSize()}px`,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none header title"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: "🔼",
                            desc: "🔽",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Dialog.Root key={row.id} open={open} onOpenChange={setOpen}>
                <AlertDialog.Root>
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
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
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
                            onClick={() => getDataRow(row)}
                          >
                            Chỉnh sửa
                          </ContextMenu.Item>
                        </Dialog.Trigger>

                        <AlertDialog.Trigger asChild>
                          <ContextMenu.Item
                            className="ContextMenuItem"
                            onClick={() => getDataRow(row)}
                          >
                            Xóa
                          </ContextMenu.Item>
                        </AlertDialog.Trigger>
                      </ContextMenu.Content>
                    </ContextMenu.Portal>
                  </ContextMenu.Root>

                  <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Title className="DialogTitle">
                        Loại người dùng
                      </Dialog.Title>

                      <Select.Root defaultValue="brand" disabled>
                        <Select.Trigger
                          className="SelectTrigger"
                          aria-label="UserType"
                        >
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

                      <Form.Root
                        className="FormRoot"
                        onSubmit={(event) => {
                          wait().then(() => setOpen(false));
                          event.preventDefault();
                        }}
                        disabled
                      >
                        <Form.Field className="FormField" name="brandName">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              justifyContent: "space-between",
                            }}
                          >
                            <Form.Label className="FormLabel">
                              Tên thương hiệu
                            </Form.Label>
                          </div>
                          <Form.Control asChild>
                            <input
                              className="Input"
                              type="text"
                              disabled
                              defaultValue={selectedRow?.brandName}
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
                            <Form.Label className="FormLabel">
                              Lĩnh vực
                            </Form.Label>
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
                            <Form.Label className="FormLabel">
                              Địa chỉ
                            </Form.Label>
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
                            <Form.Label className="FormLabel">
                              GPS (Lat/Long)
                            </Form.Label>
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
                            <Form.Label className="FormLabel">
                              Số điện thoại
                            </Form.Label>
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
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Checkbox.Root
                              className="CheckboxRoot"
                              checked={isChecked}
                              onCheckedChange={(checked) =>
                                setIsChecked(checked)
                              }
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
                  </Dialog.Portal>

                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="AlertDialogOverlay" />
                    <AlertDialog.Content className="AlertDialogContent">
                      <AlertDialog.Title className="AlertDialogTitle">
                        <img src={userDelete} alt="" />
                      </AlertDialog.Title>
                      <AlertDialog.Title className="AlertDialogTitle">
                        <span>Xóa tài khoản</span>
                      </AlertDialog.Title>
                      <AlertDialog.Description className="AlertDialogDescription">
                        <h5>Người dùng: {selectedRow?.brandName}</h5>
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
                          <button className="Button rounded-pill">
                            Xóa tài khoản
                          </button>
                        </AlertDialog.Action>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </Dialog.Root>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="page-number">
        <div className="show-page-number">
          <span className="design-page-number">
            <div style={{ marginRight: "5px" }}>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="design-border">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              min={1} // Xác định giá trị min là 1
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="page-number-box rounded"
            />
          </span>
        </div>
        <div className="combo-button">
          <button
            className="design-button"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="design-button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="design-button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="design-button"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
