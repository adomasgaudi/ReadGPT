import { readResponse } from './GPTLogic'

export const isNoData = (data) => {
  if (!data)
    return true
}

const buildMessage = (isConversation: boolean, dialogue: any[], message: any): { completeMessage: any; newDialogue: any[]; newFullDialogue: any[] } => {
  let completeMessage = ''

  if (isConversation) {
    const responsesWithPrompts = dialogue.map(
      (item: any, idx: number) =>
        `${idx % 2 === 0 ? 'Prompt' : 'Response'}: ${item}`,
    )

    completeMessage = [...responsesWithPrompts, `Prompt: ${message}\n Response:`].join('\n')
  }
  else {
    completeMessage = message
  }

  return { completeMessage, newDialogue: [...dialogue, message], newFullDialogue: [...dialogue, completeMessage] }
}

const sendRequest = async (completeMessage: any, model: string) => {
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

  if (!resp.ok)
    throw new Error(resp.statusText)

  if (isNoData(resp))
    return null

  return resp.body
}

//

//

//

export const runChatGPT = async ({
  message,
  dialogue,
  model = 'gpt-3.5-turbo-16k-0613',
  setDialogueFunc,
  setFullDialogueFunc,
  setIsLoadingFunc,
  isConversation = true,
}: any) => {
  if (!message)
    return

  const { completeMessage, newDialogue, newFullDialogue } = buildMessage(isConversation, dialogue, message)

  const data = await sendRequest(completeMessage, model)

  if (data === null)
    return

  if (setFullDialogueFunc !== false && setDialogueFunc !== false) {
    setDialogueFunc(newDialogue)
    setFullDialogueFunc(newFullDialogue)
  }
  readResponse(data, setDialogueFunc, setIsLoadingFunc, setFullDialogueFunc)
}
