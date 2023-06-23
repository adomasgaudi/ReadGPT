'use client'
import { createRef, useEffect, useRef, useState } from 'react'
import tw, { css } from 'twin.macro'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { 悪魔の弟子 } from '../const/text'
import { runChatGPT } from '../const/GPTLogic/runChatGPT'
import ReadINT from './ReadINT'
import SelectedTextPopup from './SelectedTextPopup'
import { FormInput, runChat, useDialogueSetter, usePagesNLocalStorageToFinalText } from './ReadGPTLogic'
import { fontNotoSerifJp } from '@/app/css/twinStyles'
import { contextForText } from '@/app/const/prompt'

const ins = {
  center: css`${tw`flex justify-center items-center`}`,
  e3: css`${tw`flex justify-between items-start p-2 pl-5 pr-9`}`,
  e4: css`${tw`flex justify-between items-end p-2`}`,
}

const textContent = 悪魔の弟子

//

//

//

//

//

export default function ReadGPTLogic() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const allPages = textContent.reduce((acc: any, chapter: any) => acc.concat(chapter.pages), [])

  const [finalText, setFinalText] = useState<any>([])
  const [pagePos, setPagePos] = useState(0)
  const [pagePartPos, setPagePartPos] = useState(0)
  const [selectedPagePos, setSelectedPagePos] = useState(0)
  const [selectedText, setSelectedText] = useState<any>()
  const [newText, setNewText] = useState<string>('')

  const containerRef = useRef(null)
  const pageRefs = useRef([])
  pageRefs.current = allPages[pagePos].map((_: any, i: any) => pageRefs.current[i] ?? createRef())

  //

  const partUp = () => setPagePartPos((prev: any) => prev - 1)
  const partDown = () => setPagePartPos((prev: any) => prev + 1)

  const isUpDisabled = pagePartPos === 0
  const isDownDisabled = pagePartPos + 1 === finalText?.length

  usePagesNLocalStorageToFinalText(
    setFinalText,
    setSelectedText,
    pagePartPos,
    allPages,
    finalText,
  )

  //

  // Handle CHAT

  //

  const messageInput = useRef<HTMLTextAreaElement | null>(null)
  const [response, setResponse] = useState<any>('')
  const useDialogue = useState<any>({ readable: [], usable: [] })
  const [dialogue, setDialogue] = useDialogue
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmitChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    runChat({
      useDialogue,
      setResponse,
      setIsLoading,
      messageInput,
      context: 'Try your best to answer the prompts',
    })
  }

  useDialogueSetter(useDialogue[1], response)

  //

  // handle REPLACE

  //

  const messageInputReplace = useRef<HTMLTextAreaElement | null>(null)
  const [responseReplace, setResponseReplace] = useState<any>('')
  const useDialogueReplace = useState<any>({ readable: [], usable: [] })
  const [dialogueReplace, setDialogueReplace] = useDialogueReplace
  const [isLoadingReplace, setIsLoadingReplace] = useState<boolean>(false)

  const handleSubmitReplace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    runChat({
      useDialogue: useDialogueReplace,
      setResponse: setResponseReplace,
      setIsLoading: setIsLoadingReplace,
      messageInput: messageInputReplace,
      context: contextForText,
    })
  }

  useDialogueSetter(useDialogueReplace[1], responseReplace)

  useEffect(() => {
    setFinalText((prev: any) => {
      const altered = dialogueReplace.usable.pop()
      prev[pagePartPos] = altered
      return [...prev]
    })
  }, [dialogueReplace])

  //

  // SELECTED BUTTON TRANSLATE

  //

  const [responseSelectTranslate, setResponseSelectTranslate]
    = useState<any>('')
  const [_, setIsLoadingSelectTranslate] = useState<boolean>(false)

  const handleSelectedTranslation = async (text: any) => {
    const completeMessage = `Translate this text to english ${text}`

    runChatGPT({
      message: completeMessage,
      setResponse: setResponseSelectTranslate,
      setIsLoadingFunc: setIsLoadingSelectTranslate,
    })
  }

  //

  return (
    <>
      <ReadINT
        child={{
          replaceExtra:
            <div css={['background: white;']}>
              {/* <button css={[tw`m-2`, tw`border`]} onClick={() => runReplace()}>simplify to n5</button> */}
              <p>
                new: {newText}

                dialogue:
                <div>
                  {isLoadingReplace
                    ? dialogueReplace.usable.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          css={[index % 2 === 0 ? tw`text-right` : '']}
                        >
                          <p>{item}</p>
                        </div>
                      )
                    })
                    : dialogueReplace.usable
                      ? dialogueReplace.usable.map((item: string, index: number) => {
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
            chatextra:

            {/* {response} */}
            {isLoading
              ? dialogue.readable.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    css={[index % 2 === 0 ? tw`text-right` : '']}
                  >
                    <p>{item}</p>
                  </div>
                )
              })
              : dialogue.readable
                ? dialogue.readable.map((item: string, index: number) => {
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
          chat:
            <>
              <FormInput {...{
                handleSubmit: handleSubmitChat,
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
              <SelectedTextPopup {...{
                handleButtonClick: handleSelectedTranslation,
                returnResp: responseSelectTranslate,
              }}
              />
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
