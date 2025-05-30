import React, { useEffect, useState } from 'react';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';

const Excercise6 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const comparionTypes = ['>', '>=', '<', '<=', '=='];
    const min = -5, max = 20;

    const condition1 = {
      comparison: comparionTypes[Math.floor(Math.random() * 5)],
      with: utils.random(min, max),
    };

    const condition2 = {
      comparison: comparionTypes[Math.floor(Math.random() * 5)],
      with: utils.random(min, max),
    };

    const conditionsComparison = ['and', 'or'][Math.floor(Math.random() * 2)];
    const neededOutput = ['YES', 'NO'][Math.floor(Math.random() * 2)];
    const executionsCount = utils.random(5, 15);

    const executions = [];
    const executionsOutput = [];

    for (let i = 0; i < executionsCount; i++) {
      const input1 = utils.random(min, max);
      const input2 = utils.random(min, max);
      executions.push([input1, input2]);

      const condition1true = eval(`${input1} ${condition1.comparison} ${condition1.with}`);
      const condition2true = eval(`${input2} ${condition2.comparison} ${condition2.with}`);

      let output = 'NO';
      if (
        (conditionsComparison === 'and' && condition1true && condition2true) ||
        (conditionsComparison === 'or' && (condition1true || condition2true))
      ) {
        output = 'YES';
      }
      executionsOutput.push(output);
    }

    const answerCount = executionsOutput.filter((o) => o === neededOutput).length;
    const formattedExecutions = executions.map(([s, t]) => `(${s}, ${t})`).join('; ');
    const answer = utils.encodeAnswer(6, answerCount);

    setData({
      condition1,
      condition2,
      conditionsComparison,
      neededOutput,
      executionsCount,
      formattedExecutions,
      answer,
    });
  }, []);

  if (!data) return null;

  const {
    condition1,
    condition2,
    conditionsComparison,
    neededOutput,
    executionsCount,
    formattedExecutions,
  } = data;

  return (
    <div>
      <p>Ниже приведена программа, записанная на трёх языках программирования.</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Алгоритмический язык</th>
            <th>Pascal</th>
            <th>Python</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <pre><code>
алг
нач
цел s, t
ввод s
ввод t
если s {condition1.comparison} {condition1.with} {conditionsComparison === 'and' ? 'и' : 'или'} t {condition2.comparison} {condition2.with}
то вывод "YES"
иначе вывод "NO"
все
кон
              </code></pre>
            </td>
            <td>
              <pre><code>
var s, t: integer;
begin
readln(s);
readln(t);
if (s {condition1.comparison} {condition1.with}) {conditionsComparison} (t {condition2.comparison} {condition2.with})
then
  writeln("YES")
else
  writeln("NO")
end.
              </code></pre>
            </td>
            <td>
              <pre><code>
s = int(input())
t = int(input())
if (s {condition1.comparison} {condition1.with}) {conditionsComparison} (t {condition2.comparison} {condition2.with}):
  print("YES")
else:
  print("NO")
              </code></pre>
            </td>
          </tr>
        </tbody>
      </table>
      <p>Было проведено {executionsCount} запусков программы, при которых в качестве значений переменных вводились следующие пары чисел (s, t):</p>
      <p>{formattedExecutions}. Сколько было запусков, при которых программа напечатала «{neededOutput}»?</p>
    </div>
  );
};

export default Excercise6;
