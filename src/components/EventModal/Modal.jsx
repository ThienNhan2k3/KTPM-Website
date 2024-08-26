import React, { useEffect, useState } from "react";
import "./Modal.css";
import PlusIcon from "@assets/images/plus-icon.png";
import { set } from "date-fns";
import QuizModal from "../QuizModal/QuizModal";

const convertDateFormat = (dateStr) => {
  console.log(dateStr);
  const [year, month, day] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const Modal = ({ show, onClose, itemData }) => {
  if (!show) {
    return null;
  }

  const data = [
    { id: 1, name: "Voucher1", quantity: 200, sale: "40%", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
    { id: 2, name: "Voucher2", quantity: 200, sale: "40%", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
    { id: 3, name: "Voucher3", quantity: 200, sale: "40%", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
    { id: 4, name: "Voucher4", quantity: 200, sale: "40%", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
    { id: 5, name: "Voucher5", quantity: 200, sale: "40%", dateCreate: "15/02/2024", dateEnd: "18/02/2024" },
    // Add more items if needed
  ];

  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [eventName, setEventName] = useState(itemData.name);
  const [startDate, setStartDate] = useState(itemData.start_time)    //(convertDateFormat("01/01/2024")); // Adjust default date
  const [endDate, setEndDate] = useState(itemData.end_time);    //(convertDateFormat("01/01/2024")); // Adjust default date
  
  const [errors, setErrors] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    image: "",
  });

  
  const validateDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toString() === 'Invalid Date' ? "Ngày không hợp lệ!" : "";
  };

  const validateForm = () => {
    const newErrors = {
      eventName: eventName.trim() === "" ? "Tên sự kiện không được bỏ trống!" : "",
      startDate: startDate.trim() === "" ? "Ngày bắt đầu không được bỏ trống!" : validateDate(startDate),
      endDate: endDate.trim() === "" ? "Ngày kết thúc không được bỏ trống!" : validateDate(endDate),
      image: !image ? "Ảnh không được để trống!" : "",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Submit form data
      console.log("Form submitted");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("editevent-modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      setImage(file);
      setPrevImage(URL.createObjectURL(file));
      setImageError(false);
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  //For Quiz settings
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizData, setQuizData] = useState([{ id: 1, question: '', answers: ['', '', '', ''], correctAnswer: 0 }]);

  const openQuizModal = () => {
    console.log("Opening Quiz Modal");
    setIsQuizModalOpen(true);
  };

  const closeQuizModal = () => {
    setIsQuizModalOpen(false);
  };

  const handleQuizDataChange = (updatedQuizData) => {
    setQuizData(updatedQuizData);
  };

  return (
    <div className="editevent-modal-overlay">
      <div className="editevent-modal-content">
        <button className="editevent-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="editevent-modal-body">
          {itemData && (
            <div>
              <div className="editevent-form-group">
                <label><strong>Tên sự kiện:</strong></label>
                {errors.eventName && 
                  <span className="editevent--error-text"
                    style={{
                      right: '40px',
                    }}
                  >
                    {errors.eventName}
                  </span>
                }
                <input
                  type="text"
                  className="form-control"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>

              <div className="row editevent-form-group container" style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                <div className="editevent-Date-created">
                  <strong style={{ marginRight: '10px' }}>Ngày bắt đầu:</strong>
                  <input
                    type="date"
                    className="form-control"
                    defaultValue= {itemData.start_time} //{convertDateFormat(itemData.start_time)}
                    style={{
                      width: "150px",
                      padding: "10px",
                    }}
                    disabled
                  />
                </div>

                <div className="Date-end">
                  <label>
                    <strong>Ngày kết thúc:</strong>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    defaultValue= {itemData.end_time}   //{convertDateFormat(itemData.end_time)}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{
                      width: "150px",
                      padding: "10px",
                    }}
                  />
                  {errors.endDate && 
                    <span className="editevent-error-text"
                      style={{
                      }}
                    >
                      {errors.endDate}
                    </span>
                  }
                </div>
              </div>

              <div className="editevent-form-group">
                <label><strong>Hình ảnh:</strong></label>
                <div className="row editevent-image-input">
                  <label
                    style={{
                      width: "fit-content",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #3FA2F6",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    htmlFor="thumbnail-image"
                  >
                    {prevImage == null ? (
                      <div className="editevent-add-image-button">Thêm ảnh</div>
                    ) : (
                      <img src={prevImage} alt="Preview" style={{ width: "150px" }} />
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
                      <div>file...name.jpg</div>
                    ) : (
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", height: "24px" }}>
                        {prevImage}
                      </span>
                    )}
                  </label>
                  <input
                    type="file"
                    id="thumbnail-image"
                    name="thumbnail-image"
                    accept="image/*"
                    onChange={handleChangeImage}
                    style={{ display: "none" }}
                  />
                </div>
                {errors.image && 
                  <span className="editevent-error-text"
                    style={{
                    }}
                  >
                    {errors.image}
                  </span>
                }
              </div>


              <div className="row editevent-voucher editevent-form-group container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ width: "fit-content" }}>VOUCHER</strong>
            {errors.data && 
              <span className="editevent-error-text"
                style={{
                  left: '100px',
                }}
              >
                {errors.data}
              </span>
            }
            <button className="editevent-add-voucher-button">
              <img src={PlusIcon} alt="Add" style={{ marginRight: "5px", display: "inline" }} />
              Thêm voucher
            </button>
          </div>

              <div className="editevent-form-group">
                <table className="table table-bordered my-3" style={{ fontSize: '12px', width: '100%' }}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '10%' }}>ID</th>
                      <th scope="col" style={{ width: '45%' }}>Quantity</th>
                      <th scope="col" style={{ width: '45%' }}>Sale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.quantity}</td>
                        <td>{item.sale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="editevent-table-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <button className= "editevent-table-button" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ marginLeft: '10px' }}>
                    Next
                  </button>
                </div>
              </div>

              <div className="row editevent-form-group">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ marginRight: '10px' }}>
                    <strong>Loại trò chơi:</strong>
                  </label>
                  <span>{itemData.type}</span>
                  {itemData.type === "Quiz" && (
                    <div className="editevent-hiddent-box editevent-form-group">
                      <button className="editevent-hidden-button" onClick={openQuizModal}>Câu hỏi</button>
                    </div>
                  )}

                  {/* Render the Quiz Modal */}
                  {isQuizModalOpen && (
                    <QuizModal
                      quizData={quizData}
                      onQuizDataChange={handleQuizDataChange}
                      onClose={closeQuizModal}
                    />
                  )}
                </div>
              </div>



              <div className="editevent-save editevent-form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="editevent-save-button" onClick={handleSubmit}>
                  Cập nhật sự kiện
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
