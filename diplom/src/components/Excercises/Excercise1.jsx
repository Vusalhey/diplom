import React, { useEffect, useState } from 'react';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';
import '/home/vus/diplom/diplom/src/styles/Excercises/Excercise1.css';

const Excercise1 = () => {
  const [exerciseData, setExerciseData] = useState(null);

  useEffect(() => {
    const generateData = () => {
      const list = utils.randomItem([
        {
          common: 'животные',
          subject: 'название животного',
          items: {
            2: ['ёж', 'уж', 'як'],
            3: ['кот', 'пёс', 'рак'],
            4: ['осёл', 'удав', 'овца'],
            5: ['песец', 'олень', 'хомяк'],
            6: ['сайгак', 'свинья', 'собака'],
            7: ['альпака', 'носорог', 'утконос'],
            8: ['крокодил', 'хамелеон', 'шимпанзе'],
            9: ['аллигатор', 'горностай', 'иглошерст']
          }
        },
        {
          common: 'города',
          subject: 'название города',
          items: {
            3: ['Уфа', 'Бор', 'Шуя'],
            4: ['Ухта', 'Чита', 'Сочи'],
            5: ['Томск', 'Ревда', 'Псков'],
            6: ['Самара', 'Москва', 'Рязань'],
            7: ['Сызрань', 'Балашов', 'Саранск'],
            8: ['Тольятти', 'Владимир', 'Улан-Удэ'],
            9: ['Астрахань', 'Череповец', 'Ярославль'],
            10: ['Красноярск', 'Ставрополь', 'Кисловодск']
          }
        },
        {
          common: 'игры',
          subject: 'название игры',
          items: {
            3: ['NBA', 'WWE'],
            4: ['DayZ', 'Doom', 'FIFA'],
            5: ['Knack', 'Metro', 'Sonic'],
            6: ['FarCry', 'MadMax', 'Mortal'],
            7: ['Outlast', 'Horizon', 'Hotline'],
            8: ['Broforce', 'Terraria', 'GodOfWar'],
            9: ['Minecraft', 'Days_Gone', 'Destiny_2'],
            10: ['Dead_Space', 'Dishonored', 'BioShock_2']
          }
        }
      ]);

      const symbolEncodingSizeInt = Math.pow(2, Math.ceil(Math.random() * 4));
      const symbolEncodingSizeType = utils.randomItem(['битами', 'байтами']);
      const symbolEncodingSize = `${symbolEncodingSizeInt} ${symbolEncodingSizeType}`;
      const symbolEncodingSizeInBits = symbolEncodingSizeType === 'битами'
        ? symbolEncodingSizeInt
        : symbolEncodingSizeInt * 8;

      const min = Math.min(...Object.keys(list.items).map(Number));
      const max = Math.max(...Object.keys(list.items).map(Number));
      let symbolsRemoved = utils.random(min, max);

      const itemsList = Object.values(list.items).map(group => utils.randomItem(group));
      itemsList[0] = utils.capitalize(itemsList[0]);

      const removedWord = itemsList.find(item => item.length === symbolsRemoved);
      const removedNameBits = (symbolsRemoved + 2) * symbolEncodingSizeInBits; // учёт запятой и пробела
      const writtenText = `${itemsList.join(', ')} – ${list.common}`;

      setExerciseData({
        symbolEncodingSize,
        writtenText,
        removedNameBits,
        subject: list.subject,
        answer: utils.encodeAnswer(1, removedWord)
      });
    };

    generateData();
  }, []);

  if (!exerciseData) return null;

  return (
    <div className="excercise1">
      <p>В одной из кодировок Unicode каждый символ кодируется {exerciseData.symbolEncodingSize}.
        Ученик написал текст (в нём нет лишних пробелов):</p>
      <pre>{exerciseData.writtenText}</pre>
      <p>Ученик удалил из списка {exerciseData.subject}, а также лишние запятую и
        пробел – два пробела не должны идти подряд.</p>
      <p>При этом размер нового предложения в данной кодировке оказался на {exerciseData.removedNameBits} бит меньше,
        чем размер исходного предложения. Напишите в ответе удалённое {exerciseData.subject}.</p>
    </div>
  );
};

export default Excercise1;
