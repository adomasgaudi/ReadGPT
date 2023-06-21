'use client'
import { createRef, useEffect, useRef, useState } from 'react'
import tw, { css } from 'twin.macro'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBook } from '@fortawesome/free-solid-svg-icons'

import { 悪魔の弟子 } from '../../const/text'
import ReadINT from './ReadINT'
import { runChatGPT, runSimpleGPT } from '@/app/const/GPTLogic'
import { fontNotoSerifJp } from '@/app/css/twinStyles'
import { contextPrompt, convertJPToENGPrompt, simplifySentencePrompt } from '@/app/const/prompt'

const ins = {
  center: css`${tw`flex justify-center items-center`}`,
  e3: css`${tw`flex justify-between items-start p-2 pl-5 pr-9`}`,
  e4: css`${tw`flex justify-between items-end p-2`}`,
  // e4: css`${tw`flex justify-center items-center `}`,
}

const SelectedTextPopup = ({ handleButtonClick, returnResp }: any) => {
  const [selection, setSelection] = useState('')
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [response, setResponse] = useState<string | null>(null)  // Add this state for storing the response
  const popupRef = useRef(null)

  useEffect(() => {
    setResponse(returnResp)
  }, [returnResp])

  useEffect(() => {
    const handleTextSelection = () => {
      const selectedText = window.getSelection()?.toString()
      if (selectedText) {
        setSelection(selectedText)
        const range = window.getSelection()?.getRangeAt(0)
        const rect = range?.getBoundingClientRect()
        if (rect)
          setCoords({ x: rect.left, y: rect.top - 40 }) // Adjust y position to show above the selected text
      }
      else {
        setSelection('')
      }
    }

    document.addEventListener('mouseup', handleTextSelection)
    return () => document.removeEventListener('mouseup', handleTextSelection)
  }, [])

  useEffect(() => {
    const popup: any = popupRef.current
    if (popup) {
      popup.style!.left = `${coords.x}px`
      popup.style!.top = `${coords.y}px`
    }
  }, [coords, popupRef])

  if (!selection)
    return null

  return (
    <div
      ref={popupRef}
      style={{ position: 'fixed', background: 'white', border: '1px solid black', padding: '10px' }}
    >
      <span className='mr-4'>
        {selection}: {response}
      </span>

      <button onClick={() => handleButtonClick(selection)}>
        <FontAwesomeIcon icon={faBook} />
      </button>
    </div>
  )
}

const textContent = 悪魔の弟子
export const IconSendArrow = () =>
  <svg
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
      <IconSendArrow />
    </button>
  </form>

//

//

//

//

//

//

//

export default function ReadGPTLogic() {
  const allPages = textContent.reduce((acc: any, chapter: any) => acc.concat(chapter.pages), [])

  const [finalText, setFinalText] = useState<any>([])
  // GPT API Chat vars
  const messageInput = useRef<HTMLTextAreaElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fullDialogue, setFullDialogue] = useState<any>([])
  const [dialogue, setDialogue] = useState<string[]>([])

  // GPT API Replace vars
  const messageInputReplace = useRef<HTMLTextAreaElement | null>(null)
  const [isLoadingReplace, setIsLoadingReplace] = useState<boolean>(false)
  const [fullDialogueReplace, setFullDialogueReplace] = useState<any>([])
  const [dialogueReplace, setDialogueReplace] = useState<string[]>([])
  // const [vars, setVars] = useState<any>({})

  const [currentModel, setCurrentModel] = useState<string>('gpt-3.5-turbo-16k-0613')

  const [pagePos, setPagePos] = useState(0)
  const [pagePartPos, setPagePartPos] = useState(0)
  const [selectedPagePos, setSelectedPagePos] = useState(0)

  const [selectedText, setSelectedText] = useState<any>()

  const [newText, setNewText] = useState<string>('')

  const containerRef = useRef(null)

  const pageRefs = useRef([])
  pageRefs.current = allPages[pagePos].map((_: any, i: any) => pageRefs.current[i] ?? createRef())

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = messageInput.current?.value

    runChatGPT({
      message,
      dialogue,
      model: currentModel,
      setDialogueFunc: setDialogue,
      setFullDialogueFunc: setFullDialogue,
      setIsLoadingFunc: setIsLoading,
    })
    messageInput.current!.value = ''
  }

  const handleSubmitReplace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const messageInput = messageInputReplace.current?.value
    const finalPrompt = `${contextPrompt(selectedText, messageInput)}\n Response:`

    runChatGPT({
      message: finalPrompt,
      dialogue: dialogueReplace,
      model: currentModel,
      setDialogueFunc: setDialogueReplace,
      setFullDialogueFunc: setFullDialogueReplace,
      setIsLoadingFunc: setIsLoadingReplace,
    })
    // console.log(fullDialogueReplace)
    // console.log(dialogueReplace)
    messageInputReplace.current!.value = ''
  }

  const runReplace = () => {
    (async () => {
      const text = allPages[0][0]
      const bookParts = text.split('。').filter((item: any) => item.trim() !== '')
      const results = []
      // console.log(bookParts)

      for (let i = 0; i < bookParts.length; i++) {
        const result1 = await runSimpleGPT(`${simplifySentencePrompt}${bookParts[i]}\n Response:`)
        const awaitedResponse1 = await result1.response
        results.push(awaitedResponse1)
      }
      // console.log(results)
      setNewText(results.join('。'))
      if (typeof window !== 'undefined') {
        localStorage.setItem('allPages-1', JSON.stringify(results.join('。')))
      }
    })()
  }

  useEffect(() => {
    const updatedFinalText = [...finalText] // clone finalText array

    allPages[0].forEach((page: any, index) => {
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

  const partUp = () => setPagePartPos((prev: any) => prev - 1)
  const partDown = () => setPagePartPos((prev: any) => prev + 1)

  const isUpDisabled = pagePartPos === 0
  const isDownDisabled = pagePartPos + 1 === finalText?.length

  useEffect(() => {
    setFinalText((prev: any) => {
      const altered = dialogueReplace.pop()
      prev[pagePartPos] = altered
      return [...prev]
    })
  }, [dialogueReplace],
  )

  const [translation, setTranslation] = useState()

  const handleButtonClick = async (text: any) => {
    const { response, isLoading } = await runSimpleGPT(`${convertJPToENGPrompt}${text}\n Response:`)
    setTranslation(response)
  }

  return (
    <>
      <ReadINT
        child={{
          replaceExtra:
            <div css={['background: white;']}>
              <button css={[tw`m-2`, tw`border`]} onClick={() => runReplace()}>simplify to n5</button>
              <p>
                new: {newText}

                dialogue:
                <div>
                  {isLoadingReplace
                    ? fullDialogueReplace.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          css={[index % 2 === 0 ? tw`text-right` : '']}
                        >
                          <p>{item}</p>
                        </div>
                      )
                    })
                    : fullDialogueReplace
                      ? fullDialogueReplace.map((item: string, index: number) => {
                        return (
                          <div
                            key={index}
                            css={[index % 2 === 0 ? tw`text-right` : '']}
                          >
                            <p>{item}</p>
                          </div>
                        )
                      })
                      : null}
                </div>
              </p>
            </div>,
          chatExtra: <>
            {isLoading
              ? dialogue.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    css={[index % 2 === 0 ? tw`text-right` : '']}
                  >
                    <p>{item}</p>
                  </div>
                )
              })
              : dialogue
                ? dialogue.map((item: string, index: number) => {
                  return (
                    <div
                      key={index}
                      css={[index % 2 === 0 ? tw`text-right` : '']}
                    >
                      <p>{item}</p>
                    </div>
                  )
                })
                : null}
          </>,
          chat: <>
            <FormInput {...{
              handleSubmit,
              messageInput,
              handleEnter: null,
              isLoading,
            }}
            />
          </>,
          addContent: <>hi addContent </>,
          replaceContent: <>
            <FormInput {...{
              handleSubmit: handleSubmitReplace,
              messageInput: messageInputReplace,
              handleEnter: null,
              isLoading: isLoadingReplace,
            }}
            />
          </>,
          pagesList:
            <>
              <div css={[tw`max-w-full w-full overflow-scroll`, tw`flex flex-row flex-nowrap`, tw`border-2`]}>
                {finalText.map((item: any, idx: any) => (
                  <button
                    key={idx}
                    css={[tw`min-w-[40px] m-1 min-h-[40px]`, ins.center, tw` border`, selectedPagePos + 1 === item ? '' : '']}
                    onClick={() => {
                      setSelectedPagePos(idx + 1)
                      setPagePartPos(0)
                    }}
                  >
                    {idx + 1}
                  </button>
                ))}

              </div>
            </>,
          pageContent:
            <>
              <div ref={containerRef} css={[tw``]}>
                {finalText.map((page: any, index: any) => (

                  <div ref={pageRefs.current[index]} key={index}>
                    <p css={[
                      index !== pagePartPos && 'color: lightgray;',
                      tw`text-xl `,
                      tw`p-2 pt-8`,
                      fontNotoSerifJp]}
                    >
                      {page}
                    </p>
                  </div>

                ))}
              </div>
              <SelectedTextPopup {...{ handleButtonClick, returnResp: translation }} />
            </>,
          header:
            <>
              <button onClick={() => setIsSidebarOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
              </button>
              <Link href="/">
                <div className=''>
                  ReadGPT
                </div>
              </Link>
            </>,
          sidebar: <>
            <div>
              hi sidebar
            </div>
          </>,
          buttons: <>
            {
              <div css={['background: white;', tw`absolute right-40 mr-2`]}>
                <button disabled={isUpDisabled} css={[isUpDisabled ? tw`text-gray` : tw`border p-1`]} onClick={() => partUp()}>
                  go up
                </button>
              </div>
            }
            <div css={['background: white;', tw`absolute right-20 `]}>
              <button disabled={isDownDisabled} css={[isDownDisabled ? tw`text-gray` : tw`border p-1`]} onClick={() => partDown()} >
                go down
              </button>
            </div>
          </>,
        }}
      />
    </>
  )
}
