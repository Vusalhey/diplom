// 
import React, { useRef, useState } from 'react';
import Generator from './Generator';
import Gallery from './Gallery';
import ResultScreen from './ResultScreen';

import Excercise1 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise1.jsx';
import Excercise2 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise2.jsx';
import Excercise3 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise3.jsx';
import Excercise4 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise4.jsx';
import Excercise5 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise5.jsx';
import Excercise6 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise6.jsx';
import Excercise7 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise7.jsx';
import Excercise8 from '/home/vus/diplom/diplom/src/components/Excercises/Excerscise8.jsx';
import Excercise9 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise9.jsx';
import Excercise10 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise10.jsx';
import Excercise11 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise11.jsx';
import Excercise12 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise12.jsx';
import Excercise13 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise13.jsx';
import Excercise14 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise14.jsx';
import Excercise15 from '/home/vus/diplom/diplom/src/components/Excercises/Excercise15.jsx';

const exercises = [
  Excercise1, Excercise2, Excercise3, Excercise4, Excercise5, Excercise6, Excercise7, Excercise8, Excercise9, Excercise10, Excercise11, Excercise12, Excercise13, Excercise14, Excercise15
];

function App() {
  const seedRef = useRef();
  const [generated, setGenerated] = useState(false);
  const [seed, setSeed] = useState('');

  // Состояние для выбранного упражнения (null - не выбрано)
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(null);

  const handleGenerate = (seedValue) => {
    setSeed(seedValue);
    setGenerated(true);
  };

  // Если выбрано упражнение, показываем его компонент
  if (selectedExerciseIndex !== null) {
    const SelectedExercise = exercises[selectedExerciseIndex];
    return (
      <div className="app">
        <button onClick={() => setSelectedExerciseIndex(null)}>Назад к меню</button>
        <SelectedExercise />
      </div>
    );
  }

  return (
    <div className="app">
      {!generated ? (
        <>
          <Generator onGenerate={handleGenerate} />
          <Gallery />

          {/* Добавим список кнопок для выбора упражнения */}
          <div style={{marginTop: '20px'}}>
            <h2>Выберите упражнение</h2>
            {exercises.map((_, i) => (
              <button key={i} onClick={() => setSelectedExerciseIndex(i)}>
                Упражнение {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <ResultScreen seed={seed} seedRef={seedRef} />
      )}
    </div>
  );
}

export default App;
