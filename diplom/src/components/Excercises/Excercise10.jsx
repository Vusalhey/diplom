import React, { useEffect, useState } from 'react';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';

const Excercise10 = () => {
  const [integers, setIntegers] = useState([]);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const decodedIntegers = Array(3)
      .fill()
      .map(() => Math.floor(Math.random() * 1000));

    let temp = [];
    for (let integer of decodedIntegers) {
      const notation = utils.random(2, 16);
      temp.push({
        integer: integer.toString(notation),
        notation,
      });
    }

    temp = utils.shuffle(temp);
    setIntegers(temp);

    const max = Math.max(...decodedIntegers);
    setAnswer(utils.encodeAnswer(10, max));
  }, []);

  return (
    <div>
      <p>
        Среди приведённых ниже трёх чисел, записанных в различных системах
        счисления, найдите максимальное и запишите его в ответе в десятичной
        системе счисления. В ответе запишите только число, основание системы
        счисления указывать не нужно.
      </p>
      <pre>
        <IntegerNotation provider={integers} />
      </pre>
    </div>
  );
};

const IntegerNotation = ({ provider }) => {
  return (
    <div>
      {provider.map((item, i) => (
        <span key={i}>
          <label>
            {item.integer}
            <sub>{item.notation}</sub>
            {i !== provider.length - 1 ? ', ' : ''}
          </label>
        </span>
      ))}
    </div>
  );
};

export default Excercise10;
