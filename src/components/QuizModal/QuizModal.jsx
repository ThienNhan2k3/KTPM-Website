import React, { useEffect, useState } from "react";
import "./Modal.css";
import * as Dialog from '@radix-ui/react-dialog';
import { DialogTitle, DialogContent, DialogClose } from '@radix-ui/react-dialog';


const QuizModal = ({ quizData, onQuizDataChange, onClose }) => {

  const [nextId, setNextId] = useState(
    quizData.length > 0 ? Math.max(...quizData.map(quiz => quiz.id)) + 1 : 1
  );

    const handleAddQuiz = () => {
      const newQuiz = { id: nextId, question: '', answers: ['', '', '', ''], correctAnswer: 0 };
      
      onQuizDataChange([...quizData, newQuiz]);
      setNextId(nextId + 1);
    };
  
    const handleDeleteQuiz = (id) => {
      const updatedQuizData = quizData.filter(quiz => quiz.id !== id);
      
      const reindexedQuizData = updatedQuizData.map((quiz, index) => ({
        ...quiz,
        id: index + 1 
      }));
      
      onQuizDataChange(reindexedQuizData);
      setNextId(reindexedQuizData.length > 0 ? Math.max(...reindexedQuizData.map(quiz => quiz.id)) + 1 : 1);
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
              <button onClick={handleAddQuiz} className="quizbox-add-quiz-button">Add Quiz</button>
            </div>

            {quizData.map((quiz) => (
              <div key={quiz.id} className="quizbox-quizBox">
                <div className="quizbox-quizHeader">
                  <div className="title">Câu hỏi số {quiz.id}:</div>
                  <button className="quiz-box-delete" onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
                  <input
                    type="text"
                    value={quiz.question}
                    className="quizbox-question"
                    onChange={(e) => handleQuizChange(quiz.id, 'question', e.target.value)}
                    placeholder="Enter quiz question"
                  />
                  
                </div>
  
                {quiz.answers.map((answer, index) => (
                  <div key={index} className="quizbox-answerBox">
                    <input
                      type="text"
                      value={answer}
                      className="quizbox-answer"
                      onChange={(e) => {
                        const updatedAnswers = [...quiz.answers];
                        updatedAnswers[index] = e.target.value;
                        handleQuizChange(quiz.id, 'answers', updatedAnswers);
                      }}
                      placeholder={`Answer ${index + 1}`}
                    />
                    <input
                      type="radio"
                      className="quizbox-radio"
                      checked={quiz.correctAnswer === index}
                      onChange={() => handleQuizChange(quiz.id, 'correctAnswer', index)}
                    />
                  </div>
                ))}
              </div>
            ))}
  
            <DialogClose asChild>
              <button className="closebutton">Close</button>
            </DialogClose>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };
  
  export default QuizModal;