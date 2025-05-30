import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';
import '/home/vus/diplom/diplom/src/styles/Excercises/Excercise2.css';

const Excercise2 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const generateData = () => {
      const letters = { 'А': '01', 'Б': '100', 'К': '101', 'Л': '111', 'О': '00', 'С': '110' };
      let decoded = '';
      let encoded = '';

      for (let i = 0; i < 6; i++) {
        const letter = utils.randomItem(Object.keys(letters));
        decoded += letter;
        encoded += letters[letter];
      }

      const alternativeSolution = findAllSolutions(encoded, true);
      const answer = [utils.encodeAnswer(2, decoded)];
      if (alternativeSolution) {
        answer.push(utils.encodeAnswer(2, alternativeSolution));
      }

      setData({
        encodedMessage: encoded,
        letters,
        decodedMessage: decoded,
        alternativeSolution,
        answer
      });
    };

    const findAllSolutions = (encoded, reversed = false) => {
      const letters = { 'А': '01', 'Б': '100', 'К': '101', 'Л': '111', 'О': '00', 'С': '110' };
      let code = encoded.split('');
      if (reversed) code = code.reverse();

      let buffer = '';
      let result = '';

      for (const digit of code) {
        buffer += digit;
        const index = Object.values(letters).indexOf(buffer);
        if (index > -1) {
          buffer = '';
          result += Object.keys(letters)[index];
        }
      }

      if (buffer.length <= 3) {
        const index = Object.values(letters).indexOf(buffer);
        if (index > -1) {
          result += Object.keys(letters)[index];
          return result;
        } else if (buffer === '') {
          return result;
        }
      }

      return undefined;
    };

    generateData();
  }, []);

  if (!data) return null;

  return (
    <div className="excercise2">
      <p>От разведчика было получено следующее сообщение</p>
      <pre>{data.encodedMessage}</pre>
      <p>
        В этом сообщении зашифрован пароль – последовательность русских букв.
        В пароле использовались только буквы А, Б, К, Л, О, С; каждая буква
        кодировалась двоичным словом по следующей таблице.
      </p>
      <Table bordered className="text-center table-fixed-width">
        <thead>
          <tr>
            {Object.keys(data.letters).map((letter) => (
              <th key={letter}>{letter}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(data.letters).map((code, i) => (
              <td key={i}>{code}</td>
            ))}
          </tr>
        </tbody>
      </Table>
      <p>Расшифруйте сообщение. Запишите в ответе пароль.</p>
    </div>
  );
};

export default Excercise2;
