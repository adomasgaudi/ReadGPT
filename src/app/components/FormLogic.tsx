export const book1 = `地方裁判所検事土田八郎殿。
　一未決囚徒たる私、即ち島浦英三は、其の旧友にして嘗かつては兄弟より親しかりし土田検事殿に、此の手紙を送ります。
　検事殿、あなたは私を無論思い出して居おらるる事でしょうね。仮令たとい他の検事によって取り調べられ、次で予審判事の手に移されてしまった私であっても、あの、世間を騒がした美人殺しの犯人として伝えられ、新聞紙上に其の名を謳うたわれたに違いない以上、同じ裁判所に居るあなたが、今度の事件に就て私の名を見ない筈はなく、又聞かない筈もありません。`


export const IconSendArrow = () => <svg
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

export const FormInput = ({ handleSubmit, messageInput, handleEnter, isLoading, placeholder }: any) => <form
  onSubmit={handleSubmit}
  className='flex px-4'>
  <textarea
    name='Message'
    placeholder={placeholder || 'Type a message...'}
    ref={messageInput}
    onKeyDown={handleEnter}
    className='w-full resize-none bg-transparent outline-none pt-4 pl-4 translate-y-1' />
  <button
    disabled={isLoading}
    type='submit'
    className='p-1 rounded-md text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'>
    <IconSendArrow />
  </button>
</form>

export const ModelSelector = ({ currentModel, handleModelChange, models }) => <select
  value={currentModel}
  onChange={handleModelChange}
  className='w-72 fixed top-5 left-5 outline-none border-none p-4 rounded-md bg-white text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900'>
  {models.map(model => (
    <option key={model.id} value={model.id}>
      {model.id}
    </option>
  ))}
</select>

export const ClearHistoryButton = ({ handleReset }) => <button
  onClick={handleReset}
  type='reset'
  className='fixed top-5 right-5 p-4 rounded-md bg-white text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'>
  Clear History
</button>

export interface ModelType {
  object: 'engine'
  id: string
  ready: boolean
  owner: string
  permissions: null
  created: string
}

export const readResponse = async (
  data: any, setResponseFunc: any, setIsLoadingFunc: any, setFullDialogueFunc: any,
) => {
  const reader = data.getReader()
  const decoder = new TextDecoder()
  let done = false

  let currentResponse: any = []
  setResponseFunc((prev: any) => [...prev, ''])
  if (setFullDialogueFunc !== false)
    setFullDialogueFunc((prev: any) => [...prev, ''])
  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    currentResponse = [...currentResponse, chunkValue]
    setResponseFunc((prev: any) => [...prev.slice(0, -1), currentResponse.join('')])
    console.log('GPT')
  }
  if (setFullDialogueFunc !== false)
    setFullDialogueFunc((prev: any) => [...prev.slice(0, -1), currentResponse.join('')])

  // Store the response
  localStorage.setItem('response', JSON.stringify(currentResponse.join('')))
  setIsLoadingFunc(false)
}

export const readSimpleResponse = async (data: any) => {
  const reader = data.getReader()
  const decoder = new TextDecoder()
  let done = false

  let currentResponse: any = []

  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    currentResponse = [...currentResponse, chunkValue]
    console.log('simpleGPT')
  }
  // console.log('now we go', currentResponse.join(''))
  return currentResponse.join('')
}

export const isNoData = (data) => {
  if (!data)
    return true
}

export const runChatGPT = async ({
  message,
  dialogue,
  model = 'gpt-3.5-turbo',
  setDialogueFunc,
  setFullDialogueFunc,
  setIsLoadingFunc,
  isConversation = true,
}: any) => {
  let completeMessage = ''

  if (isConversation) {
    const ResponsesWithPrompts = dialogue.map(
      (item, idx) => `${idx % 2 === 0 ? 'Prompt' : 'Response'}: ${item}`,
    )

    completeMessage = [...ResponsesWithPrompts, `Prompt: ${message}\n Response:`].join('\n')
  }
  else {
    completeMessage = message
  }

  if (message !== undefined) {
    setDialogueFunc(prev => [...prev, message])
    if (setFullDialogueFunc !== false)
      setFullDialogueFunc(prev => [...prev, completeMessage])
  }

  if (!message)
    return

  // console.log(completeMessage)
  const resp = await fetch('/api/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: completeMessage,
      currentModel: model,
    }),
  })
  // console.log('Edge function returned.')

  // console.log(resp)

  if (!resp.ok)
    throw new Error(resp.statusText)

  if (isNoData(resp))
    return

  const data = resp.body

  readResponse(data, setDialogueFunc, setIsLoadingFunc, setFullDialogueFunc)
}


export const runSimpleGPT: any = async (message: any) => {
  let isLoading = false;
  let response;


  isLoading = true;
  // console.log(message, '---------------------------------------------------------------')
  const resp = await fetch('/api/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      currentModel: 'gpt-3.5-turbo',
    }),
  })

  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  if (isNoData(resp))
    return

  const data = resp.body

  const respp = readSimpleResponse(data)


  return { response: respp, isLoading };
};

