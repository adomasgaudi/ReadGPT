'use client'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { fontNotoSerifJp } from '../css/twinstyles/twinStyles'
import type { ModelType } from '../const/GPTLogic/GPTLogicOLD'
import { ClearHistoryButton, FormInput, ModelSelector, runChatGPT, runSimpleGPT } from '../const/GPTLogic/GPTLogicOLD'
import { convertJPToENGPrompt, convertTextToJSONArrayPrompt, separateByCommaPrompt, simplifySentencePrompt } from '../const/prompt'


const Form = ({ text }: any) => {
  const messageInput = useRef<HTMLTextAreaElement | null>(null)
  const [dialogue, setDialogue] = useState<string[]>([])
  const [fullDialogue, setFullDialogue] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [models, setModels] = useState<ModelType[]>([])
  const [currentModel, setCurrentModel] = useState<string>('gpt-3.5-turbo-16k-0613')
  const [translation, setTranslation] = useState<string>('')

  const messageInput2 = useRef<HTMLTextAreaElement | null>(null)
  const [dialogue2, setDialogue2] = useState<string[]>([])
  const [isLoading2, setIsLoading2] = useState<boolean>(false)

  const messageInput3 = useRef<HTMLTextAreaElement | null>(null)
  const [isLoading3, setIsLoading3] = useState<boolean>(false)
  const [newVal, setNewVal] = useState<string>('')

  const [newText, setNewText] = useState<string>('')
  const [switches, setSwitches] = useState<any>(0)

  const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = messageInput2.current?.value

    runChatGPT({
      message: `${convertJPToENGPrompt}${message}\n Response:`,
      dialogue: dialogue2,
      model: currentModel,
      setDialogueFunc: setDialogue2,
      setFullDialogueFunc: false,
      setIsLoadingFunc: setIsLoading2,
      isConversation: false,
    })
    messageInput.current!.value = ''
    //
  }

  const handleSubmit3 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = messageInput3.current?.value

    // Await the first call
    const result1 = await runSimpleGPT(`${separateByCommaPrompt}${message}\n Response:`)
    // console.log(result1.response, 'first');

    // Here, ensure that you are awaiting the response before passing it to the second function
    const awaitedResponse1 = await result1.response

    const result2 = await runSimpleGPT(`${convertTextToJSONArrayPrompt}${awaitedResponse1}\n Response:`)
    // console.log(awaitedResponse1, await result2.response);

    setNewVal(result2.response)
    messageInput.current!.value = ''
  }

  const handleReset = () => {
    localStorage.removeItem('response')
    setDialogue([])
  }

  useSWR('fetchingResponse', async () => {
    const storedResponse = localStorage.getItem('response')
    if (storedResponse) {
      // setResponse(JSON.parse(storedResponse))
      // console.log('storedResponse', storedResponse)
    }
  })

  const fetcher = async () => {
    const models = await (await fetch('/api/models')).json()
    setModels(models.data)
    const modelIndex = models.data.findIndex(
      (model: ModelType) => model.id === 'gpt-3.5-turbo-16k-0613',
    )
    setCurrentModel(models.data[modelIndex].id)
    return models
  }

  useSWR('fetchingModels', fetcher)

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentModel(e.target.value)
  }

  // console.log(text.split('。').filter((item: any) => item.trim() !== ''))
  useEffect(() => {
    const storedResults = localStorage.getItem('textSimplified')

    if (storedResults) {
      const parsedResults = JSON.parse(storedResults)
      // console.log(parsedResults)
      setNewText(parsedResults.join('。'))
      return
    }

    (async () => {
      const bookParts = text.split('。').filter((item: any) => item.trim() !== '')
      const results = []

      for (let i = 0; i < bookParts.length; i++) {
        const result1 = await runSimpleGPT(`${simplifySentencePrompt}${bookParts[i]}\n Response:`)
        const awaitedResponse1 = await result1.response
        results.push(awaitedResponse1)
      }
      // console.log(results)
      setNewText(results.join('。'))
      localStorage.setItem('textSimplified', JSON.stringify(results))
    })()
  }, [])

  return (
    <div className='flex justify-center '>
      <ModelSelector {...{ currentModel, handleModelChange, models }} />
      <ClearHistoryButton {...{ handleReset }} />

      <div className='w-full mx-2 flex flex-col items-start gap-3 pt-6 last:mb-6 md:mx-auto md:max-w-3xl pb-[500px] mt-[100px] text-2xl' css={[fontNotoSerifJp]}>
        <div css={['background: red;']}>

          {isLoading2 && dialogue2.length > 1 && dialogue2.length % 2 == 0
            ? <div>{dialogue2.slice(-1)[0]}</div>
            : dialogue2 && dialogue2.length > 1 && dialogue2.length % 2 == 0
              ? <div>{dialogue2.slice(-1)[0]}</div>
              : null}
        </div>
        <div css={['background: red;', fontNotoSerifJp]}>{switches === 0 ? text : newText}</div>
        <div>

          {isLoading
            ? dialogue.map((item: any, index: number) => {
              return (
                <div
                  key={index}
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
                  >
                    <p>{item}</p>
                  </div>
                )
              })
              : null}
        </div>
      </div>
      <div className='fixed bottom-0 w-full md:max-w-3xl bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] mb-4' css={['background: white;']}>
        <div css={['background: #aaa;']}>
          newVal: {newVal}
        </div>
        <FormInput {...{
          handleSubmit: handleSubmit2,
          messageInput: messageInput2,
          isLoading: isLoading2,
          placeholder: 'convert text',
        }}
        />
        <FormInput {...{
          handleSubmit: handleSubmit3,
          messageInput: messageInput3,
          isLoading: isLoading3,
          placeholder: 'to brackets',
        }}
        />
        <button onClick={() => setSwitches(1)}>switch</button>
      </div>

    </div>
  )
}

export default Form
