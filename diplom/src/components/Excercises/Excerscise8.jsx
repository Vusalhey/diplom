import React, { useEffect, useState } from 'react';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';

const Excercise8 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const possibleTerms = [
      ['шинель', 'кофта'],
      ['рыбка', 'рыбак'],
      ['башня', 'замок'],
      ['лимон', 'лайм'],
      ['аэрофлот', 'аэропорт'],
      ['банка', 'банк'],
      ['лунка', 'луна'],
      ['решето', 'решетка'],
      ['блок', 'блог'],
      ['самара', 'саратов'],
    ];

    const [term1, term2] = utils.randomItem(possibleTerms);
    const termShown = Math.floor(Math.random() * 2);

    let requests = [
      `${term1} | ${term2}`,
      termShown ? term1 : term2,
      `${term1} & ${term2}`,
    ];
    requests = utils.shuffle(requests);

    const pages = [];
    const pagesOverall = utils.random(5, 90);
    for (let i = 0; i < pagesOverall; i++) {
      const pageType = Math.floor(Math.random() * 3);
      if (pageType === 0) pages.push(term1);
      else if (pageType === 1) pages.push(term2);
      else pages.push('both');
    }

    const responses = requests.map((req) => {
      if (req.includes('|')) {
        return (
          pages.filter((p) => [term1, term2, 'both'].includes(p)).length * 10
        );
      } else if (req.includes('&')) {
        return pages.filter((p) => p === 'both').length * 10;
      } else {
        return pages.filter((p) => p === req).length * 10;
      }
    });

    const or = pages.filter((p) => [term1, term2, 'both'].includes(p)).length;
    const both = pages.filter((p) => p === 'both').length;
    const term = pages.filter((p) => p === (termShown ? term1 : term2)).length;

    const rawAnswer = (or - term + both) * 10;
    const encodedAnswer = utils.encodeAnswer(8, rawAnswer);

    setData({
      term1,
      term2,
      termShown,
      requests,
      responses,
      answer: encodedAnswer,
    });
  }, []);

  if (!data) return null;

  const { term1, term2, termShown, requests, responses } = data;

  return (
    <div>
      <p>
        В языке запросов поискового сервера для обозначения логической операции «ИЛИ»
        используется символ «|», а для обозначения логической операции «И» – символ «&».
      </p>
      <p>
        В таблице приведены запросы и количество найденных по ним страниц некоторого сегмента сети Интернет.
      </p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Запрос</th>
            <th scope="col">Найдено страниц (в тысячах)</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, idx) => (
            <tr key={idx}>
              <td><pre>{req}</pre></td>
              <td><pre>{responses[idx]}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Какое количество страниц (в тысячах) будет найдено по запросу{' '}
        <b>{!termShown ? term1 : term2}</b>? Считается, что все запросы выполнялись
        практически одновременно, так что набор страниц, содержащих все искомые слова,
        не изменялся за время выполнения запросов.
      </p>
    </div>
  );
};

export default Excercise8;
