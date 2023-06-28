'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { runChatGPT } from '../../const/GPTLogic/runChatGPT'

export const FormInput = ({ handleSubmit, messageInput, handleEnter, isLoading }: any) =>
  <form
    onSubmit={handleSubmit}
    className='flex h-full'
  >
    <textarea
      name='Message'
      placeholder={'Replace this...'}
      ref={messageInput}
    />
    <button
      disabled={isLoading}
      type='submit'
    >
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  </form>

//

export const buildCompleteMessage = (readDialogue: any, message: any, context: any) => {
  let promptedMessages = ''

  if (readDialogue.length > 0) {
    promptedMessages = readDialogue.map((item: any, i: any) => {
      return i % 2 === 0 ? `Prompt: ${item}\n` : `Response: ${item}\n`
    }).join('')
    promptedMessages += `Prompt: ${message}`
  }
  else {
    promptedMessages = `Prompt: ${message}`
  }

  const completeMessage = `Context: ${context}\n${promptedMessages}\nResponse:`

  return completeMessage
}
//

export const runChat = ({
  useDialogue,
  message,
  setResponse,
  setIsLoading,
  context,
}: any) => {
  const [dialogue, setDialogue] = useDialogue

  const completeMessage = buildCompleteMessage(dialogue.readable, message, context)

  setDialogue((prev: any) => ({
    readable: [...prev.readable, message, ''],
    usable: [...prev.usable, completeMessage, ''],
  }))

  runChatGPT({
    message: completeMessage,
    setResponse,
    setIsLoadingFunc: setIsLoading,
  })
}

export const useDialogueSetter = (setDialogue: any, response: any) => {
  useEffect(() => {
    if (response) {
      setDialogue((prev: any) => ({
        readable: [...prev.readable.slice(0, -1), response],
        usable: [...prev.usable.slice(0, -1), response],
      }))
    }
  }, [response])
}
