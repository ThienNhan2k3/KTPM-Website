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

// A TanStack fork of Kent C. Dodds' match-sorter library that provides ranking information
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";

import { makeData } from "./makeData";

import * as Dialog from "@radix-ui/react-dialog";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

import SearchBar from "./search-bar";
import AddDialog from "./table-dialog/add-dialog";
import TableContextMenu from "./context-menu";
import EditDialog from "./table-dialog/edit-dialog";
import RemoveDialog from "./table-dialog/remove-dialog";
import Pagination from "./pagination";

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

  const [open2, setOpen2] = React.useState(false);

  const [selectedRow, setSelectedRow] = React.useState(null);

  const getDataRow = (row) => {
    console.log(row.original);
    setSelectedRow(row.original);
  };

  const columns = React.useMemo(
    () => [
      {
        header: () => <span className="title-table-voucher">ID</span>,
        accessorKey: "id",
        size: 60,
        cell: (info) => <div className="edit-text">{info.getValue()}</div>,
        filterFn: "equalsString", //note: normal non-fuzzy filter column - exact match required
        sortingFn: "alphanumeric",
      },
      {
        header: () => <span className="title-table-voucher">Mã Voucher</span>,
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
        header: () => <span className="title-table-voucher">Giá trị (%)</span>,
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
        header: () => (
          <span className="title-table-voucher">Giảm giá tối đa (VND)</span>
        ),
        accessorKey: "maxDiscount",
        size: 180,
        cell: (info) => (
          <div className="edit-id" id="maxDiscount">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString", //using our custom fuzzy filter function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        header: () => <span className="title-table-voucher">Mô tả</span>,
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
        header: () => <span className="title-table-voucher">Hỉnh ảnh</span>,
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
        header: () => <span className="title-table-voucher">Mã QR</span>,
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
        header: () => <span className="title-table-voucher">Ngày hết hạn</span>,
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
        header: () => <span className="title-table-voucher">Trạng thái</span>,
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

  const [data] = React.useState(() => makeData(100));
  console.log(data);
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
        <SearchBar
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
        />
        <AddDialog />
      </div>
      <div className="h-2" />
      <table className="table-voucher">
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
                              ? "cursor-pointer select-none header-table-voucher title-table-voucher"
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
                  <TableContextMenu
                    row={row}
                    onClick={(row) => getDataRow(row)}
                  />

                  <EditDialog
                    selectedRow={selectedRow}
                    onSubmit={(event) => {
                      wait().then(() => setOpen2(false));
                      event.preventDefault();
                    }}
                  />

                  <RemoveDialog selectedRow={selectedRow} />
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
