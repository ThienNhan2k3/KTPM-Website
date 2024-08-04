import React from "react";
import search from "@assets/images/search-icon.png";
import add from "@assets/images/plus-icon-white.png";
import userDelete from "@assets/images/delete-icon.png";
import plus from "@assets/images/plus-icon.png";

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

import * as RadioGroup from "@radix-ui/react-radio-group";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import * as Avatar from "@radix-ui/react-avatar";

import * as Label from "@radix-ui/react-label";

import {
  Cross2Icon,
  ChevronDownIcon,
  CheckIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

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

export default function TablePlayer() {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isChecked, setIsChecked] = React.useState(
    selectedRow?.status === "Active",
  );
  const [show, setShow] = React.useState(false);
  const [prevImage, setPrevImage] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setPrevImage(null);
    setShow(false);
  };

  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      setPrevImage(URL.createObjectURL(file));
    }
  };

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
        header: () => <span className="title-table-player">ID</span>,
        accessorKey: "id",
        size: 50,
        cell: (info) => (
          <div className="edit-text" id="id">
            {info.getValue()}
          </div>
        ),
        filterFn: "equalsString", //note: normal non-fuzzy filter column - exact match required
        sortingFn: "alphanumeric",
      },
      {
        header: () => <span className="title-table-player">Họ và tên</span>,
        accessorKey: "fullName",
        id: "fullName",
        size: 135,
        cell: (info) => (
          <div className="edit-text" id="fullName">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //note: normal non-fuzzy filter column
        sortingFn: fuzzySort,
      },
      {
        header: () => <span className="title-table-player">Tên đăng nhập</span>,
        accessorKey: "userName",
        size: 135,
        cell: (info) => (
          <div className="edit-text" id="userName">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //note: normal non-fuzzy filter column - case insensitive
        sortingFn: fuzzySort,
      },

      {
        header: () => <span className="title-table-player">Email</span>,
        accessorKey: "email",
        size: 170,
        cell: (info) => (
          <div className="edit-text" id="email">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title-table-player">Số điện thoại</span>,
        accessorKey: "phone",
        size: 115,
        cell: (info) => (
          <div className="edit-text" id="phone">
            {info.getValue()}
          </div>
        ),
        filterFn: "fuzzy", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title-table-player">Ngày sinh</span>,
        accessorKey: "dob",
        size: 90,
        cell: (info) => (
          <div className="edit-id" id="dob">
            {info.getValue()}
          </div>
        ),
        filterFn: "equalsString", //using our custom fuzzy filter function
        sortingFn: "alphanumeric", //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title-table-player">Giới tính</span>,
        accessorKey: "gender",
        size: 80,
        cell: (info) => (
          <div className="edit-id" id="gender">
            {info.getValue()}
          </div>
        ),
        filterFn: "equalsString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title-table-player">Facebook</span>,
        accessorKey: "facebookacc",
        size: 130,
        cell: (info) => (
          <div className="edit-text" id="facebookacc">
            {info.getValue()}
          </div>
        ),
        filterFn: "fuzzy", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title-table-player">Người dùng</span>,
        accessorKey: "type",
        size: 100,
        cell: (info) => (
          <div className="edit-id" id="type">
            {info.getValue()}
          </div>
        ),
        filterFn: "fuzzy", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title-table-player">Trạng thái</span>,
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
        <div>
          <Dialog.Root open={open1} onOpenChange={setOpen1}>
            <Dialog.Trigger asChild>
              <button
                className="design-add-button rounded-4"
                onClick={() => {
                  handleClose();
                  setImage(null);
                }}
              >
                <img src={add} alt="" />
                Thêm người chơi
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="DialogOverlay-add" />

              <ScrollArea.Root className="ScrollAreaRoot">
                <ScrollArea.Viewport className="ScrollAreaViewport">
                  <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">
                      Loại người dùng
                    </Dialog.Title>

                    <Select.Root defaultValue="admin">
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
                            <Select.Item value="admin" className="SelectItem">
                              <Select.ItemText>Admin</Select.ItemText>
                              <Select.ItemIndicator className="SelectItemIndicator">
                                <CheckIcon />
                              </Select.ItemIndicator>
                            </Select.Item>

                            <Select.Item value="player" className="SelectItem">
                              <Select.ItemText>Người chơi</Select.ItemText>
                              <Select.ItemIndicator className="SelectItemIndicator">
                                <CheckIcon />
                              </Select.ItemIndicator>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>

                    <div className="AvatarSpace">
                      <Avatar.Root className="AvatarRoot" onClick={handleShow}>
                        <Avatar.Image
                          className={`AvatarImage ${image == null ? "change-image-button" : ""}`}
                          src={image == null ? plus : image}
                          alt="Avatar"
                        />
                      </Avatar.Root>
                    </div>

                    <Dialog.Root centered open={show} onHide={handleClose}>
                      <Dialog.Portal>
                        <Dialog.Overlay className="DialogOverlayI" />
                        <Dialog.Content className="DialogContentI">
                          <Dialog.Title className="DialogTitleI">
                            Chọn ảnh
                          </Dialog.Title>

                          <div className="d-flex justify-content-center">
                            <label
                              className="btn d-flex flex-row align-items-center"
                              style={{
                                backgroundColor: "#D9D9D9",
                                cursor: "pointer",
                                color: "black",
                                border: "none",
                                minHeight: "40px",
                                marginTop: "16px",
                                marginBottom: "28px",
                              }}
                              htmlFor="thumbnail-image"
                            >
                              {prevImage == null ? (
                                <>
                                  <img
                                    src={plus}
                                    alt=""
                                    style={{
                                      width: "22px",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Tải ảnh lên
                                </>
                              ) : (
                                <img
                                  src={prevImage}
                                  alt=""
                                  style={{ width: "300px" }}
                                />
                              )}
                            </label>
                            <input
                              type="file"
                              id="thumbnail-image"
                              name="thumbnail-image"
                              accept="image/*"
                              onChange={(event) => handleChangeImage(event)}
                            />
                          </div>

                          <div
                            style={{
                              border: "none",
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Dialog.Close className="DialogCloseI">
                              <button
                                style={{
                                  backgroundColor: "#FF5526",
                                  color: "white",
                                  padding: "5px 15px",
                                }}
                                onClick={handleClose}
                              >
                                Hủy
                              </button>
                            </Dialog.Close>

                            <Dialog.Close className="DialogCloseI">
                              <button
                                style={{
                                  backgroundColor: "#1FAB89",
                                  color: "white",
                                  padding: "5px 15px",
                                }}
                                onClick={() => {
                                  if (prevImage != null) {
                                    setImage(prevImage);
                                  }
                                  handleClose();
                                }}
                              >
                                Lưu ảnh đại diện
                              </button>
                            </Dialog.Close>
                          </div>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>

                    <Form.Root
                      className="FormRoot"
                      onSubmit={(event) => {
                        wait().then(() => setOpen1(false));
                        event.preventDefault();
                      }}
                    >
                      <Form.Field className="FormField" name="fullName">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Label className="FormLabel">
                            Họ và tên
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
                            Vui lòng nhập họ và tên hợp lệ!
                          </Form.Message>
                        </div>
                        <Form.Control asChild>
                          <input
                            className="Input"
                            type="text"
                            minLength={3}
                            required
                          />
                        </Form.Control>
                      </Form.Field>

                      <Form.Field className="FormField" name="userName">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Label className="FormLabel">
                            Tên đăng nhập
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
                            Vui lòng nhập tên đăng nhập hợp lệ!
                          </Form.Message>
                        </div>
                        <Form.Control asChild>
                          <input
                            className="Input"
                            type="text"
                            minLength={3}
                            required
                          />
                        </Form.Control>
                      </Form.Field>

                      <Form.Field className="FormField" name="password">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Label className="FormLabel">
                            Mật khẩu
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
                            Vui lòng nhập mật khẩu hợp lệ!
                          </Form.Message>
                        </div>
                        <Form.Control asChild>
                          <input
                            className="Input"
                            type="password"
                            minLength={5}
                            required
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
                          <Form.Message
                            className="FormMessage"
                            match="valueMissing"
                          >
                            <InfoCircledIcon className="FormIcon" />
                            Trường này không được để trống!
                          </Form.Message>

                          <Form.Message
                            className="FormMessage"
                            match="typeMismatch"
                          >
                            <InfoCircledIcon className="FormIcon" />
                            Vui lòng nhập email hợp lệ!
                          </Form.Message>
                        </div>
                        <Form.Control asChild>
                          <input className="Input" type="email" required />
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
                            Vui lòng nhập số điện thoại hợp lệ!
                          </Form.Message>
                        </div>
                        <Form.Control asChild>
                          <input
                            className="Input"
                            type="tel"
                            pattern="\d{10}"
                            required
                          />
                        </Form.Control>
                      </Form.Field>

                      <Form.Field className="FormField" name="dob">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Label className="FormLabel">
                            Ngày sinh
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
                            Vui lòng nhập ngày sinh hợp lệ!
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

                      <Form.Field className="FormField" name="gender">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Label className="FormLabel">
                            Giới tính
                          </Form.Label>
                        </div>
                        <RadioGroup.Root
                          className="RadioGroupRoot"
                          defaultValue="male"
                          aria-label="View density"
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <RadioGroup.Item
                              className="RadioGroupItem"
                              value="male"
                              id="male"
                            >
                              <RadioGroup.Indicator className="RadioGroupIndicator" />
                            </RadioGroup.Item>
                            <label className="Label-radiogroup" htmlFor="r1">
                              Nam
                            </label>
                          </div>

                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <RadioGroup.Item
                              className="RadioGroupItem"
                              value="female"
                              id="female"
                            >
                              <RadioGroup.Indicator className="RadioGroupIndicator" />
                            </RadioGroup.Item>
                            <label className="Label-radiogroup" htmlFor="r2">
                              Nữ
                            </label>
                          </div>
                        </RadioGroup.Root>
                      </Form.Field>

                      <Form.Field className="FormField" name="facebookacc">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Label className="FormLabel">
                            Tài khoản Facebook
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
                            Vui lòng nhập tài khoản Facebook hợp lệ!
                          </Form.Message>
                        </div>
                        <Form.Control asChild>
                          <input
                            className="Input"
                            type="text"
                            minLength={3}
                            required
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
                              Lưu người chơi
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
      <table className="table-player">
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
                              ? "cursor-pointer select-none header-table-player title-table-player"
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
                    <ScrollArea.Root className="ScrollAreaRoot">
                      <ScrollArea.Viewport className="ScrollAreaViewport">
                        <Dialog.Content className="DialogContent">
                          <Dialog.Title className="DialogTitle">
                            Loại người dùng
                          </Dialog.Title>
                          <Select.Root
                            defaultValue={selectedRow?.type}
                            disabled
                          >
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
                                  <Select.Item
                                    value="Admin"
                                    className="SelectItem"
                                  >
                                    <Select.ItemText>Admin</Select.ItemText>
                                    <Select.ItemIndicator className="SelectItemIndicator">
                                      <CheckIcon />
                                    </Select.ItemIndicator>
                                  </Select.Item>
                                  <Select.Item
                                    value="Người chơi"
                                    className="SelectItem"
                                  >
                                    <Select.ItemText>
                                      Người chơi
                                    </Select.ItemText>
                                    <Select.ItemIndicator className="SelectItemIndicator">
                                      <CheckIcon />
                                    </Select.ItemIndicator>
                                  </Select.Item>
                                </Select.Viewport>
                              </Select.Content>
                            </Select.Portal>
                          </Select.Root>
                          <div className="LabelSpace">
                            <Label.Root className="LabelRoot">ID:</Label.Root>
                            <input
                              className="Input-id"
                              type="text"
                              defaultValue={selectedRow?.id}
                              disabled
                            />
                          </div>
                          <div
                            className="AvatarSpace"
                            style={{ pointerEvents: "none" }}
                          >
                            <Avatar.Root className="AvatarRoot">
                              <Avatar.Image
                                className="AvatarImage"
                                src={selectedRow?.avatar}
                                alt="VOU"
                              />
                              <Avatar.Fallback
                                className="AvatarFallback"
                                delayMs={600}
                              >
                                VOU
                              </Avatar.Fallback>
                            </Avatar.Root>
                          </div>
                          <Form.Root
                            className="FormRoot"
                            onSubmit={(event) => {
                              wait().then(() => setOpen2(false));
                              event.preventDefault();
                            }}
                          >
                            <Form.Field className="FormField" name="fullName">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Form.Label className="FormLabel">
                                  Họ và tên
                                </Form.Label>
                              </div>
                              <Form.Control asChild>
                                <input
                                  className="Input"
                                  type="text"
                                  disabled
                                  defaultValue={selectedRow?.fullName}
                                />
                              </Form.Control>
                            </Form.Field>
                            <Form.Field className="FormField" name="userName">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Form.Label className="FormLabel">
                                  Tên đăng nhập
                                </Form.Label>
                              </div>
                              <Form.Control asChild>
                                <input
                                  className="Input"
                                  type="text"
                                  disabled
                                  defaultValue={selectedRow?.userName}
                                />
                              </Form.Control>
                            </Form.Field>
                            <Form.Field className="FormField" name="password">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Form.Label className="FormLabel">
                                  Mật khẩu
                                </Form.Label>
                              </div>
                              <Form.Control asChild>
                                <input
                                  className="Input"
                                  type="password"
                                  disabled
                                  defaultValue={selectedRow?.password}
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
                                <Form.Label className="FormLabel">
                                  Email
                                </Form.Label>
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
                            <Form.Field className="FormField" name="dob">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Form.Label className="FormLabel">
                                  Ngày sinh
                                </Form.Label>
                              </div>
                              <Form.Control asChild>
                                <input
                                  className="Input"
                                  type="date"
                                  style={{ display: "flow" }}
                                  disabled
                                  defaultValue={selectedRow?.dob}
                                />
                              </Form.Control>
                            </Form.Field>
                            <Form.Field className="FormField" name="gender">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Form.Label className="FormLabel">
                                  Giới tính
                                </Form.Label>
                              </div>
                              <RadioGroup.Root
                                className="RadioGroupRoot"
                                defaultValue={selectedRow?.gender}
                                aria-label="View density"
                                disabled
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <RadioGroup.Item
                                    className="RadioGroupItem"
                                    value="Nam"
                                    id="Nam"
                                  >
                                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                                  </RadioGroup.Item>
                                  <label
                                    className="Label-radiogroup"
                                    htmlFor="r1"
                                  >
                                    Nam
                                  </label>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <RadioGroup.Item
                                    className="RadioGroupItem"
                                    value="Nữ"
                                    id="Nữ"
                                  >
                                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                                  </RadioGroup.Item>
                                  <label
                                    className="Label-radiogroup"
                                    htmlFor="r2"
                                  >
                                    Nữ
                                  </label>
                                </div>
                              </RadioGroup.Root>
                            </Form.Field>
                            <Form.Field
                              className="FormField"
                              name="facebookacc"
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Form.Label className="FormLabel">
                                  Tài khoản Facebook
                                </Form.Label>
                              </div>
                              <Form.Control asChild>
                                <input
                                  className="Input"
                                  type="text"
                                  disabled
                                  defaultValue={selectedRow?.facebookacc}
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
                        <img src={userDelete} alt="" />
                      </AlertDialog.Title>
                      <AlertDialog.Title className="AlertDialogTitle">
                        <span>Xóa tài khoản</span>
                      </AlertDialog.Title>
                      <AlertDialog.Description className="AlertDialogDescription">
                        <h5>Người dùng: {selectedRow?.userName}</h5>
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
