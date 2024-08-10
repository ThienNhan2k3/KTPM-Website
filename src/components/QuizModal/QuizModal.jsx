import React, { useEffect, useState } from "react";
import "./Modal.css";
import * as Dialog from '@radix-ui/react-dialog';
import { DialogTitle, DialogContent, DialogClose } from '@radix-ui/react-dialog';


const QuizModal = ({ quizData, onQuizDataChange, onClose }) => {

    const handleAddQuiz = () => {
      onQuizDataChange([...quizData, { id: Date.now(), question: '', answers: ['', '', '', ''], correctAnswer: 0 }]);
    };
  
    const handleDeleteQuiz = (id) => {
      onQuizDataChange(quizData.filter(quiz => quiz.id !== id));
    };
  
    const handleQuizChange = (id, field, value) => {
      onQuizDataChange(quizData.map(quiz => (quiz.id === id ? { ...quiz, [field]: value } : quiz)));
    };
  
    return (
      <Dialog.Root open={true} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <DialogTitle>Manage Quizzes</DialogTitle>
  
            <button onClick={handleAddQuiz}>Add Quiz</button>
  
            {quizData.map((quiz) => (
              <div key={quiz.id} className="quizBox">
                <div className="quizHeader">
                  <input
                    type="text"
                    value={quiz.question}
                    onChange={(e) => handleQuizChange(quiz.id, 'question', e.target.value)}
                    placeholder="Enter quiz question"
                  />
                  <button onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
                </div>
  
                {quiz.answers.map((answer, index) => (
                  <div key={index} className="answerBox">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => {
                        const updatedAnswers = [...quiz.answers];
                        updatedAnswers[index] = e.target.value;
                        handleQuizChange(quiz.id, 'answers', updatedAnswers);
                      }}
                      placeholder={`Answer ${index + 1}`}
                    />
                    <input
                      type="radio"
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