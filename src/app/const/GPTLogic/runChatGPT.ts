export const isNoData = (data) => {
  if (!data)
    return true
}

const createCompleteMessage = (usedDialogue: any, dialogue: any, message: string) => {
  let promptedMessages = ''

  promptedMessages = [
    ...usedDialogue,
    `Prompt: ${message}\n Response:`,
  ].join('\n')

  return promptedMessages
}

const buildMessage = ({
  isConversation,
  message,
  dialogue,
  usedDialogue,
}: any): { promptedMessages: any; newDialogue: any[]; newUsedDialogue: any[] } => {
  //

  let promptedMessages = ''
  promptedMessages = isConversation
    ? createCompleteMessage(usedDialogue, dialogue, message)
    : `Prompt: ${message} \n Response:`

  return {
    promptedMessages,
    newDialogue: [...dialogue, message],
    newUsedDialogue: [...usedDialogue, promptedMessages],
  }
}

const sendRequest = async (completeMessage: any, model: string, context: any) => {
  const contextedMessages = `Context: ${context} \n ${completeMessage}`

  const resp = await fetch('/api/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: contextedMessages,
      currentModel: model,
    }),
  })

  if (!resp.ok)
    throw new Error(resp.statusText)

  if (isNoData(resp))
    return null

  return resp.body
}

export const streamResponse = async (
  data: any, setDialogFunc: any, setIsLoadingFunc: any, setFullDialogueFunc: any,
) => {
  const initialize = () => {
    const done = false
    const reader = data.getReader()
    const decoder = new TextDecoder()
    const currentResponse: any = []

    setDialogFunc((prev: any) => [...prev, ''])
    if (setFullDialogueFunc !== false)
      setFullDialogueFunc((prev: any) => [...prev, ''])

    return { done, reader, decoder, currentResponse }
  }

  const readingLoop = async (currentResponse: any, done: any, decoder: any, reader: any) => {
    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      currentResponse = [...currentResponse, chunkValue]
      setDialogFunc((prev: any) => [...prev.slice(0, -1), currentResponse.join('')])
      console.log('GPT token')
    }
    return currentResponse
  }

  const finalize = (currentResponse: any) => {
    if (setFullDialogueFunc !== false)
      setFullDialogueFunc((prev: any) => [...prev.slice(0, -1), currentResponse.join('')])
    setIsLoadingFunc(false)
  }

  let { done, reader, decoder, currentResponse } = initialize()
  currentResponse = await readingLoop(currentResponse, done, decoder, reader)
  finalize(currentResponse)
}

//

//

//

export const runChatGPT = async ({
  message,
  dialogue,
  setDialogueFunc,
  setFullDialogueFunc,
  setIsLoadingFunc,
  model = 'gpt-3.5-turbo-16k-0613',
  isConversation = true,
  fullDialogue,
}: any) => {
  const context = 'Answer to the best of your ability'
  if (!message)
    return

  const { promptedMessages, newDialogue, newUsedDialogue }
    = buildMessage({
      isConversation,
      dialogue,
      message,
      usedDialogue: fullDialogue,
    })

  const data = await sendRequest(promptedMessages, model, context)

  if (data === null)
    return

  if (setFullDialogueFunc !== false && setDialogueFunc !== false) {
    setDialogueFunc(newDialogue)
    setFullDialogueFunc(newUsedDialogue)
  }
  streamResponse(data, setDialogueFunc, setIsLoadingFunc, setFullDialogueFunc)
}
