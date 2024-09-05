import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import SearchIcon from "@assets/images/search-icon.png";
import EditIcon from "@assets/images/edit-icon.png";
import PlusIcon from "@assets/images/plus-icon.png";
import EventModal from "../../../components/EventModal/Modal";
import AddEventModal from "../../../components/AddEventModal/Modal";
import "./styles.css";
import { makeData } from "./table-event/makeData";
import { fa } from "@faker-js/faker";
import { fetchAllEvents } from "@/services/api/eventAPI";

const ITEMS_PER_PAGE = 10;

export default function EventManagement() {
  //const [data] = useState(() => makeData(500));
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageInput, setPageInput] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [quiz, setQuiz] = useState(false);
  const [lx, setLx] = useState(false);

  //get all event data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAllEvents();
        setData(result);
        console.log(result);
        setSortedData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    setPageInput((event.selected + 1).toString()); // Synchronize input field with current page
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = () => {
    const pageNumber = parseInt(pageInput, 10) - 1;
    if (!isNaN(pageNumber) && pageNumber >= 0 && pageNumber < pageCount) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
    setPageInput("1");
  };

  const handleSort = (type) => {
    // Filter data based on search term
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    let sorted;
    if ((type === "Quiz" && !quiz) || (type === "Lắc Xì" && !lx)) {
      // If the type is selected and not active, activate it
      if (type === "Quiz") {
        setQuiz(true);
        setLx(false);
      } else if (type === "Lắc Xì") {
        setQuiz(false);
        setLx(true);
      }
      // Filter data based on the selected type
      sorted = filtered.filter((item) => item.type === type);
    } else {
      // If the type is deselected or no specific type, show all items
      setQuiz(false);
      setLx(false);
      sorted = filtered; // No specific type filtering
    }

    setSortedData(sorted);
    setCurrentPage(0); // Reset to first page on sort
    setPageInput("1"); // Reset input field to 1
  };

  const filteredData = sortedData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = filteredData.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handleSearchClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleOpenAddEventModal = () => {
    setShowAddEventModal(true);
  };

  const handleCloseAddEventModal = () => {
    setShowAddEventModal(false);
  };

  const handleAddEvent = (newEvent) => {
    console.log("updated event: ", newEvent);
    const updatedData = [...data, newEvent]; // Add new event to data array
    setData(updatedData);
    setSortedData(updatedData);
    setCurrentPage(Math.ceil(updatedData.length / ITEMS_PER_PAGE) - 1); // Navigate to the last page where the new event is added
    setPageInput(Math.ceil(updatedData.length / ITEMS_PER_PAGE).toString()); // Update page input field to last page
  };

  const updateEventInList = (updatedEvent) => {
    const updatedEvents = data.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event,
    );
    setData(updatedEvents);
    setSortedData(updatedEvents);
  };

  return (
    <div className="col">
      <div className="EventManagement-row mb-3">
        <div className="EventManagement-input-group mx-2">
          <input
            type="text"
            className="EventManagement-form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: "400px",
              height: "fit-content",
              borderColor: "#0F67B1",
              color: "#000000",
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
        <button
          className="mx-2 EventManagement-quiz-button"
          onClick={() => handleSort("Quiz")}
        >
          Quiz
        </button>
        <button
          className="mx-2 EventManagement-lx-button"
          onClick={() => handleSort("Lắc Xì")}
        >
          Lắc Xì
        </button>
        <button
          className="EventManagement-add-button"
          style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}
          onClick={handleOpenAddEventModal}
        >
          <img src={PlusIcon} alt="Add" style={{ marginRight: "5px" }} /> Thêm
        </button>
      </div>
      <table className="table EventManagement-table-bordered my-3">
        <thead>
          <tr>
            <th scope="col" style={{ width: "5%" }}>
              ID
            </th>
            <th scope="col">Tên sự kiện</th>
            <th scope="col" style={{ width: "12%" }}>
              Loại trò chơi
            </th>
            <th scope="col" style={{ width: "19%" }}>
              Ngày bắt đầu
            </th>
            <th scope="col" style={{ width: "19%" }}>
              Ngày kết thúc
            </th>
            <th scope="col" style={{ width: "5%" }}></th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item, index) => (
            <tr key={item.id}>
              <td className="EventManagement-table-id" scope="row">
                {offset + index + 1}
              </td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.start_time}</td>
              <td>{item.end_time}</td>
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
                      color: "black",
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <input
            className="EventManagement-pagination-textbox"
            type="text"
            value={pageInput}
            onChange={handlePageInputChange}
            placeholder="Đi đến trang.."
          />
          <button
            className="EventManagement-pagination-button"
            onClick={handlePageInputSubmit}
            style={{ padding: "5px 10px" }}
          >
            Đi
          </button>
        </div>

        <ReactPaginate
          previousLabel={"Trước"}
          nextLabel={"Tiếp"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"EventManagement-pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          forcePage={currentPage} // Force the component to reflect the currentPage
        />
      </div>
      <EventModal
        show={showModal}
        onClose={handleCloseModal}
        itemData={selectedItem}
        onUpdateEvent={updateEventInList}
      />
      <AddEventModal
        show={showAddEventModal}
        onClose={handleCloseAddEventModal}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
