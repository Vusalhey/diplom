import '/home/vus/diplom/diplom/src/styles/ResultScreen.css';

const ResultScreen = ({ seed, seedRef }) => {
  const isManualSeed = seedRef?.current?.value !== '';

  return (
    <div className="result-screen">
      <div className="seed-section">
        <label>Сид рандомайзера: <strong>{seed}</strong></label>
        {isManualSeed && (
          <span className="manual-seed">(установлен вручную)</span>
        )}
        <button
          className="copy-button"
          onClick={() => {
            navigator.clipboard.writeText(seed);
          }}
        >
          Копировать сид
        </button>
      </div>

      <div className="exercises">
        <h2>Часть 1</h2>
        <p className="instructions">
          Ответами к заданиям 1–10 являются число, слово, последовательность букв или цифр.
          Ответы укажите в поле для ответов под заданием рядом с текстом задания на этой же странице,
          введя ответ с клавиатуры, без пробелов, запятых и других дополнительных символов.
        </p>
        {/* Задания 1-10 */}
        <div className="task-placeholder">[Тут будут задания 1–10]</div>

        <h2>Часть 2</h2>
        <p className="instructions">
          Задания этой части (11–15) решаются на компьютере. Для выполнения заданий 11, 12 выберите один из вариантов.
          Ответами являются слово или число. Задания 13–15 предполагают создание отдельных файлов.
        </p>
        {/* Задания 11-15 */}
        <div className="task-placeholder">[Тут будут задания 11–15]</div>
      </div>
    </div>
  );
};

export default ResultScreen;
