import { useEffect, useState } from 'react';

export default function Dashboard({ userId }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const mockResults = [
      { topic: 'Алгоритмы', score: 8, total: 10 },
      { topic: 'Логика', score: 7, total: 10 },
    ];
    setResults(mockResults);
  }, [userId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Панель пользователя</h2>
      <table className="w-full border rounded shadow text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Тема</th>
            <th className="p-2 border">Результат</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, index) => (
            <tr key={index}>
              <td className="p-2 border">{res.topic}</td>
              <td className="p-2 border">{res.score} / {res.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}