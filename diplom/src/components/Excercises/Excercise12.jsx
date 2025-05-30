import React, { useEffect, useState } from 'react';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';

const Excercise12 = (props) => {
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (answer !== null) {
      props.setanswer?.(utils.encodeAnswer(12, answer));
    }
  }, [answer, props]);

  return <Excercise12Inner setAnswer={setAnswer} />;
};

const Excercise12Inner = ({ setAnswer }) => {
  const [extraFiles, setExtraFiles] = useState(false);

  useEffect(() => {
    window.genCallback = setExtraFiles;
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
  const [extension, setExtension] = useState('');
  const [topFolder, setTopFolder] = useState('');

  useEffect(() => {
    const ext = utils.randomItem(window.appData.extraFileExtensions);
    const top = utils.randomItem(Object.keys(window.appData.extraFiles));
    const subFolders = window.appData.extraFiles[top];

    let count = 0;
    for (const folder of Object.keys(subFolders)) {
      const filenames = Object.keys(subFolders[folder]);
      const regex = new RegExp(`^.*\\${ext}$`);
      count += filenames.filter(filename => regex.test(filename)).length;
    }

    setExtension(ext);
    setTopFolder(top);
    setAnswer(count);
  }, [setAnswer]);

  return (
    <p>
      Сколько файлов с расширением {extension} содержится в подкаталогах каталога{' '}
      <b>{topFolder}</b>? В ответе укажите только число.
    </p>
  );
};

export default Excercise12;
