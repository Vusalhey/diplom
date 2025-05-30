import { useState } from 'react';

export default function TestPage({ questions, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (choice) => {
    setAnswers([...answers, { questionId: questions[current].id, choice }]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      onFinish(answers.concat({ questionId: questions[current].id, choice }));
    }
  };

  const question = questions[current];

  return (
    <div className="max-w-xl mx-auto p-4">
      <h3 className="text-lg font-bold mb-2">
        Вопрос {current + 1} из {questions.length}
      </h3>
      <p className="mb-4">{question.text}</p>
      <div className="grid gap-2">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(choice)}
            className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}