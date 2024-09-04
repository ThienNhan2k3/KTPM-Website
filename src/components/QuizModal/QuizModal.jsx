import React, { useState } from "react";
import "./Modal.css";
import * as Dialog from '@radix-ui/react-dialog';
import { DialogTitle, DialogContent, DialogClose } from '@radix-ui/react-dialog';

const QuizModal = ({ quizData, onQuizDataChange, onClose }) => {
  // Extract id_quiz from the first quiz if available, otherwise default to ''
  const initialIdQuiz = quizData.length > 0 ? quizData[0].id_quiz || '' : '';

  const [nextId, setNextId] = useState(
    quizData.length > 0 ? Math.max(...quizData.map(quiz => parseInt(quiz.id, 10))) + 1 : 1
  );

  const handleAddQuiz = () => {
    const newQuiz = { 
      id: nextId.toString(), 
      id_quiz: initialIdQuiz,  // Use the same id_quiz for new quizzes
      ques: '', 
      choice_1: '', 
      choice_2: '', 
      choice_3: '', 
      choice_4: '', 
      answer: 0, 
      time_update: new Date().toISOString()
    };
    
    onQuizDataChange([...quizData, newQuiz]);
    setNextId(nextId + 1);
  };

  const handleDeleteQuiz = (id) => {
    const updatedQuizData = quizData.filter(quiz => quiz.id !== id);
    
    const reindexedQuizData = updatedQuizData.map((quiz, index) => ({
      ...quiz,
      id: (index + 1).toString()
    }));
    
    onQuizDataChange(reindexedQuizData);
    setNextId(reindexedQuizData.length > 0 ? Math.max(...reindexedQuizData.map(quiz => parseInt(quiz.id, 10))) + 1 : 1);
  };

  const handleQuizChange = (id, field, value) => {
    onQuizDataChange(quizData.map(quiz => (quiz.id === id ? { ...quiz, [field]: value } : quiz)));
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <div className="quizbox-header-container">
            <DialogTitle>Manage Quizzes</DialogTitle>
            <button onClick={handleAddQuiz} className="quizbox-add-quiz-button btn btn-success">Add Quiz</button>
          </div>

          {quizData.map((quiz, index) => (
            <div key={quiz.id} className="quizbox-quizBox">
              <div className="quizbox-quizHeader">
                <div className="title">Câu hỏi số {index + 1}:</div>
                <div className="d-flex justify-content-between align-items-center">
                  <input
                    type="text"
                    value={quiz.ques}
                    className="quizbox-question"
                    onChange={(e) => handleQuizChange(quiz.id, 'ques', e.target.value)}
                    placeholder="Enter quiz question"
                  />
                  <button className="quiz-box-delete btn btn-danger" onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
                </div>
              </div>

              {[quiz.choice_1, quiz.choice_2, quiz.choice_3, quiz.choice_4].map((choice, i) => (
                <div key={i} className="quizbox-answerBox d-flex align-items-center justify-content-between">
                  <input
                    type="text"
                    value={choice}
                    className="quizbox-answer"
                    onChange={(e) => {
                      const updatedChoices = [quiz.choice_1, quiz.choice_2, quiz.choice_3, quiz.choice_4];
                      updatedChoices[i] = e.target.value;
                      handleQuizChange(quiz.id, `choice_${i + 1}`, updatedChoices[i]);
                    }}
                    placeholder={`Answer ${i + 1}`}
                  />
                  <input
                    type="radio"
                    className="quizbox-radio form-check-input"
                    checked={quiz.answer === i}
                    onChange={() => handleQuizChange(quiz.id, 'answer', i)}
                  />
                </div>
              ))}
            </div>
          ))}

          <DialogClose asChild>
            <button className="closebutton btn btn-warning">Close</button>
          </DialogClose>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default QuizModal;
