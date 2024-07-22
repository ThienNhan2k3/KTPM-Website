import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import SearchIcon from "@assets/images/search-icon.png";
import EditIcon from "@assets/images/edit-icon.png";
import EventModal from "../../../components/EventModal/Modal";
import "./styles.css";

const data = [
  { id: 1, name: "Marathon", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 2, name: "Marathon2", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 3, name: "Marathon3", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 4, name: "Marathon4", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 5, name: "Marathon5", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 6, name: "Marathon6", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 7, name: "Marathon7", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 8, name: "Marathon8", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 9, name: "Marathon9", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 10, name: "Marathon10", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 11, name: "Marathon11", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 12, name: "Marathon12", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  // Add more rows as needed
];

const ITEMS_PER_PAGE = 10;

export default function EventManagement() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = data.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleSearchClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="col">
      <div className="row mb-3">
        <div className="col input-group mx-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            name="search"
            style={{ width: "500px", height: "fit-content" }}
          />
          <div className="input-group-btn">
            <button className="btn btn-default" type="submit">
              <img src={SearchIcon} alt="Search" />
            </button>
          </div>
        </div>
        <button className="col mx-2 quiz-button">Quiz</button>
        <button className="col mx-2 lx-button">Lắc Xì</button>
        <button className="col mx-2 add-button">Thêm</button>
      </div>
      <table className="table table-bordered my-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Date create</th>
            <th scope="col">Date end</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.dateCreate}</td>
              <td>{item.dateEnd}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleSearchClick(item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    padding: "0",
                    border: "none",
                  }}
                >
                  <img
                    src={EditIcon}
                    alt="edit"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
      <EventModal show={showModal} onClose={handleCloseModal} itemData={selectedItem} />
    </div>
  );
}
