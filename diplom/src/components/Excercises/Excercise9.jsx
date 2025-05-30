import React, { useEffect, useRef, useState } from 'react';
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js';
import '../../canvas-arrow.js';

const pointNames = 'АБВГДЕЖЗИКЛМНОПРСТ'.split('');

const Excercise9 = () => {
  const canvasRef = useRef(null);
  const canvasWidth = 800;
  const canvasHeight = 200;
  const verticalOffset = 20;
  const horizontalOffset = 20;

  const [data, setData] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    const inputLen = utils.random(4, 6);

    function generatePoints() {
      let pointIndex = -1;
      return Array(inputLen)
        .fill()
        .map((_, i) => {
          return Array(i === 0 || i === inputLen - 1 ? 1 : utils.random(2, 4))
            .fill()
            .map(() => {
              pointIndex++;
              return { point: pointNames[pointIndex], ref: [] };
            });
        });
    }

    function generateArrows(input) {
      input.forEach((col, colIndex, colArray) => {
        col.forEach((point) => {
          if (colIndex === 0) {
            const nextCol = colArray[colIndex + 1];
            const pointRefs = Array(utils.random(1, nextCol.length))
              .fill()
              .map(() => utils.randomItem(nextCol).point);
            point.ref.push(...pointRefs);
          } else if (colIndex !== inputLen - 1) {
            point.ref.push(utils.randomItem(colArray[colIndex + 1]).point);
          }
        });

        if (utils.random(0, 1) && col.length >= 2) {
          const point1Index = utils.random(0, col.length - 1);
          const p1 = col[point1Index];
          const p2 =
            point1Index + 1 < col.length
              ? col[point1Index + 1]
              : col[point1Index - 1];
          p1.ref.push(p2.point);
        }
      });
      return input;
    }

    const getPoints = (input) =>
      input.reduce((acc, col) => acc.concat(col), []).reverse();

    const getPoint = (input, name) =>
      getPoints(input).find((p) => p.point === name);

    function countRefs(input) {
      input.forEach((col, colIndex) => {
        if (colIndex === 0) {
          const start = col[0];
          start.ref.forEach((ref) => {
            const point = getPoint(input, ref);
            if (point) point.hasStarterPointPath = true;
          });
        } else if (colIndex === 1) {
          col.forEach((p) => {
            if (p.hasStarterPointPath) p.refsCount = 1;
          });
        } else {
          col.forEach((p) => {
            const parents = getPoints(input).filter((_p) =>
              _p.ref.includes(p.point)
            );
            p.refsCount = 0;
            p.hasStarterPointPath = false;
            parents.forEach((pr) => {
              if (pr.hasStarterPointPath) {
                p.refsCount += pr.refsCount;
                p.hasStarterPointPath = true;
              }
            });
          });
        }
      });
    }

    function drawEllipses(input) {
      const radius = 5;
      context.font = 'bold 9px sans-serif';
      const cols = input.length;
      const colsInterval = (canvasWidth - 2 * horizontalOffset) / cols;

      input.forEach((col, colIndex) => {
        const x = colsInterval * colIndex + horizontalOffset;
        const pointsInterval =
          (canvasHeight - 2 * verticalOffset) / (col.length + 1);

        col.forEach((point, pointIndex) => {
          const y = verticalOffset + pointsInterval * (pointIndex + 1);
          context.fillStyle = 'black';
          context.beginPath();
          context.ellipse(x, y, radius, radius, Math.PI / 4, 0, 2 * Math.PI);
          context.fill();

          point.coordinates = [x, y];
          context.fillStyle = 'white';
          context.fillText(point.point, x - 3, y + 3);
        });
      });
    }

    function drawArrows(input) {
      input.forEach((col) => {
        col.forEach((point) => {
          point.ref.forEach((refName) => {
            const refPoint = getPoint(input, refName);
            if (refPoint) {
              let [start, end] = utils.closePoints(
                point.coordinates,
                refPoint.coordinates,
                0.15
              );
              context.fillStyle = 'black';
              context.beginPath();
              context.arrow(...start, ...end, [0, 1, -10, 1, -10, 5]);
              context.fill();
            }
          });
        });
      });
    }

    let input = generatePoints();
    input = generateArrows(input);
    countRefs(input);

    const allPoints = getPoints(input);
    const lastPoint = allPoints[0];
    const encodedAnswer = utils.encodeAnswer(9, lastPoint.refsCount);

    drawEllipses(input);
    drawArrows(input);

    setData(input);
    setGenerated(true);
    setAnswer(encodedAnswer);
  }, []);

  const points = data.length
    ? data.reduce((acc, col) => acc.concat(col), []).reverse()
    : [];

  return (
    <div>
      {generated && points.length > 0 && (
        <p>
          На рисунке – схема дорог, связывающих города{' '}
          {points.map((p) => p.point).join(', ')}. По каждой дороге можно
          двигаться только в одном направлении, указанном стрелкой. Сколько
          существует различных путей из города <b>{points.at(-1).point}</b> в
          город <b>{points[0].point}</b>?
        </p>
      )}
      <canvas
        width={canvasWidth}
        height={canvasHeight}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default Excercise9;
