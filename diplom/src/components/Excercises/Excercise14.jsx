import React, { useState, useEffect, useMemo, useCallback } from 'react'
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js'
import { Button, Card, CardBody, InputGroup, InputGroupText, Input } from 'reactstrap'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

const subjects = ['Физкультура', 'Математика', 'Русский язык', 'Биология', 'Обществознание', 'Информатика']

const Answer = ({ number, onChange }) => (
  <InputGroup>
    <InputGroupText>Ответ</InputGroupText>
    <Input onInput={e => onChange(number, e.currentTarget.value)} />
  </InputGroup>
)

const Excercise14 = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState({})
  const [condition, setCondition] = useState([])
  const [wbout, setWbout] = useState(null)
  const [answers, setAnswers] = useState({})

  const _randomIntegerValue = '/random/'

  const handleAnswerChange = useCallback((number, value) => {
    setAnswers(prev => ({ ...prev, [number]: value }))
    window.appData.answers[number] = value
  }, [])

  useEffect(() => {
    generateExerciseData()
  }, [])

  const generateExerciseData = () => {
    const possibleColumns = [
      {
        names: ['Округ', 'Фамилия', 'Предмет', 'Баллы'],
        descriptions: [
          'код округа, в котором учится ученик',
          'фамилия',
          'выбранный учеником предмет',
          'тестовый балл',
        ],
        possibleColumnsContent: [
          ['С','Ю','З','В','СЗ','СВ','ЮЗ','ЮВ'],
          ['Смирнов','Иванов','Кузнецов','Соколов','Попов','Лебедев','Козлов','Новиков','Морозов','Петров','Волков',
           'Соловьёв','Васильев','Зайцев','Павлов','Семёнов','Голубев','Виноградов','Богданов','Воробьёв','Фёдоров',
           'Михайлов','Беляев','Тарасов','Белов','Комаров','Орлов','Киселёв','Макаров','Андреев','Ковалёв','Ильин'],
          subjects,
          _randomIntegerValue,
        ],
      },
    ]

    const selectedColumns = utils.randomItem(possibleColumns)
    const rows = Array(utils.random(1, 10) * 100)
      .fill()
      .map(() => selectedColumns.possibleColumnsContent.map(col =>
        col === _randomIntegerValue ? utils.random(1, 1000) : utils.randomItem(col)
      ))

    const header = selectedColumns.names
    const fullData = [header, ...rows]

    setColumns(selectedColumns)
    setData(fullData)
    generateConditions(fullData)
  }

  const generateConditions = (fullData) => {
    const scoreIndex = 3
    const subjectIndex = 2

    const subject1 = utils.randomItem(subjects)
    const subject2 = utils.randomItem(subjects)
    const limit = utils.random(1, 1000)
    const limitComparison = utils.randomItem(['>', '<'])

    const filtered = fullData.slice(1).filter(row => {
      return (
        (limitComparison === '>' && row[scoreIndex] > limit) ||
        (limitComparison === '<' && row[scoreIndex] < limit)
      ) && row[subjectIndex] === subject1
    })

    const students = fullData.slice(1)
      .filter(row => row[subjectIndex] === subject2)
      .map(row => row[scoreIndex])
    const avgScore = (students.reduce((a, b) => a + b, 0) / students.length).toFixed(2)

    const newCondition = [
      { subjectName: subject1, limit, limitComparison, answer: filtered.length },
      { subjectName: subject2, answer: avgScore },
    ]

    setCondition(newCondition)
    window.appData.answers['14.1'] = newCondition[0].answer
    window.appData.answers['14.2'] = newCondition[1].answer
  }

  const tablePreview = useMemo(() => {
    if (!data.length) return null
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return (
      <table className="table table-bordered">
        <thead>
          <tr className="table-light">
            <th></th>
            {data[0].map((_, i) => (
              <th key={i}>{letters[i]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 6).map((row, i) => (
            <tr key={i}>
              <th className="table-light">{i}</th>
              {row.map((cell, j) =>
                i === 0 ? <th key={j}>{cell}</th> : <td key={j}>{cell}</td>
              )}
            </tr>
          ))}
          <tr>
            <td colSpan={data[0].length + 1}>
              <p className="text-secondary text-center m-0">Еще {data.length - 6} строк...</p>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }, [data])

  const contentColumns = useMemo(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return columns.descriptions?.map((desc, i) => (
      <div key={i}>
        В столбце {letters[i]} {i === 0 ? 'записан' : '—'} {desc}
        {i === columns.descriptions.length - 1 ? '.' : ';'}
      </div>
    ))
  }, [columns])

  const generateSheet = useCallback(() => {
    const worksheet = XLSX.utils.aoa_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exercise 14")
    const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' }
    const output = XLSX.write(workbook, wopts)
    setWbout(output)
    saveAs(new Blob([output], { type: 'application/octet-stream' }), 'Exercise14.xlsx')
  }, [data])

  const startDownloading = useCallback(() => {
    if (wbout) {
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Exercise14.xlsx')
    } else {
      generateSheet()
    }
  }, [wbout, generateSheet])

  return (
    <div>
      <Card>
        <CardBody>
          <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            Скачайте таблицу для Microsoft Excel для работы с заданием 14:
          </div>
          {' '}
          <Button color="primary" onClick={startDownloading}>
            Скачать XLSX
          </Button>
        </CardBody>
      </Card>
      <p>
        В электронную таблицу занесли данные о тестировании учеников
        по выбранным ими предметам.
      </p>
      {tablePreview}
      <p>{contentColumns}</p>
      <p>Всего в электронную таблицу были занесены данные по {data.length - 1} ученикам.</p>
      <p>
        Откройте файл с данной электронной таблицей (скачать его вы можете выше).
        На основании данных, содержащихся в этой таблице, выполните задания.
      </p>
      <ol>
        <li>
          <p>
            Сколько учеников, которые проходили тестирование по предмету {condition[0]?.subjectName},
            набрали {condition[0]?.limitComparison === '<' ? 'менее' : 'более'} {condition[0]?.limit} баллов?
          </p>
          <Answer number="14.1" onChange={handleAnswerChange} />
        </li>
        <li style={{ marginTop: '20px' }}>
          <p>
            Каков средний тестовый балл учеников, которые проходили тестирование по предмету {condition[1]?.subjectName}?<br/>
            Ответ запишите с 2 знаками после запятой (например 50.00)
          </p>
          <Answer number="14.2" onChange={handleAnswerChange} />
        </li>
      </ol>
    </div>
  )
}

export default Excercise14
