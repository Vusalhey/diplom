import React, { useState, useEffect, useCallback } from 'react';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';

const Excercise11 = (props) => {
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (answer) {
      const encoded = answer.map(a => utils.encodeAnswer(11, a));
      props.setanswer?.(encoded);
    }
  }, [answer, props]);

  return <Excercise11Inner setAnswer={setAnswer} />;
};

const Excercise11Inner = ({ setAnswer }) => {
  const [extraFiles, setExtraFiles] = useState(false);

  useEffect(() => {
    window.genCallback2 = setExtraFiles;
  }, []);

  return (
    <>
      {!extraFiles ? (
        <p className="text-warning">Выберите выше вариант решения задач</p>
      ) : (
        <Text setAnswer={setAnswer} />
      )}
    </>
  );
};

const Text = ({ setAnswer }) => {
  const [topFolder, setTopFolder] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const top = utils.randomItem(Object.keys(window.appData.extraFiles));
    const subFolders = window.appData.extraFiles[top];
    const subFolderFiles = utils.randomItem(Object.values(subFolders));
    const [filename, fileContent] = utils.randomItem(Object.entries(subFolderFiles));
    const randomQuote = utils.randomItem(fileContent.split('. '));

    setTopFolder(top);
    setQuote(randomQuote);

    const flattenedFiles = Object.assign(
      {},
      ...flatten(subFolders)
    );

    const allAnswers = Object.keys(flattenedFiles).filter(
      name => flattenedFiles[name].includes(randomQuote)
    );

    setAnswer(allAnswers);
  }, [setAnswer]);

  const flatten = (obj) => {
    return [].concat(
      ...Object.keys(obj).map((key) =>
        typeof obj[key] === 'object' ? flatten(obj[key]) : { [key]: obj[key] }
      )
    );
  };

  return (
    <div>
      <p>
        В одном из файлов, текст которого приведён в подкаталоге каталога <b>{topFolder}</b>,
        находятся такие слова: «{quote}».
        С помощью поисковых средств операционной системы и текстового редактора или браузера
        выясните имя файла без пути к нему, только имя с расширением. Например, <i>example.txt</i>
      </p>
      <p>
        Если таких файлов несколько, запишите название любого из них.
      </p>
    </div>
  );
};

export default Excercise11;
