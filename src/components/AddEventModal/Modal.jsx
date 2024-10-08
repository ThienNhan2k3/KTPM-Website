import React, { useEffect, useState } from "react";
import "./Modal.css";
import PlusIcon from "@assets/images/plus-icon.png";
import QuizModal from "../QuizModal/QuizModal";
import VoucherSelectionModal from "../VoucherSelectionModal/VoucherSelectionModal";
import { name, type } from "tedious/lib/data-types/null";
import { fetchAllActiveVouchers } from "@/services/api/voucherApi";

import { fetchCreateEvent, fetchCreateVoucherInEvent } from "@/services/api/eventApi";
import { fetchCreateQuiz } from "@/services/api/quizApi";
import { fetchCreateQuestion } from "@/services/api/questionApi";
import { fetchCreateItem } from "@/services/api/itemApi";
import { baseAPI } from "@/services/api";

const convertDateFormat = (dateStr) => {
  const [year, month, day] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const Modal = ({ show, onClose, onAddEvent }) => {
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
      console.log("Form submitted");
  
      const game = selectedType === "Quiz" 
        ? "550e8400-e29b-41d4-a716-446655440000" 
        : "550e8400-e29b-41d4-a716-446655440001";

      // Create a new event object
      const new_event = {
        type: selectedType,
        id_game: game,  //based on what kind of event
        //id_brand: "0665b99d-13f5-48a5-a416-14b43b47d690",  //fake id
        name: eventName,
        //image: image.name,
        start_time: startDate,
        end_time: endDate
      };
      
      console.log("New Event:", new_event);
  
      baseAPI
        .postForm("/event/create", new_event, image)
        .then(async (result) => {
          console.log("Event creation success:", result);
          
          try {
            // Featch create selected voucher
            if(data.length) {
              for (const voucher of data) {
                const new_voucher_in_event = {
                  id_voucher_code: voucher.voucher_code,
                  id_event: result.id,
                  exp_date: result.end_time,
                  total_quantity: voucher.quantity
                }

                const voucher_in_event_result = await fetchCreateVoucherInEvent(new_voucher_in_event);
              }
            }

            // If the selected type is "Quiz", create the quiz and its questions
            if (selectedType === "Quiz") {
              const new_quiz = {
                id_event: result.id, 
                id_game: "550e8400-e29b-41d4-a716-446655440000"  //fake id
              };
      
              const quiz_result = await fetchCreateQuiz(new_quiz);
              console.log("Quiz creation success:", quiz_result);
              console.log(quizData);
              for (const question of quizData) {
                const new_question = {
                  id_quiz: quiz_result.id,
                  ques: question.ques,
                  choice_1: question.choice_1,
                  choice_2: question.choice_2,
                  choice_3: question.choice_3,
                  choice_4: question.choice_4,
                  answer: question.answer
                };
                
                const question_result = await fetchCreateQuestion(new_question);
                console.log("Question creation success:", question_result);
              }
            } else {
              for (let index = 0; index < items.length; index++) {
                const item = items[index];
                const new_item = {
                  id_event: result.id,
                  name: `Item ${index + 1}`, // Use index to create unique names
                };
              
                try {
                  const new_item_result = await fetchCreateItem(new_item, item);
                  console.log("Item creation success:", new_item_result);
                } catch (error) {
                  console.error("Error during item creation:", error);
                }
              }
              
            }
    
            // Call the onAddEvent to update the parent component's state
            onAddEvent(result);
      
            // Close the modal and notify the user
            onClose();
            alert("New event created successfully!");
    
          } catch (error) {
            console.error("Error during event creation:", error);
          }
        })
        .catch((err) => console.log(err));
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
      console.log("currentItems:", currentItems);
    }
    setIsVoucherModalOpen(false);
    console.log(data);
    
  };


  //For Quiz settings
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizData, setQuizData] = useState([{ id: 1, ques: '', choice_1: '', choice_2: '', choice_3: '', choice_4: '', answer: 0 }]);

  const openQuizModal = () => {
    console.log("Opening Quiz Modal");
    setIsQuizModalOpen(true);
  };

  
  const handleChangeItems = (event) => {
    console.log(event.target.files);
    console.log(items);
    const [file] = event.target.files;
    if (file) {
      setItems([...items, file]);
      setItemImages([...itemImages, URL.createObjectURL(file)])
    }
    console.log(items);
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
                      <input 
                        type="number" 
                        min="0"
                        value={item.quantity} 
                        onChange={(event) => {
                          console.log(event.target.value);
                          const newData = data.map(i => {
                            if (i.voucher_code === item.voucher_code) {
                              return {...i, quantity: Number(event.target.value)}
                            }
                            return i;
                          })
                          setTableData(newData)
                        }
                      }/>
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
                  <label className="btn btn-info" htmlFor="items">
                    Items
                  </label>
                  <input type="file" id="items" name="items" multiple hidden onChange={(event) => {
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
            <div className="row g-2">
              {itemImages.map((item, index) => (
                <div className="card col-4 p-1" key={index} style={{ position: 'relative' }}>
                  {/* 'X' button for deleting the item */}
                  <button
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 1
                    }}
                    onClick={() => {
                      const updatedItems = items.filter((_, i) => i !== index);
                      const updatedItemImages = itemImages.filter((_, i) => i !== index);
                      setItems(updatedItems);
                      setItemImages(updatedItemImages);
                    }}
                  >
                    X
                  </button>
                  <img src={item} style={{ height: "120px", width: "100%" }} className="card-img-top" alt={`Item ${index + 1}`} />
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
