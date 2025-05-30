import React, { useEffect, useState } from 'react';
import randomWords from 'random-words';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';

const Excercise7 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const extensions = ['txt', 'doc', 'pdf', 'pptx', 'key'];
    const domains = ['gov', 'obr', 'state', 'talk', 'reg', 'tan', 'term'];
    const domainZones = ['ru', 'com', 'org', 'net', 'app'];
    const protocols = ['http', 'https', 'ftp', 'ssh'];

    const filename =
      randomWords({ min: 1, max: 3, join: '_' }) +
      '.' +
      utils.randomItem(extensions);
    const servername =
      utils.randomItem(domains) + '.' + utils.randomItem(domainZones);
    const protocol = utils.randomItem(protocols);

    let segments = ['/', '://', ...filename.split('.'), ...servername.split('.'), protocol];
    segments[2] += '.';
    segments[4] += '.';
    segments = utils.shuffle(segments);

    const answer =
      (segments.indexOf(protocol) + 1).toString() +
      (segments.indexOf('://') + 1).toString() +
      (segments.indexOf(servername.split('.')[0] + '.') + 1).toString() +
      (segments.indexOf(servername.split('.')[1]) + 1).toString() +
      (segments.indexOf('/') + 1).toString() +
      (segments.indexOf(filename.split('.')[0] + '.') + 1).toString() +
      (segments.indexOf(filename.split('.')[1]) + 1).toString();

    const encodedAnswer = utils.encodeAnswer(7, answer);

    setData({
      filename,
      servername,
      protocol,
      segments,
      answer: encodedAnswer,
    });
  }, []);

  if (!data) return null;

  const { filename, servername, protocol, segments } = data;

  return (
    <div>
      <p>
        Доступ к файлу <b>{filename}</b>, находящемуся на сервере <b>{servername}</b>, осуществляется
        по протоколу <b>{protocol}</b>. Фрагменты адреса файла закодированы цифрами от 1 до{' '}
        {segments.length}. Запишите в ответе последовательность этих цифр, кодирующую адрес
        указанного файла в сети Интернет.
      </p>
      <List provider={segments} />
    </div>
  );
};

const List = ({ provider }) => {
  return (
    <ol>
      {provider.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
};

export default Excercise7;