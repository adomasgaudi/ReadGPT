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

export const streamResponse = async (
  data: any, setResponse: any, setIsLoadingFunc: any,
) => {
  const VARS = () => {
    const done = false
    const reader = data.getReader()
    const decoder = new TextDecoder()
    const currentResponse: any = []

    return { done, reader, decoder, currentResponse }
  }

  const readingLoop = async (currentResponse: any, done: any, decoder: any, reader: any) => {
    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      //
      currentResponse = [...currentResponse, chunkValue]
      setResponse(currentResponse.join(''))
      console.log('GPT token')
      // TODO: redux for GPT counter
    }
    setIsLoadingFunc(false)
  }

  const { done, reader, decoder, currentResponse } = VARS()
  readingLoop(currentResponse, done, decoder, reader)
}

//

//

//

export const runChatGPT = async ({
  message,
  useStateResponse,
  setIsLoadingFunc,
  model = 'gpt-3.5-turbo-16k-0613',
}: any) => {
  const [InitResponse, setResponse] = useStateResponse

  if (!message)
    return

  const response = await sendRequest(message, model)

  if (response === null)
    return

  setResponse(message)

  streamResponse(response, setResponse, setIsLoadingFunc)
}
