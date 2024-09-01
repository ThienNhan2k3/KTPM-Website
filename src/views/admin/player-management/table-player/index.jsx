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

import Pagination from "./pagination";
import SearchBar from "./search-bar";
import AddDialog from "./table-dialog/add-dialog";
import TableContextMenu from "./context-menu";
import EditDialog from "./table-dialog/edit-dialog";
import RemoveDialog from "./table-dialog/remove-dialog";
import { baseAPI } from "@/services/api";

// Define a custom fuzzy filter function
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

// Define a custom fuzzy sort function
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

export default function TablePlayer() {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [open2, setOpen2] = React.useState(false);

  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const [selectedRow, setSelectedRow] = React.useState(null);

  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    baseAPI
      .get(`http://localhost:5000/account/getAll/${"user"}`)
      .then((accounts) => {
        setData(accounts);
        // console.log(accounts);
      })
      .catch((err) => console.log(err));
  }, []);

  const getDataRow = (row) => {
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
        filterFn: "equalsString",
        sortingFn: "alphanumeric",
      },
      {
        header: () => <span className="title-table-player">Họ và tên</span>,
        accessorKey: "full_name",
        id: "full_name",
        size: 135,
        cell: (info) => (
          <div className="edit-text" id="full_name">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString",
        sortingFn: fuzzySort,
      },
      {
        header: () => <span className="title-table-player">Tên đăng nhập</span>,
        accessorKey: "user_name",
        size: 135,
        cell: (info) => (
          <div className="edit-text" id="user_name">
            {info.getValue()}
          </div>
        ),
        filterFn: "includesString",
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
        filterFn: "includesString",
        sortingFn: fuzzySort,
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
        filterFn: "equalsString",
        sortingFn: fuzzySort,
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
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
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
      {
        header: () => <span className="title-table-brand">Cập nhật</span>,
        accessorKey: "time_update",
        size: 150,
        cell: (info) => (
          <div className="edit-text" id="time_update">
            {info.getValue()}
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
    if (table.getState().columnFilters[0]?.id === "full_name") {
      if (table.getState().sorting[0]?.id !== "full_name") {
        table.setSorting([{ id: "full_name", desc: false }]);
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
                  <TableContextMenu
                    row={row}
                    onClick={(row) => getDataRow(row)}
                  />
                  <EditDialog
                    selectedRow={selectedRow}
                    onSubmit={() => {
                      wait().then(() => setOpen2(false));
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
