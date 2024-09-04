import axios from "./customize-axios";

const fetchAllQuestions = async () => {
  try {
    const res = await axios.get("/question/getAll");
    return res.data;
  } catch (err) {
    console.error("Error fetching all questionzes:", err);
    return []; // Return an empty array or handle the error appropriately
  }
};

const fetchCreateQuestion = async (new_question) => {
  try {
    const res = await axios.post("/question/create", new_question, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Question created successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error creating question:", err);
    return null; // Return null or handle the error appropriately
  }
};

const fetchUpdateQuestion = async (id, update_question) => {
  try {
    const res = await axios.put(`/question/update/${id}`, update_question, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Question updated successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error updating question:", err);
    return null; // Return null or handle the error appropriately
  }
};

const fetchQuestionByQuiz = async (id) => {
  try {
    const res = await axios.get(`/question/get_byQuiz/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching question by event:", err);
    return null; // Return null or handle the error appropriately
  }
};

export { fetchAllQuestions, fetchCreateQuestion, fetchUpdateQuestion, fetchQuestionByQuiz };
