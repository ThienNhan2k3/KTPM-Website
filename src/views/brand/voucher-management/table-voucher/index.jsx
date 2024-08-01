import React from "react";
import search from "@assets/images/search-icon.png";
import add from "@assets/images/plus-white-icon.png";
import voucherDelete from "@assets/images/quan-ly-voucher-icon.png";

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

import * as Form from "@radix-ui/react-form";

import * as Checkbox from "@radix-ui/react-checkbox";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import { Cross2Icon, CheckIcon, InfoCircledIcon } from "@radix-ui/react-icons";

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

export default function TableVoucher() {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isChecked, setIsChecked] = React.useState(
    selectedRow?.status === "Active",
  );
  const [, setShow] = React.useState(false);
  const [, setImage] = React.useState(null);
  const [prevImage, setPrevImage] = React.useState(null);
  const [, setQrCode] = React.useState(null);
  const [prevQrCode, setPrevQrCode] = React.useState(null);

  const [imageError, setImageError] = React.useState(false);
  const [qrCodeError, setQrCodeError] = React.useState(false);

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

  const getDataRow = (row) => {
    console.log(row.original);
    setSelectedRow(row.original);
  };

  const columns = React.useMemo(
    () => [
      {
        header: () => <span className="title">ID</span>,
        accessorKey: "id",
        size: 60,
        cell: (info) => <div className="edit-text">{info.getValue()}</div>,
        filterFn: "equalsString", //note: normal non-fuzzy filter column - exact match required
        sortingFn: "alphanumeric",
      },
      {
        header: () => <span className="title">Mã Voucher</span>,
        accessorKey: "voucherCode",
        id: "voucherCode",
        size: 100,
        cell: (info) => (
          <div className="edit-id" id="voucherCode">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesStringSensitive", //note: normal non-fuzzy filter column
        sortingFn: fuzzySort,
      },
      {
        header: () => <span className="title">Giá trị (%)</span>,
        accessorKey: "value",
        size: 80,
        cell: (info) => (
          <div className="edit-id" id="value">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //note: normal non-fuzzy filter column - case insensitive
        sortingFn: fuzzySort,
      },
      {
        header: () => <span className="title">Giảm giá tối đa (VND)</span>,
        accessorKey: "maxDiscount",
        size: 180,
        cell: (info) => (
          <div className="edit-text" id="maxDiscount">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title">Mô tả</span>,
        accessorKey: "description",
        size: 180,
        cell: (info) => (
          <div className="edit-text" id="description">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title">Hỉnh ảnh</span>,
        accessorKey: "image",
        size: 120,
        cell: (info) => (
          <div className="edit-text" id="image">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title">Mã QR</span>,
        accessorKey: "qrCode",
        size: 120,
        cell: (info) => (
          <div className="edit-text" id="qrCode">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title">Ngày hết hạn</span>,
        accessorKey: "expDate",
        size: 130,
        cell: (info) => (
          <div className="edit-id" id="expDate">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title">Trạng thái</span>,
        accessorKey: "status",
        size: 80,
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

                          <Form.Message
                            className="FormMessage"
                            match="tooShort"
                          >
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
                          <Form.Label className="FormLabel">
                            Giá trị (%)
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

                          <Form.Message
                            className="FormMessage"
                            match="tooShort"
                          >
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
                          <Form.Label className="FormLabel">
                            Hình ảnh
                          </Form.Label>
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
                          <Form.Label className="FormLabel">
                            Ngày hết hạn
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
              <Dialog.Root key={row.id} open={open2} onOpenChange={setOpen2}>
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
                            onClick={() => {
                              getDataRow(row);
                            }}
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
                    <ScrollArea.Root className="ScrollAreaRoot">
                      <ScrollArea.Viewport className="ScrollAreaViewport">
                        <Dialog.Content className="DialogContent">
                          <Dialog.Title className="DialogTitle" />
                          <Form.Root
                            className="FormRoot"
                            onSubmit={(event) => {
                              wait().then(() => setOpen2(false));
                              event.preventDefault();
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
                                <Form.Label className="FormLabel">
                                  Mã khuyến mãi
                                </Form.Label>
                              </div>
                              <Form.Control asChild>
                                <input
                                  className="Input"
                                  type="text"
                                  disabled
                                  defaultValue={selectedRow?.voucherCode}
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
                                <Form.Label className="FormLabel">
                                  Giá trị (%)
                                </Form.Label>
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

                            <Form.Field
                              className="FormField"
                              name="maxDiscount"
                            >
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
                                  defaultValue={selectedRow?.maxDiscount}
                                />
                              </Form.Control>
                            </Form.Field>

                            <Form.Field
                              className="FormField"
                              name="description"
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Form.Label className="FormLabel">
                                  Mô tả
                                </Form.Label>
                              </div>
                              <Form.Control asChild>
                                <input
                                  className="Input"
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
                                <Form.Label className="FormLabel">
                                  Hình ảnh
                                </Form.Label>
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

                            <Form.Field className="FormField" name="qrCode">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Form.Label className="FormLabel">
                                  Mã QR
                                </Form.Label>
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
                                    htmlFor="thumbnail-qrCode"
                                  >
                                    {selectedRow?.qrCode == null ? (
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
                                        src={selectedRow?.qrCode}
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
                                    {selectedRow?.qrCode == null ? (
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
                                        {selectedRow?.qrCode}
                                      </span>
                                    )}
                                  </label>
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
                                <Form.Label className="FormLabel">
                                  Ngày hết hạn
                                </Form.Label>
                              </div>
                              <Form.Control asChild>
                                <input
                                  className="Input"
                                  type="date"
                                  style={{ display: "flow" }}
                                  disabled
                                  defaultValue={selectedRow?.expDate}
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
                                  onCheckedChange={(checked) =>
                                    setIsChecked(checked)
                                  }
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
                          <button className="Button rounded-pill">
                            Xóa voucher
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
