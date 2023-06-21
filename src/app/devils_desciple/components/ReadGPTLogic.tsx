'use client'
import { createRef, useRef, useState } from 'react'
import tw, { css } from 'twin.macro'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { 悪魔の弟子 } from '../../const/text'
import ReadINT from './ReadINT'
import { runChatGPT, runSimpleGPT } from '@/app/const/GPTLogic'
import { fontNotoSerifJp } from '@/app/css/twinStyles'
import { simplifySentencePrompt } from '@/app/const/prompt'

const ins = {
  center: css`${tw`flex justify-center items-center`}`,
  e3: css`${tw`flex justify-between items-start p-2 pl-5 pr-9`}`,
  e4: css`${tw`flex justify-between items-end p-2`}`,
  // e4: css`${tw`flex justify-center items-center `}`,
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

export default function ReadGPTLogic() {
  const allPages = textContent.reduce((acc: any, chapter: any) => acc.concat(chapter.pages), [])
  const messageInput = useRef<HTMLTextAreaElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dialogue, setDialogue] = useState<string[]>([])
  const [currentModel, setCurrentModel] = useState<string>('gpt-3.5-turbo')
  const [fullDialogue, setFullDialogue] = useState<any>([])

  const [pagePos, setPagePos] = useState(0)
  const [pagePartPos, setPagePartPos] = useState(0)
  const [selectedPagePos, setSelectedPagePos] = useState(0)

  const [newText, setNewText] = useState<string>('')

  const containerRef = useRef(null)

  // const [localStorageState, setLocalStorageState] = useState<any>({})

  // useEffect(() => {
  //   const keys = Object.keys(localStorage)
  //   console.log({ keys })
  //   const allLocalStorageItems: any = {}

  //   keys.forEach((key) => {
  //     try {
  //       allLocalStorageItems[key] = JSON.parse(localStorage.getItem(key) || '')
  //     }
  //     catch (e) {
  //       allLocalStorageItems[key] = localStorage.getItem(key)
  //     }
  //   })

  //   setLocalStorageState(allLocalStorageItems)
  // }, [])

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

  const final = []
  allPages[0].forEach((page: any, index) => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem(`allPages-${index + 1}`)
      if (storage) {
        if (index === 0) {
          final.push(storage)
        }
      }
      else {
        final.push(page)
      }
    }
  })

  const partUp = () => setPagePartPos((prev: any) => prev - 1)
  const partDown = () => setPagePartPos((prev: any) => prev + 1)

  const isUpDisabled = pagePartPos === 0
  const isDownDisabled = pagePartPos + 1 === final.length

  const selectedText = final[pagePartPos]
  // console.log({ selectedText })
  // console.log({ final })
  return (
    <>
      <ReadINT
        child={{
          replaceExtra:
            <div css={['background: white;']}>
              <button css={[tw`m-2`, tw`border`]} onClick={() => runReplace()}>simplify to n5</button>
              <p>
                new: {newText}
              </p>
            </div>,
          addExtra: <>hi add extra</>,
          translateExtra: <>hi translateExtra </>,
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
            <FormInput {...{ handleSubmit, messageInput, handleEnter: null, isLoading }} />
          </>,
          addContent: <>hi addContent </>,
          replaceContent: <>hi replaceContent </>,
          translate: <>hi translate </>,
          pagesList:
            <>
              <div css={[tw`max-w-full w-full overflow-scroll`, tw`flex flex-row flex-nowrap`, tw`border-2`]}>
                {final.map((item: any, idx: any) => (
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
                {final.map((page: any, index: any) => (

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
              <div css={[tw`absolute right-40`]}>
                <button disabled={isUpDisabled} css={[isUpDisabled ? tw`text-gray` : tw`border`]} onClick={() => partUp()}>
                  go up
                </button>
              </div>
            }
            <div css={[tw`absolute right-20`]}>
              <button disabled={isDownDisabled} css={[isDownDisabled ? tw`text-gray` : tw`border`]} onClick={() => partDown()} >
                go down
              </button>
            </div>
          </>,
        }}
      />
    </>
  )
}
