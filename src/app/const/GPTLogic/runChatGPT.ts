export const isNoData = (data: any) => {
  if (!data)
    return true
}

const sendRequest = async (message: any, model: string) => {
  const resp = await fetch('/api/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      currentModel: model,
    }),
  })

  if (!resp.ok)
    throw new Error(resp.statusText)

  if (isNoData(resp))
    return null

  return resp.body
}

const runIterationMarker = () => console.log('ChatGPT')

const streamLoop = async (
  data: any,
  setResponse: any,
  setIsLoadingFunc: any,
) => {
  const reader = data.getReader()
  const decoder = new TextDecoder()
  let done = false
  let currentResponse: any = []

  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    currentResponse = [...currentResponse, chunkValue]

    setResponse(currentResponse.join(''))
    runIterationMarker()
  }
  setIsLoadingFunc(false)

  return currentResponse.join('')
}

//

//

//

export const runChatGPT = async ({
  message,
  setResponse,
  setIsLoadingFunc,
  model = 'gpt-3.5-turbo-16k-0613',
}: any) => {
  if (!message)
    return

  const responseData = await sendRequest(message, model)

  if (responseData === null)
    return

  setResponse('')

  const response = await streamLoop(responseData, setResponse, setIsLoadingFunc)
  return response
}
