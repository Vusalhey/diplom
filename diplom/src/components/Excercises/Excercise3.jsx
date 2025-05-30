import React, { useEffect, useState } from 'react';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';
import '/home/vus/diplom/diplom/src/styles/Excercises/Excercise3.css';

const Excercise3 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const generateData = () => {
      const conditionTypes = ['even', 'odd', 'sameDigits', 'notSameDigits'];
      const conditionText = {
        even: 'x чётное',
        odd: 'x нечётное',
        sameDigits: 'цифры x одинаковые',
        notSameDigits: 'цифры x неодинаковые',
      };

      const min = 20, max = 70;
      const condition1 = utils.random(min, max);
      let condition2 = utils.randomItem(conditionTypes);
      const condition2Text = conditionText[condition2];

      const invert = Math.random() < 0.5;
      if (invert) {
        if (condition2 === 'even') condition2 = 'odd';
        else if (condition2 === 'sameDigits') condition2 = 'notSameDigits';
      }

      let answer;

      switch (condition2) {
        case 'even':
          answer = (condition1 + 1) % 2 === 0 ? condition1 + 1 : condition1 + 2;
          break;
        case 'odd':
          answer = (condition1 + 1) % 2 === 1 ? condition1 + 1 : condition1 + 2;
          break;
        case 'sameDigits':
          let i = condition1 + 1;
          while (String(i)[0] !== String(i)[1]) i++;
          answer = i;
          break;
        case 'notSameDigits':
          let j = condition1 + 1;
          while (String(j)[0] === String(j)[1]) j++;
          answer = j;
          break;
        default:
          answer = null;
      }

      const logicExpr = `(x > ${condition1}) И ${invert ? 'НЕ ' : ''}(${condition2Text})`;

      setData({
        logicalExpression: logicExpr,
        answer: utils.encodeAnswer(3, answer),
      });
    };

    generateData();
  }, []);

  if (!data) return null;

  return (
    <div className="excercise3">
      <p>Напишите наименьшее число x, для которого истинно высказывание</p>
      <pre>{data.logicalExpression}</pre>
    </div>
  );
};

export default Excercise3;
