'use client'
import { useRef, useState } from 'react'
import useSWR from 'swr'
import { fontNotoSerifJp } from '../css/twinStyles'

const book1 = `悪魔の弟子
浜尾四郎


+目次

一

　××地方裁判所検事土田八郎殿。
　一未決囚徒たる私、即ち島浦英三は、其の旧友にして嘗かつては兄弟より親しかりし土田検事殿に、此の手紙を送ります。
　検事殿、あなたは私を無論思い出して居おらるる事でしょうね。仮令たとい他の検事によって取り調べられ、次で予審判事の手に移されてしまった私であっても、あの、世間を騒がした美人殺しの犯人として伝えられ、新聞紙上に其の名を謳うたわれたに違いない以上、同じ裁判所に居るあなたが、今度の事件に就て私の名を見ない筈はなく、又聞かない筈もありません。`

const IconSendArrow = () => <svg
  stroke='currentColor'
  fill='currentColor'
  strokeWidth='0'
  viewBox='0 0 20 20'
  className='h-4 w-4 rotate-90'
  height='1em'
  width='1em'
  xmlns='http://www.w3.org/2000/svg'>
  <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
</svg>

const FormInput = ({ handleSubmit, messageInput, handleEnter, isLoading }) => <form
  onSubmit={handleSubmit}
  className='fixed bottom-0 w-full md:max-w-3xl bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] mb-4'>
  <textarea
    name='Message'
    placeholder='Type your query'
    ref={messageInput}
    onKeyDown={handleEnter}
    className='w-full resize-none bg-transparent outline-none pt-4 pl-4 translate-y-1' />
  <button
    disabled={isLoading}
    type='submit'
    className='absolute top-[1.4rem] right-5 p-1 rounded-md text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'>
    <IconSendArrow />
  </button>
</form>

const ModelSelector = ({ currentModel, handleModelChange, models }) => <select
  value={currentModel}
  onChange={handleModelChange}
  className='w-72 fixed top-5 left-5 outline-none border-none p-4 rounded-md bg-white text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900'>
  {models.map(model => (
    <option key={model.id} value={model.id}>
      {model.id}
    </option>
  ))}
</select>

const ClearHistoryButton = ({ handleReset }) => <button
  onClick={handleReset}
  type='reset'
  className='fixed top-5 right-5 p-4 rounded-md bg-white text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'>
  Clear History
</button>
interface ModelType {
  object: 'engine'
  id: string
  ready: boolean
  owner: string
  permissions: null
  created: string
}
const readResponse = async (
  data, setResponseFunc, setIsLoadingFunc, setFullDialogueFunc,
) => {
  const reader = data.getReader()
  const decoder = new TextDecoder()
  let done = false

  let currentResponse = []
  setResponseFunc(prev => [...prev, ''])
  setFullDialogueFunc(prev => [...prev, ''])
  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    currentResponse = [...currentResponse, chunkValue]
    setResponseFunc(prev => [...prev.slice(0, -1), currentResponse.join('')])
  }
  setFullDialogueFunc(prev => [...prev.slice(0, -1), currentResponse.join('')])

  // Store the response
  localStorage.setItem('response', JSON.stringify(currentResponse))
  setIsLoadingFunc(false)
}

const isNoData = (data) => {
  if (!data)
    return true
}

const runChatGPT = async (
  message: any,
  setResponse: any,
  setIsLoading: any,
  setFullDialogue: any,
  response: any,
  currentModel: any,
) => {
  const ResponsesWithPrompts = response.map(
    (item, idx) => `${idx % 2 === 0 ? 'Prompt' : 'Response'}: ${item}`,
  )

  const combinePrevious = [...ResponsesWithPrompts, `Prompt: ${message}\n Response:`].join('\n')

  if (message !== undefined) {
    setResponse(prev => [...prev, message])
    setFullDialogue(prev => [...prev, combinePrevious])
  }

  if (!message)
    return

  console.log(combinePrevious)
  const resp = await fetch('/api/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: combinePrevious,
      currentModel,
    }),
  })
  console.log('Edge function returned.')

  console.log(resp)

  if (!resp.ok)
    throw new Error(resp.statusText)

  if (isNoData(resp))
    return

  const data = resp.body

  readResponse(data, setResponse, setIsLoading, setFullDialogue)
}

const Form = () => {
  const messageInput = useRef<HTMLTextAreaElement | null>(null)
  const [response, setResponse] = useState<string[]>([])
  const [fullDialogue, setFullDialogue] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [models, setModels] = useState<ModelType[]>([])
  const [currentModel, setCurrentModel] = useState<string>('gpt-3.5-turbo')

  const handleEnter = (
    e: React.KeyboardEvent<HTMLTextAreaElement> &
      React.FormEvent<HTMLFormElement>,
  ) => {
    if (e.key === 'Enter' && isLoading === false) {
      e.preventDefault()
      setIsLoading(true)
      handleSubmit(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = messageInput.current?.value

    runChatGPT(
      message, setResponse, setIsLoading, setFullDialogue, response, currentModel,
    )
    messageInput.current!.value = ''
    // runChatGPT({ message, dialogue, model, setDialogue, setFullDialogue })
  }

  const handleReset = () => {
    localStorage.removeItem('response')
    setResponse([])
  }

  useSWR('fetchingResponse', async () => {
    const storedResponse = localStorage.getItem('response')
    if (storedResponse) {
      // setResponse(JSON.parse(storedResponse))
      console.log('storedResponse', storedResponse)
    }
  })

  const fetcher = async () => {
    const models = await (await fetch('/api/models')).json()
    setModels(models.data)
    const modelIndex = models.data.findIndex(
      (model: ModelType) => model.id === 'gpt-3.5-turbo',
    )
    setCurrentModel(models.data[modelIndex].id)
    return models
  }

  useSWR('fetchingModels', fetcher)

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentModel(e.target.value)
  }

  return (
    <div className='flex justify-center '>
      <ModelSelector {...{ currentModel, handleModelChange, models }} />
      <ClearHistoryButton {...{ handleReset }} />

      <div className='w-full mx-2 flex flex-col items-start gap-3 pt-6 last:mb-6 md:mx-auto md:max-w-3xl pb-[500px] mt-[100px] text-2xl' css={[fontNotoSerifJp]}>
        {/* <button onClick={() => submitPrompt(prompt2, 'say hi in LT')}>get {prompt2}</button> */}
        <div css={[fontNotoSerifJp]}>{book1}</div>
        <div>

          {isLoading
            ? response.map((item: any, index: number) => {
              return (
                <div
                  key={index}>
                  <p>{item}</p>
                </div>
              )
            })
            : response
              ? response.map((item: string, index: number) => {
                return (
                  <div
                    key={index}>
                    <p>{item}</p>
                  </div>
                )
              })
              : null}
        </div>
      </div>
      <FormInput {...{ handleSubmit, messageInput, handleEnter, isLoading }} />

    </div>
  )
}

export default Form
