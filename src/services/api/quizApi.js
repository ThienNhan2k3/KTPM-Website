import axios from "./customize-axios";

const fetchAllQuizs = async () => {
  try {
    const res = await axios.get("/quiz/getAll");
    return res.data;
  } catch (err) {
    console.error("Error fetching all quizzes:", err);
    return []; // Return an empty array or handle the error appropriately
  }
};

const fetchCreateQuiz = async (new_quiz) => {
  try {
    const res = await axios.post("/quiz/create", new_quiz, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Quiz created successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error creating quiz:", err);
    return null; // Return null or handle the error appropriately
  }
};

const fetchUpdateQuiz = async (id, update_quiz) => {
  try {
    const res = await axios.put(`/quiz/update/${id}`, update_quiz, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Quiz updated successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error updating quiz:", err);
    return null; // Return null or handle the error appropriately
  }
};

const fetchQuizByEvent = async (id) => {
  try {
    const res = await axios.get(`/quiz/get_by_event/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching quiz by event:", err);
    return null; // Return null or handle the error appropriately
  }
};

export { fetchAllQuizs, fetchCreateQuiz, fetchUpdateQuiz, fetchQuizByEvent };
