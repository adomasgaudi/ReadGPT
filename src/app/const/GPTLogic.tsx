'use client'

export const IconSendArrow = () => <svg
  stroke='currentColor'
  fill='currentColor'
  strokeWidth='0'
  viewBox='0 0 20 20'
  className='h-4 w-4 rotate-90'
  height='1em'
  width='1em'
  xmlns='http://www.w3.org/2000/svg'
>
  <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
</svg>

export const FormInput = ({ handleSubmit, messageInput, handleEnter, isLoading, placeholder }: any) => <form
  onSubmit={handleSubmit}
  className='flex px-4'
>
  <textarea
    name='Message'
    placeholder={placeholder || 'Type a message...'}
    ref={messageInput}
    onKeyDown={handleEnter}
    className='w-full resize-none bg-transparent outline-none pt-4 pl-4 translate-y-1'
  />
  <button
    disabled={isLoading}
    type='submit'
    className='p-1 rounded-md text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'
  >
    <IconSendArrow />
  </button>
</form>

export const ModelSelector = ({ currentModel, handleModelChange, models }) => <select
  value={currentModel}
  onChange={handleModelChange}
  className='w-72 fixed top-5 left-5 outline-none border-none p-4 rounded-md bg-white text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900'
>
  {models.map(model => (
    <option key={model.id} value={model.id}>
      {model.id}
    </option>
  ))}
</select>

export const ClearHistoryButton = ({ handleReset }) => <button
  onClick={handleReset}
  type='reset'
  className='fixed top-5 right-5 p-4 rounded-md bg-white text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'
>
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
  // Step 1: Initialization
  let done = false;
  const reader = data.getReader();
  const decoder = new TextDecoder();
  let currentResponse: any = [];

  setResponseFunc((prev: any) => [...prev, '']);
  if (setFullDialogueFunc !== false) setFullDialogueFunc((prev: any) => [...prev, '']);

  // Step 2: Reading Loop
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    currentResponse = [...currentResponse, chunkValue];
    setResponseFunc((prev: any) => [...prev.slice(0, -1), currentResponse.join('')]);
    console.log('GPT');
  }

  // Step 3: Finalization
  if (setFullDialogueFunc !== false) setFullDialogueFunc((prev: any) => [...prev.slice(0, -1), currentResponse.join('')]);
  setIsLoadingFunc(false);
}

//

//

//

//

export const readResponseOneState = async (
  data: any, setVars: any,
) => {
  const reader = data.getReader()
  const decoder = new TextDecoder()
  let done = false

  let currentResponse: any = []
  setVars((prev: any) => ({ ...prev, dialogue: [...prev.dialogue, ''] }))
  if (setVars !== false)
    setVars((prev: any) => ({ ...prev, fullDialogue: [...prev.fullDialogue, ''] }))
  setVars()
  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    currentResponse = [...currentResponse, chunkValue]
    setVars((prev: any) => ({ ...prev, dialogue: [...prev.fullDialogue.slice(0, -1), currentResponse.join('')] }))
    console.log('GPT')
  }
  if (setVars !== false)

    setVars((prev: any) => ({ ...prev, fullDialogue: [...prev.fullDialogue.slice(0, -1), currentResponse.join('')] }))

  // Store the response
  // localStorage.setItem('response', JSON.stringify(currentResponse.join('')))

  setVars((prev: any) => ({ ...prev, isLoading: false }))
}

//

//

//

//

//

//

//
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
  model = 'gpt-3.5-turbo-16k-0613',
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

export const runChatGPTOneState = async ({
  message,
  dialogue,
  model = 'gpt-3.5-turbo-16k-0613',
  setVars,
  vars,
  isConversation = true,
}: any) => {
  let completeMessage = ''

  console.log(vars)
  if (isConversation) {
    if (vars.dialogue) {
      const ResponsesWithPrompts = vars.dialogue.map(
        (item, idx) => `${idx % 2 === 0 ? 'Prompt' : 'Response'}: ${item}`,
        completeMessage = [...ResponsesWithPrompts, `Prompt: ${message}\n Response:`].join('\n'),
      )
    }
  }
  else {
    completeMessage = message
  }

  if (message !== undefined) {
    if (vars.dialogue) {
      setVars((prev: any) => ({ ...prev, dialogue: [...prev.dialogue, message] }))
    }
    if (setVars !== false && vars.fullDialogue)
      setVars((prev: any) => ({ ...prev, fullDialogue: [...prev.fullDialogue, message] }))
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

  readResponseOneState(data, setVars)
}

export const runSimpleGPT: any = async (message: any) => {
  let isLoading = false
  let response

  isLoading = true
  // console.log(message, '---------------------------------------------------------------')
  const resp = await fetch('/api/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      currentModel: 'gpt-3.5-turbo-16k-0613',
    }),
  })

  if (!resp.ok)
    throw new Error(resp.statusText)

  if (isNoData(resp))
    return

  const data = resp.body

  const respp = readSimpleResponse(data)

  return { response: respp, isLoading }
}
