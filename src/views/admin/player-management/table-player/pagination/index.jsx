const Pagination = ({ table }) => {
  return (
    <div className="page-number">
      <div className="show-page-number">
        <span className="design-page-number">
          <div style={{ marginRight: "5px" }}>Page</div>
          <strong style={{ width: "62px" }}>
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
            max={table.getPageCount()}
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
  );
};

export default Pagination;
