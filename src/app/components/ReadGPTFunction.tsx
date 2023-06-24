'use client'
import { createRef, useEffect, useRef, useState } from 'react'
import tw, { css } from 'twin.macro'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleReg } from '@fortawesome/free-regular-svg-icons'

import { 悪魔の弟子 } from '../const/text'
import { runChatGPT } from '../const/GPTLogic/runChatGPT'
import { fontNotoSerifJp } from '../css/twinStyles'
import ReadINT from './ReadINT'
import SelectedTextPopup from './SelectedTextPopup'
import { FormInput, runChat, useDialogueSetter } from './ReadGPTLogic'
import { contextForText, convertJPToENGPrompt } from '@/app/const/prompt'

const ins = {
  center: css`${tw`flex justify-center items-center`}`,
  e3: css`${tw`flex justify-between items-start p-2 pl-5 pr-9`}`,
  e4: css`${tw`flex justify-between items-end p-2`}`,
}

const convertARR = (allPages: any) => {
  const final: any = []
  allPages.forEach((page: any) => {
    const finalPage: any = []
    page.forEach((part: any) => {
      finalPage.push([part])
    })
    final.push(finalPage)
  })
  return final
}

function clearStrings(array: any): any {
  if (!Array.isArray(array)) {
    return []
  }

  return array.map((item) => {
    if (Array.isArray(item)) {
      return clearStrings(item)
    }
    else {
      return []
    }
  })
}

function mergeArrays(book1: any, book2: any) {
  const mergedBook: any = []

  book1.forEach((page: any, indexpage: any) => {
    const mergedPage: any = []
    page.forEach((part: any, indexpart: any) => {
      if (book2[indexpage][indexpart]) {
        const partof2 = book2[indexpage][indexpart]
        console.log({ partof2, part })
        if (!partof2)
          return
        const mergedPart = part.concat(partof2)
        console.log({ mergedPart })
        mergedPage.push(mergedPart)
      }
    })
    mergedBook.push(mergedPage)
  })

  return mergedBook
}

const textContent = 悪魔の弟子

const useEffectOnStart = (allPages, setFullBook) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allJSONVariants = JSON.parse(
        localStorage.getItem('ReadGPT-DevilsDisciple'),
      )
      // console.log({ allJSONVariants })

      //

      const convertedAllPages = convertARR(allPages)
      const clearedStringsArray = clearStrings(convertedAllPages)
      // console.log({ convertedAllPages })

      //

      if (!allJSONVariants) {
        localStorage.setItem('ReadGPT-DevilsDisciple', JSON.stringify(clearedStringsArray))
      }
      // console.log({ convertedAllPages, allJSONVariants })
      if (allJSONVariants && convertedAllPages) {
        if (allJSONVariants.length !== 0 && convertedAllPages.length !== 0) {
          const fullBookConst = allJSONVariants ? mergeArrays(convertedAllPages, allJSONVariants) : convertedAllPages
          // console.log({ fullBookConst })

          setFullBook(fullBookConst)
        }
      }
    }
  }, [])
}
//

//

//

//

export default function ReadGPTLogic() {
  const [fullBook, setFullBook] = useState<any>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const allPages = textContent.reduce((acc: any, chapter: any) => acc.concat(chapter.pages), [])

  const [finalText, setFinalText] = useState<any>([])
  const [pagePos, setPagePos] = useState(0)
  const [pagePartPos, setPagePartPos] = useState(0)
  const [selectedPagePos, setSelectedPagePos] = useState(0)
  const [newText, setNewText] = useState<string>('')

  const containerRef = useRef(null)
  const pageRefs = useRef([])
  pageRefs.current = allPages[pagePos].map((_: any, i: any) => pageRefs.current[i] ?? createRef())

  //

  const partUp = () => setPagePartPos((prev: any) => prev - 1)
  const partDown = () => setPagePartPos((prev: any) => prev + 1)

  const isUpDisabled = pagePartPos === 0
  const isDownDisabled = pagePartPos + 1 === finalText?.length

  const [paragraphVersionPos, setParagraphVersionPos] = useState(0)

  useEffectOnStart(allPages, setFullBook)

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
    const message = messageInput.current?.value
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

  // Handle REPLACE

  //

  const messageInputReplace = useRef<HTMLTextAreaElement | null>(null)
  const [responseReplace, setResponseReplace] = useState<any>('')
  const useDialogueReplace = useState<any>({ readable: [], usable: [] })
  const [dialogueReplace, setDialogueReplace] = useDialogueReplace
  const [isLoadingReplace, setIsLoadingReplace] = useState<boolean>(false)

  const handleSubmitReplace = async (e?: React.FormEvent<HTMLFormElement>, text: any) => {
    if (e)
      e.preventDefault()
    const currentVers = fullBook[pagePos][pagePartPos][paragraphVersionPos]
    const message = text || messageInputReplace.current?.value
    runChat({
      useDialogue: useDialogueReplace,
      setResponse: setResponseReplace,
      setIsLoading: setIsLoadingReplace,
      message,
      context: contextForText(currentVers),
    })
  }

  useDialogueSetter(useDialogueReplace[1], responseReplace)

  // console.log({ responseReplace, dialogueReplace })
  // reset fullbook after handleREPLACE

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastGeneratedAlteration = dialogueReplace.usable[dialogueReplace.usable.length - 1]
      // console.log('last generated', lastGeneratedAlteration)

      if (lastGeneratedAlteration) {
        const pushedVari = JSON.parse(
          localStorage.getItem('ReadGPT-DevilsDisciple'),
        )

        pushedVari[pagePos][pagePartPos][0].push(lastGeneratedAlteration)
        // console.log('pushedVariants', pushedVari)
        if (!isLoadingReplace) {
          localStorage.setItem('ReadGPT-DevilsDisciple', JSON.stringify(pushedVari))
        }
        const merged = mergeArrays(pushedVari, allPages)
        // console.log({ merged, pushedVari, allPages })
        setFullBook(merged)
      }
    }
  }, [dialogueReplace, isLoadingReplace])

  // SELECTED BUTTON TRANSLATE

  //

  const [responseSelectTranslate, setResponseSelectTranslate]
    = useState<any>('')
  const [_, setIsLoadingSelectTranslate] = useState<boolean>(false)

  const handleSelectedTranslation = async (text: any) => {
    const completeMessage = `${convertJPToENGPrompt}${text}\nResponse:`

    runChatGPT({
      message: completeMessage,
      setResponse: setResponseSelectTranslate,
      setIsLoadingFunc: setIsLoadingSelectTranslate,
    })
  }

  //

  const [partVariants, setPartVariants] = useState<any>([])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allKeys = Object.keys(localStorage)
      const filteredKeys = allKeys.filter(key => key.startsWith(`allPages-0-${pagePartPos}`))

      setPartVariants(filteredKeys.length)
    }
  }, [])

  // console.log([...Array(4)].map(() => null))

  const [allVariants, setAllVariants] = useState<any>([])

  useEffect(() => {

  }, [paragraphVersionPos])

  let partVariantsShort
  if (allVariants.allPages) {
    partVariantsShort = allVariants?.allPages[0].parts[pagePartPos].variants
  }

  console.log({ fullBook })
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
                {/* <div>
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
                </div> */}
              </p>
            </div>,
          replaceInput: <>
            <div css={[tw`flex`]}>

              <FormInput {...{
                handleSubmit: handleSubmitReplace,
                messageInput: messageInputReplace,
                handleEnter: null,
                isLoading: isLoadingReplace,
              }}
              />
              <button onClick={() => handleSubmitReplace(null, 'texthello')} css={[tw`mx-2 border px-2`]}>simplify</button>
            </div>
          </>,
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
          chatInput:
            <>
              <FormInput {...{
                handleSubmit: handleSubmitChat,
                messageInput,
                handleEnter: null,
                isLoading,
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
          main:
            <>
              {/* <div ref={containerRef} css={[tw``]}>
                {fullBook && fullBook[pagePos].map((page: any, index: any) => (

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
              </div> */}
              {fullBook && fullBook[pagePos] && fullBook[pagePos].map((part: any, index: any) => (

                <div ref={pageRefs.current[index]} key={index}>
                  <p css={[
                    index !== pagePartPos && 'color: lightgray;',
                    tw`text-xl `,
                    tw`p-2 pt-8`,
                    fontNotoSerifJp]}
                  >
                    {part[index === pagePartPos ? paragraphVersionPos : 0]}
                  </p>
                </div>
              ))
              }
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
              {isLoadingReplace ? 'loading' : 'not'}
              -- part: {partVariants} ---

              {fullBook && fullBook[pagePos] && fullBook[pagePos][pagePartPos]
                && [...Array(fullBook[pagePos][pagePartPos].length)].map((item: any, index: any) =>
                  <button key={index} onClick={() => setParagraphVersionPos(index)}>
                    <FontAwesomeIcon icon={index === 1 ? faCircle : faCircleReg} />
                  </button>)
              }
              {paragraphVersionPos}
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
