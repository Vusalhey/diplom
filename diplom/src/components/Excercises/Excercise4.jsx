import React, { useEffect, useState } from 'react';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';
import '/home/vus/diplom/diplom/src/styles/Excercises/Excercise4.css';

const Excercise4 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const allPointsNames = 'ABCDEFGH';
    const pointNames = allPointsNames
      .substring(0, utils.random(5, 8))
      .split('');

    const start = pointNames[0];
    const medium = utils.randomItem(pointNames);
    let end = utils.randomItem(pointNames);

    while (end === start || end === medium) {
      end = utils.randomItem(pointNames);
    }

    const points = generateRandomGraph(pointNames);
    const allPaths = findAllPaths(points, start, end, medium);
    const shortestLength = Math.min(...allPaths.map(p => p.length));
    const answer = utils.encodeAnswer(4, shortestLength);

    setData({
      pointNames,
      points,
      start,
      medium,
      end,
      answer,
    });
  }, []);

  const generateRandomGraph = (nodes) => {
    const graph = {};
    nodes.forEach((from) => {
      graph[from] = {};
      nodes.forEach((to) => {
        if (from !== to && Math.random() < 0.5) {
          const distance = utils.random(1, 9);
          graph[from][to] = distance;
        }
      });
    });
    return graph;
  };

  const findAllPaths = (graph, start, end, through) => {
    const paths = [];

    const dfs = (current, visited, path, length) => {
      if (visited.has(current)) return;

      visited.add(current);
      path.push(current);

      if (current === end && path.includes(through)) {
        paths.push({ path: [...path], length });
      }

      for (const neighbor in graph[current]) {
        dfs(neighbor, new Set(visited), [...path], length + graph[current][neighbor]);
      }
    };

    dfs(start, new Set(), [], 0);
    return paths;
  };

  if (!data) return null;

  const { pointNames, points, start, medium, end } = data;

  return (
    <div className="excercise4">
      <p>
        Между населёнными пунктами {pointNames.join(', ')} построены дороги, протяжённость которых
        (в километрах) приведена в таблице.
      </p>
      <table className="road-table">
        <thead>
          <tr>
            <th>Из</th>
            {pointNames.map(p => <th key={p}>{p}</th>)}
          </tr>
        </thead>
        <tbody>
          {pointNames.map(from => (
            <tr key={from}>
              <td>{from}</td>
              {pointNames.map(to => (
                <td key={to}>{points[from][to] || '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Определите длину кратчайшего пути между пунктами <strong>{start}</strong> и <strong>{end}</strong>,
        проходящего через пункт <strong>{medium}</strong>. Передвигаться можно только по дорогам, протяжённость
        которых указана в таблице. Каждый пункт можно посетить только один раз.
      </p>
    </div>
  );
};

export default Excercise4;
