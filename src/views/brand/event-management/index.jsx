import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import SearchIcon from "@assets/images/search-icon.png";
import EditIcon from "@assets/images/edit-icon.png";
import PlusIcon from "@assets/images/plus-icon.png";
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
  { id: 13, name: "Marathon", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 14, name: "Marathon2", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 15, name: "Marathon3", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 16, name: "Marathon4", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 17, name: "Marathon5", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 18, name: "Marathon6", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 19, name: "Marathon7", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 20, name: "Marathon8", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 21, name: "Marathon9", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 22, name: "Marathon10", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 23, name: "Marathon11", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 24, name: "Marathon12", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 25, name: "Marathon5", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 26, name: "Marathon6", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 27, name: "Marathon7", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 28, name: "Marathon8", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 29, name: "Marathon9", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 30, name: "Marathon10", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 31, name: "Marathon11", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 32, name: "Marathon12", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 33, name: "Marathon", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 34, name: "Marathon2", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 35, name: "Marathon3", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 36, name: "Marathon4", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 37, name: "Marathon5", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 38, name: "Marathon6", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 39, name: "Marathon7", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 40, name: "Marathon8", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 41, name: "Marathon9", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 42, name: "Marathon10", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 43, name: "Marathon11", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 44, name: "Marathon12", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 45, name: "Marathon3", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 46, name: "Marathon4", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 47, name: "Marathon5", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 48, name: "Marathon6", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 49, name: "Marathon7", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 50, name: "Marathon8", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 51, name: "Marathon9", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 52, name: "Marathon10", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 53, name: "Marathon11", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 54, name: "Marathon12", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 55, name: "Marathon5", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 56, name: "Marathon6", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 57, name: "Marathon7", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 58, name: "Marathon8", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 59, name: "Marathon9", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 60, name: "Marathon10", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 61, name: "Marathon11", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 62, name: "Marathon12", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 63, name: "Marathon", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 64, name: "Marathon2", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 65, name: "Marathon3", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 66, name: "Marathon4", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 67, name: "Marathon5", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 68, name: "Marathon6", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 69, name: "Marathon7", type: "Lắc xì", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 70, name: "Marathon8", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 71, name: "Marathon9", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 72, name: "Marathon10", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 73, name: "Marathon11", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
  { id: 74, name: "Marathon12", type: "Quiz", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
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
                  style={{
                      width: "500px",
                      height: "fit-content",
                      borderColor: "#0F67B1",
                      backgroundColor: "#ECE6F0",
                      borderRadius: "35px",
                      padding: "10px",
                  }}
              />
              <div className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                      <img src={SearchIcon} alt="Search" />
                  </button>
              </div>
          </div>
          <button className="col mx-2 quiz-button">Quiz</button>
          <button className="col mx-2 lx-button">Lắc Xì</button>
          <button className="add-button" style={{ marginLeft: "10px", display: 'flex', alignItems: 'center' }}>
              <img src={PlusIcon} alt="Add" style={{ marginRight: '5px' }} /> Thêm
          </button>
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
