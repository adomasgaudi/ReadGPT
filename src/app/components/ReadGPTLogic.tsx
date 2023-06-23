'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { runChatGPT } from '../const/GPTLogic/runChatGPT'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export const FormInput = ({ handleSubmit, messageInput, handleEnter, isLoading, placeholder }: any) =>
  <form
    onSubmit={handleSubmit}
    className='flex h-full'
  >
    <textarea
      name='Message'
      placeholder={placeholder || 'Type a message...'}
      ref={messageInput}
      onKeyDown={handleEnter}
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
  messageInput,
  setResponse,
  setIsLoading,
  context,
}: any) => {
  const [dialogue, setDialogue] = useDialogue
  const message = messageInput.current?.value

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

  messageInput.current!.value = ''
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

export const usePagesNLocalStorageToFinalText = (setFinalText: any,
  setSelectedText: any,
  pagePartPos: any,
  allPages: any,
  finalText: any,
) => {
  useEffect(() => {
    const updatedFinalText = [...finalText] // clone finalText array

    allPages[0].forEach((page: any, index: any) => {
      if (typeof window !== 'undefined') {
        const storage = localStorage.getItem(`allPages-${index + 1}`)
        if (storage && index === 0) {
          updatedFinalText.push(storage) // update the cloned array
        }
        else {
          updatedFinalText.push(page) // update the cloned array
        }
      }
    })

    setFinalText(updatedFinalText)
    setSelectedText(updatedFinalText[pagePartPos])
  }, [])
}
