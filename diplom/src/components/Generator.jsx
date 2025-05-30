import React, { useRef } from 'react';
import '/home/vus/diplom/diplom/src/styles/Generator.css';

const Generator = ({ onGenerate }) => {
  const seedRef = useRef(null);

  const handleGenerate = () => {
    onGenerate(seedRef.current.value);
  };

  return (
    <div className="generator">
      <h1>Удобный генератор ОГЭ по информатике</h1>
      <p>
        Тренажер следующего поколения, который поможет вам подготовиться
        к ОГЭ по информатике и сдать экзамены на лучший балл
      </p>

      <div className="generator-inputs">
        <input type="number" placeholder="Кол-во вариантов (необязательно)" min="1" max="1" />
        <button onClick={handleGenerate}>Сгенерировать</button>
      </div>

      <input
        type="text"
        placeholder="seed варианта (необязательно)"
        maxLength="20"
        ref={seedRef}
      />
    </div>
  );
};

export default Generator;
