import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import utils from '/home/vus/diplom/diplom/src/components/Excercises/utils.js'
import ryba from 'ryba-js'
import {
  Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/theme/material-ocean.css'
import tasksTemplates from './Excercise15tasks/index.js'

const defaultCode = {
  javascript: `function solution(input){
  // формат входных данных: %%input%%
  // формат выходных данных: %%output%%
  let output
  return output
}`,
  python: `def solution(input):
  # формат входных данных: %%input%%
  # формат выходных данных: %%output%%
  output = ''
  return output`,
}

const languageNames = {
  javascript: 'ECMAScript 6 (JS)',
  python: 'Python 3.8',
}

const defaultLanguage = 'javascript'

function ResetConfirmationModal({ open, toggle, handleReset }) {
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Восстановить код?</ModalHeader>
      <ModalBody>
        Вы действительно хотите вернуть поле для ввода кода в исходное состояние?
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={toggle}>Нет</Button>{' '}
        <Button color="secondary" onClick={handleReset}>Да</Button>
      </ModalFooter>
    </Modal>
  )
}

function Excercise15() {
  // Инициализация ref для кеша и codemirror
  const cachedTasksData = useRef({})
  const codemirrorRef = useRef(null)

  // Исходная задача — случайная из шаблонов
  const sourceTask = useMemo(() => utils.randomItem(tasksTemplates), [])

  // Инициализация кеша для задач (один раз)
  useEffect(() => {
    tasksTemplates.forEach(t => {
      cachedTasksData.current[t.type] = {}
      Object.keys(languageNames).forEach(lang => {
        cachedTasksData.current[t.type][lang] = undefined
      })
    })
  }, [])

  // Функция генерации данных для задачи с кешированием
  const generateDataForTask = useCallback(
    (_task, language) => {
      let cachedTask = cachedTasksData.current[_task.type]?.[language]
      if (cachedTask) return cachedTask

      let task = { ..._task }
      switch (task.type) {
        case 'find_multiple_number':
          task.multiple = utils.random(2, 8)
          task.non_multiple = utils.random(2, 8, task.multiple)
          task.languagesSpecificData[language].exampleSolution = task.languagesSpecificData[language].exampleSolution
            .replace(/%multiple%/g, task.multiple)
            .replace(/%non_multiple%/g, task.non_multiple)
          task.text = task.text
            .replace(/%multiple%/g, task.multiple)
            .replace(/%non_multiple%/g, task.non_multiple)
          break
        case 'reversed_words':
          task.limit = utils.random(5, 9)
          task.languagesSpecificData[language].exampleSolution = task.languagesSpecificData[language].exampleSolution.replace(/%limit%/g, task.limit)
          task.text = task.text.replace(/%limit%/g, task.limit)
          break
        case 'phone_number':
        case 'repeating_characters':
        case 'unique_number':
          // nothing to change
          break
      }
      cachedTasksData.current[_task.type][language] = task
      return task
    },
    []
  )

  // Хук для state
  const [language, setLanguage] = useState(defaultLanguage)
  const [task, setTask] = useState(() => generateDataForTask(sourceTask, defaultLanguage))
  const [value, setValue] = useState()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [pythonCompilerLoading, setPythonCompilerLoading] = useState('none')

  const [resetConfirmationModalOpen, setResetConfirmationModalOpen] = useState(false)
  const [execution_input, setExecutionInput] = useState('Здесь появится ввод в вашу программу')
  const [execution_output, setExecutionOutput] = useState('Здесь появится вывод вашей программы')
  const [execution_output_type, setExecutionOutputType] = useState('default')

  const [example_input, setExampleInput] = useState('')
  const [example_output, setExampleOutput] = useState('')

  // Функция получения дефолтного кода с подстановкой форматов
  const getDefaultCode = useCallback(
    (lang) => {
      return defaultCode[lang]
        .replace(/%%input%%/g, task.languagesSpecificData[lang].inputFormat)
        .replace(/%%output%%/g, task.languagesSpecificData[lang].outputFormat)
    },
    [task]
  )

  // Проверка, совпадает ли код с дефолтным
  const hasDefaultValue = useCallback(() => {
    return getDefaultCode(language) === value
  }, [getDefaultCode, language, value])

  // Инициализация данных и значения кода при монтировании и смене задачи/языка
  useEffect(() => {
    // Запуск генерации данных задачи и дефолтного кода
    const defaultCodeVal = getDefaultCode(language)
    setValue(defaultCodeVal)
    setResetConfirmationModalOpen(false)
    setExecutionInput('Здесь появится ввод в вашу программу')
    setExecutionOutput('Здесь появится вывод вашей программы')
    setExecutionOutputType('default')
  }, [getDefaultCode, language])

  // Генерация задачи при инициализации и смене языка
  useEffect(() => {
    setTask(generateDataForTask(sourceTask, language))
  }, [generateDataForTask, language, sourceTask])

  // Функция форматирования входных данных для вывода
  const formatInput = useCallback((string) => {
    if (string !== undefined && typeof string.split === 'function') {
      return string.split(', ').join('\n').slice(1, -1)
    }
    return string
  }, [])

  // Форматирование вывода
  const formatOutput = useCallback((string) => {
    if (string === '') return 'Пусто'
    else return string ?? 'Пусто'
  }, [])

  // Функция выполнения кода, принимает функцию решения и компилятор
  const runcode = useCallback(
    (f, compiler, specified_input, display_output = true) => {
      const input = specified_input ?? task.languagesSpecificData[language].inputFillFunction()
      const executed_code = {
        javascript: `${f}\n solution(${input}),`,
        python: `${f}\n__OUTPUT__ = solution(${input})`,
      }[language]

      let output
      try {
        output = compiler(executed_code)
        if (display_output)
          setExecutionOutputType([undefined, null, ''].includes(output) ? 'empty' : 'default')
        output = formatOutput(output)
      } catch (e) {
        output = 'Ошибка:\n' + e
        if (display_output) setExecutionOutputType('error')
      }
      return [input, output]
    },
    [language, task, formatOutput]
  )

  // Тестирование решения (используется в exampleTest и testUserSolution)
  const test = useCallback(
    (f, specified_input = undefined, display_output = true) => {
      switch (language) {
        case 'javascript':
          return runcode(f, (executed_code) => eval(executed_code), specified_input, display_output)
        case 'python':
          return runcode(f, (executed_code) => window.python_compile(executed_code), specified_input, display_output)
        default:
          return [undefined, undefined]
      }
    },
    [language, runcode]
  )

  // Пример теста, запуск при инициализации задачи/языка/кода
  const exampleTest = useCallback(() => {
    const [input, output] = test(task.languagesSpecificData[language].exampleSolution)
    setExampleInput(formatInput(input))
    setExampleOutput(output)
  }, [language, task, test, formatInput])

  useEffect(() => {
    exampleTest()
  }, [exampleTest])

  // Обработчики UI
  const handleExecute = useCallback(() => {
    const [input, output] = test(value)
    setExecutionInput(formatInput(input))
    setExecutionOutput(formatOutput(output))
  }, [test, value, formatInput, formatOutput])

  const resetModalToggle = useCallback(() => {
    setResetConfirmationModalOpen(false)
  }, [])

  const resetToDefault = useCallback(() => {
    setValue(getDefaultCode(language))
  }, [getDefaultCode, language])

  const handleResetOffer = useCallback(() => {
    if (hasDefaultValue()) {
      resetToDefault()
    } else {
      setResetConfirmationModalOpen(true)
    }
  }, [hasDefaultValue, resetToDefault])

  const handleReset = useCallback(() => {
    resetModalToggle()
    resetToDefault()
  }, [resetModalToggle, resetToDefault])

  const dropDownToggle = useCallback(() => {
    setDropdownOpen((prev) => !prev)
  }, [])

  // Обработка смены языка с учетом загрузки плагина Python
  const setLanguageHandler = useCallback(
    (lang) => {
      if (lang !== language) {
        if (lang === 'python' && !window.plugins_loaded) {
          setPythonCompilerLoading('flex')
          window.python_load_compiler()
          const intervalLoop = setInterval(() => {
            if (window.plugins_loaded) {
              setLanguage(lang)
              setPythonCompilerLoading('none')
              clearInterval(intervalLoop)
            }
          }, 10)
        } else {
          setLanguage(lang)
        }
      }
    },
    [language]
  )

  // Проверка пользовательского решения (можно вызвать по кнопке или другим событием)
  const testUserSolution = useCallback(() => {
    let failedTests = 0
    const userSolution = value
    for (let i = 0; i < 10; i++) {
      const [inputToUserSolution, outputFromUserSolution] = test(userSolution, undefined, false)
      const [, correctOutput] = test(
        task.languagesSpecificData[language].exampleSolution.toString(),
        inputToUserSolution.split(' \n'),
        false
      )
      if (outputFromUserSolution !== correctOutput) failedTests++
    }
    if (failedTests === 0) return true
    else if (failedTests === 10) return false
    else return 'tests failed: ' + failedTests
  }, [test, task, language, value])

  // Обработка сочетания клавиш Cmd/Ctrl + Enter
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
        const btn = document.querySelector('#execute_excercise15')
        if (btn) btn.click()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Стили для элементов
  const tdstyles = { flex: 0, padding: 0, paddingRight: '15px' }
  const compilerLoaderStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    zIndex: 9,
    display: pythonCompilerLoading,
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={compilerLoaderStyles}>
        <h3>Загрузка компилятора Python...</h3>
        <p className='text-muted'>Это может занять некоторое время</p>
      </div>
      <div style={{ overflow: 'auto' }}>
        <p>{task.text}</p>
        <p><b>Пример работы программы:</b></p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Входные данные</th>
              <th scope="col">Выходные данные</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ maxWidth: '30vw', overflowX: 'auto' }}><pre>{example_input}</pre></td>
              <td><pre>{example_output}</pre></td>
            </tr>
          </tbody>
        </table>
        <Card>
          <CardBody>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td colSpan={2} style={{ paddingBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={tdstyles}>
                        <Dropdown isOpen={dropdownOpen} toggle={dropDownToggle}>
                          <DropdownToggle caret style={{ backgroundColor: '#6f42c1' }} className='dropdown-purple'>
                            {languageNames[language]}
                          </DropdownToggle>
                          <DropdownMenu dark>
                            <DropdownItem header>Язык компиляции</DropdownItem>
                            <DropdownItem onClick={() => setLanguageHandler('javascript')}>{languageNames.javascript}</DropdownItem>
                            <DropdownItem onClick={() => setLanguageHandler('python')}>{languageNames.python}</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                      <Button
                        color="primary"
                        id="execute_excercise15"
                        style={{ flex: 1 }}
                        onClick={handleExecute}
                      >
                        Выполнить код
                      </Button>{' '}
                      <Button
                        color="secondary"
                        onClick={handleResetOffer}
                        style={{ marginLeft: '10px' }}
                      >
                        Сбросить код
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <CodeMirror
                      editorDidMount={(editor) => { codemirrorRef.current = editor }}
                      value={value}
                      onBeforeChange={(_editor, _data, newValue) => setValue(newValue)}
                      options={{
                        mode: language,
                        theme: 'material-ocean',
                        lineNumbers: true,
                        indentUnit: 2,
                        smartIndent: true,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Ввод:</b>
                    <pre>{execution_input}</pre>
                  </td>
                  <td>
                    <b>Вывод:</b>
                    <pre style={{ color: execution_output_type === 'error' ? 'red' : 'inherit' }}>
                      {execution_output}
                    </pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>

      <ResetConfirmationModal
        open={resetConfirmationModalOpen}
        toggle={resetModalToggle}
        handleReset={handleReset}
      />
    </div>
  )
}

export default Excercise15
