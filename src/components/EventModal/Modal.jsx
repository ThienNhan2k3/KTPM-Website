import React, { useEffect, useState } from "react";
import "./Modal.css";
import PlusIcon from "@assets/images/plus-icon.png";
import ItemIcon from "@assets/images/item.png";
import { set } from "date-fns";
import QuizModal from "../QuizModal/QuizModal";
import VoucherSelectionModal from "../VoucherSelectionModal/VoucherSelectionModal";
import { fetchAllActiveVouchers } from "@/services/api/voucherApi";
import {
  fetchUpdateEvent,
  fetchAllVoucherInEvent,
  fetchCreateVoucherInEvent,
  fetchUpdateVoucherInEvent,
} from "@/services/api/eventApi";
import { fetchQuizByEvent } from "@/services/api/quizApi";
import {
  fetchCreateQuestion,
  fetchUpdateQuestion,
  fetchDeleteQuestion,
  fetchQuestionByQuiz,
} from "@/services/api/questionApi";
import {
  fetchGetItemsInEvent,
  fetchCreateItem,
  fetchDeleteItem,
} from "@/services/api/itemApi";

const convertDateFormat = (dateStr) => {
  const [year, month, day] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const Modal = ({ show, onClose, itemData, onUpdateEvent }) => {
  if (!show) {
    return null;
  }
  const [data, setTableData] = useState([]);

  const [vouchers, setVoucher] = useState([]); //set vouchers active
  const [selectedVouchers, setSelectedVouchers] = useState([]);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null);
  const [eventName, setEventName] = useState(itemData.name);
  const [startDate, setStartDate] = useState(itemData.start_time);
  const [endDate, setEndDate] = useState(itemData.end_time);
  const [quizData, setQuizData] = useState([]);
  const [ID_quiz, setId_quiz] = useState([]);
  const [originQuiz, setOriginQuiz] = useState([]);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [o_items, setO_Items] = useState([]);
  const [itemImages, setItemImages] = useState([]);

  const [errors, setErrors] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    image: "",
  });

  // Fetch voucher data related to the event
  useEffect(() => {
    const fetchVoucherInEventData = async () => {
      try {
        const vouchersInEvent = await fetchAllVoucherInEvent(itemData.id);
        //console.log(vouchersInEvent);
        setTableData(vouchersInEvent || []);
        //console.log(data);// Set fetched vouchers to table data
      } catch (error) {
        console.error("Error fetching vouchers in event:", error);
      }
    };

    fetchVoucherInEventData();
  }, [itemData]);

  //Fetch question or item in event
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (itemData.type === "Quiz") {
          // fetch question data
          const quiz = await fetchQuizByEvent(itemData.id);
          if (quiz && quiz.id) {
            const questions = await fetchQuestionByQuiz(quiz.id);
            setId_quiz(quiz.id);
            setQuizData(questions);
            setOriginQuiz(questions);
          }
        } else if (itemData.type === "Lắc xì") {
          //fetch item data
          const itemsInEvent = await fetchGetItemsInEvent(itemData.id);
        console.error("Items in event:", itemsInEvent);
        setItems(itemsInEvent);
        setO_Items(itemsInEvent);
        setItemImages(itemsInEvent.map((item) => item.image)); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [itemData]);

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
    return dateObj.toString() === "Invalid Date" ? "Ngày không hợp lệ!" : "";
  };

  const validateForm = () => {
    const newErrors = {
      eventName:
        eventName.trim() === "" ? "Tên sự kiện không được bỏ trống!" : "",
      startDate:
        startDate.trim() === ""
          ? "Ngày bắt đầu không được bỏ trống!"
          : validateDate(startDate),
      endDate:
        endDate.trim() === ""
          ? "Ngày kết thúc không được bỏ trống!"
          : validateDate(endDate),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      // Submit form data
      console.log("Form submitted");

      //Create a new event
      const updated_event = {
        type: itemData.type,
        id_game: itemData.id_game, //"0665b99d-13f5-48a5-a416-14b43b47d690",  //fake id
        id_brand: itemData.id_brand, //"0665b99d-13f5-48a5-a416-14b43b47d690",  //fake id
        name: eventName,
        //image: image.name,
        start_time: startDate,
        end_time: endDate,
      };
      // Log the gathered form data
      console.log("Updated Event!:", updated_event);
      try {
        const result = await fetchUpdateEvent(itemData.id, updated_event);
        console.log("Update Success:", result);

        //Update voucher in event
        console.log("Voucher in event:", data);
        for (const voucher of data) {
          await processVoucherInEvent(voucher, result);
        }

        // If the selected type is "Quiz", update its questions
        if (itemData.type === "Quiz") {
          for (const question of originQuiz) {
            if (!quizData.includes(question)) {
              //featch api delete question
              const result_delete_question = await fetchDeleteQuestion(
                question.id,
              );
            }
          }
          for (const question of quizData) {
            if (originQuiz.some((q) => q.id === question.id)) {
              //featch api update question
              const update_question = {
                id_quiz: question.id_quiz,
                ques: question.ques,
                choice_1: question.choice_1,
                choice_2: question.choice_2,
                choice_3: question.choice_3,
                choice_4: question.choice_4,
                answer: question.answer,
              };

              const result_update_question = await fetchUpdateQuestion(
                question.id,
                update_question,
              );
            } else {
              //featch api create question
              const new_question = {
                id_quiz: ID_quiz,
                ques: question.ques,
                choice_1: question.choice_1,
                choice_2: question.choice_2,
                choice_3: question.choice_3,
                choice_4: question.choice_4,
                answer: question.answer,
              };

              const result_new_question =
                await fetchCreateQuestion(new_question);
            }
          }
        } else if (itemData.type == "Lắc xì") {
          //console.log("Items:", items);
          for (const item of o_items) {
            if (!items.includes(item)) {
              //Delete old item
              const result_delete_item = await fetchDeleteItem(item.id);
            }
          }
          for (let index = 0; index < items.length; index++) {
            const item = items[index];
            if (item.type) {
              const new_item = {
                id_event: result.id,
                name: `Item ${index + 1}`,
              };

              try {
                const new_item_result = await fetchCreateItem(new_item, item);
                console.log("Item creation success:", new_item_result);
              } catch (error) {
                console.error("Error during item creation:", error);
              }
            }
          }
        }

        // Close the modal
        onUpdateEvent(result);
        onClose();
        alert("Event updated successfully!");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  //process Voucher in Event when submit
  const processVoucherInEvent = async (voucher, result) => {
    if (voucher.Voucher) {
      // Update voucher in event
      const voucher_in_event = {
        id_voucher_code: voucher.id_voucher_code,
        id_event: voucher.id_event,
        exp_date: result.end_time,
        total_quantity: voucher.total_quantity,
      };
      await fetchUpdateVoucherInEvent(voucher.id, voucher_in_event);
    } else {
      // Create new voucher in event
      const voucher_in_event = {
        id_voucher_code: voucher.voucher_code,
        id_event: result.id,
        exp_date: result.end_time,
        total_quantity: voucher.total_quantity,
      };
      await fetchCreateVoucherInEvent(voucher_in_event);
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

  // Reset to first page whenever data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handleChangeImage = (event) => {
    const [file] = event.target.files;
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPrevImage(URL.createObjectURL(file));
    } else {
      setErrors({ ...errors, image: "Please upload a valid image file." });
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page
  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
    const isVoucherAlreadySelected = data.some(
      (item) => item.voucher_code === voucher.voucher_code,
    );
    if (!isVoucherAlreadySelected) {
      // Add the selected voucher to the table data
      setTableData((prevTableData) => [...prevTableData, voucher]);
    }
    setIsVoucherModalOpen(false);
    console.log(data);
    console.log("currentItems:", currentItems);
  };

  //For Quiz settings
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

  //for Item settings
  const handleChangeItems = (event) => {
    console.log(event.target.files);
    console.log(items);
    const [file] = event.target.files;
    if (file) {
      setItems([...items, file]);
      setItemImages([...itemImages, URL.createObjectURL(file)]);
    }
    console.log(items);
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
                <label>
                  <strong>Tên sự kiện:</strong>
                </label>
                {errors.eventName && (
                  <span
                    className="editevent--error-text"
                    style={{
                      right: "40px",
                    }}
                  >
                    {errors.eventName}
                  </span>
                )}
                <input
                  type="text"
                  className="form-control"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>

              <div
                className="row editevent-form-group container"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap",
                }}
              >
                <div className="editevent-Date-created">
                  <strong style={{ marginRight: "10px" }}>Ngày bắt đầu:</strong>
                  <input
                    type="date"
                    className="form-control"
                    defaultValue={itemData.start_time} //{convertDateFormat(itemData.start_time)}
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
                    defaultValue={itemData.end_time} //{convertDateFormat(itemData.end_time)}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{
                      width: "150px",
                      padding: "10px",
                    }}
                  />
                  {errors.endDate && (
                    <span className="editevent-error-text" style={{}}>
                      {errors.endDate}
                    </span>
                  )}
                </div>
              </div>

              <div className="editevent-form-group">
                <label>
                  <strong>Hình ảnh:</strong>
                </label>
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
                    {itemData.image == null ? (
                      <div className="editevent-add-image-button">Thêm ảnh</div>
                    ) : (
                      <img
                        src={itemData.image}
                        alt="Preview"
                        style={{ width: "150px" }}
                      />
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
                    {itemData.image == null ? (
                      <div>file...name.jpg</div>
                    ) : (
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          height: "24px",
                        }}
                      >
                        {itemData.image}
                      </span>
                    )}
                  </label>
                </div>
                {errors.image && (
                  <span className="editevent-error-text">
                    {errors.image}
                  </span>
                )}
              </div>


              <div
                className="row editevent-voucher editevent-form-group container"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong style={{ width: "fit-content" }}>VOUCHER</strong>
                {errors.data && (
                  <span
                    className="editevent-error-text"
                    style={{
                      left: "100px",
                    }}
                  >
                    {errors.data}
                  </span>
                )}
                <button
                  className="editevent-add-voucher-button"
                  onClick={openVoucherModal}
                >
                  <img
                    src={PlusIcon}
                    alt="Add"
                    style={{ marginRight: "5px", display: "inline" }}
                  />
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
              <div className="editevent-form-group">
                <table
                  className="table table-bordered my-3"
                  style={{ fontSize: "12px", width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "45%" }}>
                        Phần Trăm
                      </th>
                      <th scope="col" style={{ width: "45%" }}>
                        Giảm Giá Tối Đa
                      </th>
                      <th scope="col">Số lượng</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {item.Voucher?.value
                            ? item.Voucher.value
                            : item.value}
                          %
                        </td>
                        <td>
                          {item.Voucher?.max_discount
                            ? item.Voucher.max_discount
                            : item.max_discount}{" "}
                          vnđ
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            value={parseInt(item.total_quantity, 10)}
                            onChange={(event) => {
                              console.log(event.target.value);
                              const newData = data.map((i) => {
                                if (i.id === item.id) {
                                  return {
                                    ...i,
                                    total_quantity: Number(event.target.value),
                                  };
                                }
                                return i;
                              });
                              setTableData(newData);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="editevent-table-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="editevent-table-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{ marginLeft: "10px" }}
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="row editevent-form-group">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ marginRight: "10px" }}>
                    <strong>Loại trò chơi:</strong>
                  </label>
                  <span>{itemData.type}</span>

                  {itemData.type === "Quiz" && (
                    <div className="editevent-hiddent-box editevent-form-group">
                      <button
                        className="editevent-hidden-button"
                        onClick={openQuizModal}
                      >
                        Câu hỏi
                      </button>
                    </div>
                  )}

                  {itemData.type === "Lắc xì" && (
                    <div className="editevent-hiddent-box editevent-form-group">
                      <label className="btn btn-info" htmlFor="items">
                        Items
                      </label>
                      <input
                        type="file"
                        id="items"
                        name="items"
                        multiple
                        hidden
                        onChange={(event) => {
                          handleChangeItems(event);
                        }}
                      />
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

              {itemImages.length > 0 && itemData.type !== "Quiz" && (
                <div className="row g-2">
                  {itemImages.map((item, index) => (
                    <div
                      className="card col-4 p-1"
                      key={index}
                      style={{ position: "relative" }}
                    >
                      {/* 'X' button for deleting the item */}
                      <button
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          cursor: "pointer",
                          zIndex: 1,
                        }}
                        onClick={() => {
                          const updatedItems = items.filter(
                            (_, i) => i !== index,
                          );
                          const updatedItemImages = itemImages.filter(
                            (_, i) => i !== index,
                          );
                          setItems(updatedItems);
                          setItemImages(updatedItemImages);
                        }}
                      >
                        X
                      </button>
                      <img
                        src={item}
                        style={{ height: "120px", width: "100%" }}
                        className="card-img-top"
                        alt={`Item ${index + 1}`}
                      />
                      <div className="card-body">
                        <h5 className="card-title fw-bold">Item {index + 1}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div
                className="editevent-save editevent-form-group"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className="editevent-save-button"
                  onClick={handleSubmit}
                >
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