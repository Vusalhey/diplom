import React, { useEffect, useState } from 'react';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';

const Excercise5 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const startNumber = Math.floor(Math.random() * 10);
    const min = 2, max = 5;
    const b = utils.random(min, max);
    let algorithm = '';
    let current = startNumber;

    for (let i = 0; i < 5; i++) {
      let operation = Math.ceil(Math.random() * 2); // 1 or 2
      if (i === 4 && !algorithm.includes('2')) {
        operation = 2; // ensure multiplication is used at least once
      }
      algorithm += operation;
      if (operation === 1) {
        current += 1;
      } else {
        current *= b;
      }
    }

    const endNumber = current;
    const answer = utils.encodeAnswer(5, b);

    setData({ startNumber, algorithm, endNumber, answer });
  }, []);

  if (!data) return null;

  const { startNumber, algorithm, endNumber } = data;

  return (
    <div>
      <p>У исполнителя Альфа две команды, которым присвоены номера:</p>
      <pre>1. прибавь 1</pre>
      <pre>2. умножь на b</pre>
      <p>(b – неизвестное натуральное число; b ≥ 2).</p>
      <p>
        Первая из них увеличивает число на экране на 1,
        вторая умножает его на b.
        Алгоритм для исполнителя Альфа – это последовательность номеров команд.
        Найдите значение числа <strong>b</strong>, при котором из числа <strong>{startNumber}</strong>{' '}
        по алгоритму <strong>{algorithm}</strong> будет получено число <strong>{endNumber}</strong>.
      </p>
    </div>
  );
};

export default Excercise5;
