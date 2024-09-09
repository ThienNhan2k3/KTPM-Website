import React from "react";
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

import { compareItems, rankItem } from "@tanstack/match-sorter-utils";

import * as Dialog from "@radix-ui/react-dialog";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { baseAPI } from "@/services/api";

import dayjs from "dayjs";

import SearchBar from "./search-bar";
import Pagination from "./pagination";
import TableContextMenu from "./context-menu";
import EditDialog from "./table-dialog/edit-dialog";
import RemoveDialog from "./table-dialog/remove-dialog";

import io from "socket.io-client";

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank,
    );
  }
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 100));

export default function TableBrand() {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [open, setOpen] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [data, setData] = React.useState([]);

  const getData = () => {
    const newSocket = io(`http://localhost:5000`);
    newSocket?.on("message", (message) => {
      console.log("message:::", message);
    });

    baseAPI
      .get(`/account/getAll/${"brand"}`)
      .then((accounts) => {
        setData(accounts);
        // console.log(accounts);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData();
  }, []);

  const getDataRow = (row) => {
    // console.log("original" + row.original);
    setSelectedRow(row.original);
  };

  const columns = React.useMemo(
    () => [
      {
        header: () => <span className="title-table-brand">ID</span>,
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
        header: () => (
          <span className="title-table-brand">Tên thương hiệu</span>
        ),
        accessorKey: "brand_name",
        id: "brand_name",
        size: 160,
        cell: (info) => (
          <div className="edit-text" id="brand_name">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesStringSensitive", //note: normal non-fuzzy filter column
        sortingFn: fuzzySort,
      },
      {
        header: () => <span className="title-table-brand">Lĩnh vực</span>,
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
        header: () => <span className="title-table-brand">Địa chỉ</span>,
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
        header: () => <span className="title-table-brand">Email</span>,
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
        header: () => <span className="title-table-brand">Số điện thoại</span>,
        accessorKey: "phone",
        size: 130,
        cell: (info) => (
          <div className="edit-id" id="phone">
            {info.getValue()}
          </div>
        ),
        filterFn: "fuzzy", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title-table-brand">Trạng thái</span>,
        accessorKey: "status",
        size: 90,
        cell: (info) => (
          <div className="edit-id" id="status">
            {info.getValue()}
          </div>
        ),
        filterFn: "equalsString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title-table-brand">Cập nhật</span>,
        accessorKey: "time_update",
        size: 150,
        cell: (info) => (
          <div className="edit-text" id="time_update">
            {dayjs(info.getValue()).format("DD-MM-YYYY HH:mm:ss")}
          </div>
        ),
        filterFn: "equalsString", //using our custom fuzzy filter function
        sortingFn: "alphanumeric", //sort by fuzzy rank (falls back to alphanumeric)
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "brand_name") {
      if (table.getState().sorting[0]?.id !== "brand_name") {
        table.setSorting([{ id: "brand_name", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="p-2">
      <div className="design-margin">
        <SearchBar
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
        />
      </div>
      <div className="h-2" />
      <p className="custom-notice">
        *Nhấp chuột phải vào các dòng trong bảng để chọn thao tác chỉnh sửa hoặc
        xóa thông tin.
      </p>
      <table className="table-brand">
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
                              ? "cursor-pointer select-none header-table-brand title-table-brand"
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
              <Dialog.Root
                key={row.id}
                open={open && open === row.id}
                onOpenChange={() => setOpen(row.id)}
              >
                <AlertDialog.Root>
                  <TableContextMenu
                    row={row}
                    onClick={(row) => getDataRow(row)}
                  />

                  <EditDialog
                    selectedRow={selectedRow}
                    callbackfn={getData}
                    onSubmit={() => {
                      wait().then(() => setOpen(null));
                    }}
                  />

                  <RemoveDialog
                    selectedRow={selectedRow}
                    callbackfn={getData}
                  />
                </AlertDialog.Root>
              </Dialog.Root>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <Pagination table={table} />
    </div>
  );
}
