import React, { useEffect, useState } from "react";
import "./Modal.css";
import PlusIcon from "@assets/images/plus-icon.png";
import QuizModal from "../QuizModal/QuizModal";
import VoucherSelectionModal from "../VoucherSelectionModal/VoucherSelectionModal";
import { name, type } from "tedious/lib/data-types/null";
import { fetchAllActiveVouchers } from "@/services/api/voucherApi";

const convertDateFormat = (dateStr) => {
  const [year, month, day] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const Modal = ({ show, onClose }) => {
  if (!show) return null;

  const [data, setTableData] = useState([
    // Add more items if needed
  ]);
  const [vouchers, setVoucher] = useState([]); //set vouchers active
  const [selectedVouchers, setSelectedVouchers] = useState([]);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState(convertDateFormat("01/01/2024")); // Adjust default date
  const [endDate, setEndDate] = useState(convertDateFormat("01/01/2024")); // Adjust default date
  const [items, setItems] = useState([]);
  const [itemImages, setItemImages] = useState([]);

  const [errors, setErrors] = useState({
    data: "",
    eventName: "",
    startDate: "",
    endDate: "",
    image: "",
  });

  // Fetch voucher data
  useEffect(() => {
    const fetchVoucherData = async () => {
      try {
        const data = await fetchAllActiveVouchers();
        // if (data.code != "200") throw new Error("Failed to fetch voucher data");
        const voucherData = data;
        //console.log(voucherData);
        setVoucher(voucherData);
      } catch (error) {
        console.error("Error fetching voucher data:", error);
      }
    };

    fetchVoucherData();
  }, []);

  const validateDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toString() === 'Invalid Date' ? "Ngày không hợp lệ!" : "";
  };

  const validateForm = () => {
    const newErrors = {
      data: data.length === 0 ? "Chưa có voucher cho sự kiện!" : "",
      eventName: eventName.trim() === "" ? "Tên sự kiện không được bỏ trống!" : "",
      startDate: startDate.trim() === "" ? "Ngày bắt đầu không được bỏ trống!" : validateDate(startDate),
      endDate: endDate.trim() === "" ? "Ngày kết thúc không được bỏ trống!" : validateDate(endDate),
      image: !image ? "Ảnh không được để trống!" : "",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      // Submit form data
      console.log("Form submitted");

      //Create a new event
      const new_event = {
        type: selectedType,
        id_game: "0665b99d-13f5-48a5-a416-14b43b47d690",  //fake id
        id_brand: "0665b99d-13f5-48a5-a416-14b43b47d690",  //fake id
        name: eventName,
        image: image.name,
        start_time: startDate,
        end_time: endDate
      }
      // Log the gathered form data
      console.log("New Event:", new_event);

      try {
        const response = await fetch("http://localhost:5000/Event/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(new_event),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const result = await response.json();
        console.log("Success:", result);
  
        // Close the modal
        onClose();
        alert("New event created successfully!");
      } catch (error) {
        console.error("Error:", error);
      }


      // Gather all form data
      const formData = {
        selectedVouchers: data,
        quizData: quizData,
      };
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("addevent-modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  const handleChangeImage = (event) => {
    console.log(event.target.files);
    
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  //For select voucher
  const openVoucherModal = () => {
    setIsVoucherModalOpen(true);
  };
  
  const closeVoucherModal = () => {
    setIsVoucherModalOpen(false);
  };
  
  const handleSelectVoucher = (voucher) => {
    // Check if the voucher is already in the table
    console.log(voucher);
    const isVoucherAlreadySelected = data.some((item) => item.voucher_code === voucher.voucher_code);
    if (!isVoucherAlreadySelected) {
      // Add the selected voucher to the table data
      setTableData((prevTableData) => [...prevTableData, {...voucher, quantity: 1}]);
    }
    setIsVoucherModalOpen(false);
    console.log(data);
    console.log("currentItems:", currentItems);
  };


  //For Quiz settings
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizData, setQuizData] = useState([{ id: 1, question: '', answers: ['', '', '', ''], correctAnswer: 0 }]);

  const openQuizModal = () => {
    console.log("Opening Quiz Modal");
    setIsQuizModalOpen(true);
  };

  
  const handleChangeItems = (event) => {
    console.log(event.target.files);
    
    const [file] = event.target.files;
    if (file) {
      setItems([...items, file]);
      setItemImages([...itemImages, URL.createObjectURL(file)])
    }
  };

  const closeQuizModal = () => {
    setIsQuizModalOpen(false);
  };

  const handleQuizDataChange = (updatedQuizData) => {
    setQuizData(updatedQuizData);
  };

  return (
    <div className="addevent-modal-overlay">
      <div className="addevent-modal-content">
        <button className="addevent-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="addevent-modal-body">
          <div className="addevent-form-group">
            <label><strong>Tên sự kiện:</strong></label>
            {errors.eventName && 
              <span className="addevent-error-text"
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

          <div className="row addevent-form-group container" style={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
            <div className="addevent-Date-created col-6">
              <strong style={{ marginRight: "10px" }}>Ngày bắt đầu:</strong>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ width: "150px", padding: "10px" }}
              />
              {errors.startDate && 
                <span className="addevent-error-text"
                  style={{
                  }}
                >
                  {errors.startDate}
                </span>
              }
            </div>
            <div className="Date-end col-6">
              <label><strong>Ngày kết thúc:</strong></label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ width: "150px", padding: "10px" }}
              />
              {errors.endDate && 
                <span className="addevent-error-text"
                  style={{
                  }}
                >
                  {errors.endDate}
                </span>
              }
            </div>
          </div>

          <div className="addevent-form-group">
            <label><strong>Hình ảnh:</strong></label>
            <div className="row addevent-image-input">
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
                className="col"
                htmlFor="thumbnail-image"
              >
                {prevImage == null ? (
                  <div className="addevent-add-image-button">Thêm ảnh</div>
                ) : (
                  <img src={prevImage} alt="Preview" style={{ width: "150px" }} />
                )}
              </label>

              <label
                style={{
                  marginLeft: "15px",
                  display: "flex",
                  alignItems: "center",
                  width: "180px",
                  pointerEvents: "none",
                }}
                className="col"
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
              <span className="addevent-error-text"
                style={{
                }}
              >
                {errors.image}
              </span>
            }
          </div>

          <div className="row addevent-voucher addevent-form-group container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="col">
              <div style={{ marginBottom: '4px' }}>
                <strong>VOUCHER</strong>
              </div>
              {errors.data && 
                <span className="addevent-error-text" style={{ color: 'red', fontSize: '0.875rem' }}>
                  {errors.data}
                </span>
              }
            </div>

            <button className="addevent-add-voucher-button" onClick={openVoucherModal}>
              <img src={PlusIcon} alt="Add" style={{ marginRight: "0px", display: "inline" }} />
              Thêm voucher
            </button>

            {/* Render the Voucher Selection Modal */}
            {isVoucherModalOpen && (
              <VoucherSelectionModal
                vouchers={vouchers}
                onClose={closeVoucherModal}
                onSelectVoucher={handleSelectVoucher}
              />
            )}
          </div>

          <div className="addevent-form-group">
            <table className="table table-bordered my-3" style={{ fontSize: "12px", width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col">Phần Trăm</th>
                  <th scope="col">Giảm Giá Tối Đa</th>
                  <th scope="col">Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.voucher_code}>
                    <td>{item.value}%</td>
                    <td>{item.max_discount} vnđ</td>
                    <td>
                      <input type="text" value={item.quantity} onChange={(event) => {
                        console.log(event.target.value);
                        const newData = data.map(i => {
                          if (i.voucher_code === item.voucher_code) {
                            return {...i, quantity: event.target.value}
                          }
                          return i;
                        })
                        setTableData(newData)
                      }}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="addevent-table-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button className="addevent-table-button" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ marginLeft: "10px" }}>
                Next
              </button>
            </div>
          </div>

          <div className="row addevent-form-group">
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "10px" }}><strong>Loại trò chơi:</strong></label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input type="radio" className="addevent-radio form-check-input" name="type" value="Quiz" onClick={handleTypeChange} />
                <label style={{ marginRight: "15px" }}>Quiz</label>

                <input type="radio" className="addevent-radio form-check-input" name="type" value="Lắc xì" onClick={handleTypeChange} />
                <label>Lắc xì</label>
              </div>
              {selectedType === "Quiz" && (
                <div className="addevent-hiddent-box addevent-form-group">
                  <button className="addevent-hidden-button" onClick={openQuizModal}>
                    Câu hỏi
                  </button>
                </div>
              )} 
              {selectedType === "Lắc xì" && (
                <div className="addevent-hiddent-box addevent-form-group">
                  <label className="btn btn-info" htmlFor="files">
                    Items
                  </label>
                  <input type="file" id="files" name="files" multiple hidden onChange={(event) => {
                    handleChangeItems(event);
                  }}/>    
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
          
          {(itemImages.length > 0 && selectedType !== "Quiz") && (
            <div className="row g-2" >
              {itemImages.map((item, index) => (
              <div className="card col-4 p-1">
                <img src={item} style={{height: "120px", width: "100%"}} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Item {index + 1}</h5>
                </div>
              </div>
              ))}
            </div>
          )}
          <div className="row addevent-form-group" style={{ display: "flex", justifyContent: "center" }}>
            <button className="addevent-save-button" onClick={handleSubmit}>Thêm sự kiện</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
