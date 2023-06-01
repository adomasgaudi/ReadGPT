'use client'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { fontNotoSerifJp } from '../css/twinStyles'
import { ClearHistoryButton, FormInput, ModelSelector, ModelType, book1, runChatGPT, runSimpleGPT } from './FormLogic'

const convertJPToENGPrompt = `Task: convert japanese into enligh
    Prompt: 悪魔
    Response: Devil
    Prompt: 悪魔の弟子
    Response: Devil's Disciple
    Prompt: 浜尾四郎
    Response: Shiro Hamao
    Prompt: 目次
    Response: Table of Contents
    Prompt: `

const SelectedTextPopup = ({ handleButtonClick, returnResp }: any) => {
  const [selection, setSelection] = useState('');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [response, setResponse] = useState<string | null>(null);  // Add this state for storing the response
  const popupRef = useRef(null);

  useEffect(() => {
    setResponse(returnResp)
  }, [returnResp])

  useEffect(() => {
    const handleTextSelection = () => {
      const selectedText = window.getSelection()?.toString();
      if (selectedText) {
        setSelection(selectedText);
        const range = window.getSelection()?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        if (rect) {
          setCoords({ x: rect.left, y: rect.top - 40 }); // Adjust y position to show above the selected text
        }
      } else {
        setSelection('');
      }
    };

    document.addEventListener('mouseup', handleTextSelection);
    return () => document.removeEventListener('mouseup', handleTextSelection);
  }, []);

  useEffect(() => {
    const popup = popupRef.current;
    if (popup) {
      popup.style!.left = `${coords.x}px`;
      popup.style!.top = `${coords.y}px`;
    }
  }, [coords, popupRef]);


  if (!selection) return null;

  return (
    <div
      ref={popupRef}
      style={{ position: 'fixed', background: 'white', border: '1px solid black', padding: '10px' }}
    >
      {selection} = {response}
      <button onClick={() => handleButtonClick(selection)}>Translate</button>
    </div>
  );
};

const Form = () => {
  const messageInput = useRef<HTMLTextAreaElement | null>(null)
  const [dialogue, setDialogue] = useState<string[]>([])
  const [fullDialogue, setFullDialogue] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [models, setModels] = useState<ModelType[]>([])
  const [currentModel, setCurrentModel] = useState<string>('gpt-3.5-turbo')
  const [translation, setTranslation] = useState<string>('')

  const messageInput2 = useRef<HTMLTextAreaElement | null>(null)
  const [dialogue2, setDialogue2] = useState<string[]>([])
  const [isLoading2, setIsLoading2] = useState<boolean>(false)

  const handleEnter = (
    e: React.KeyboardEvent<HTMLTextAreaElement> &
      React.FormEvent<HTMLFormElement>,
  ) => {
    if (e.key === 'Enter' && isLoading === false) {
      e.preventDefault()
      setIsLoading(true)
      handleSubmit(e)
    }
  }

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

  const handleButtonClick = async (text: any) => {
    const { response, isLoading } = await runSimpleGPT('say hi')
    setTranslation(response)
  }
  const returnResp = 'hi'

  const handleReset = () => {
    localStorage.removeItem('response')
    setDialogue([])
  }

  useSWR('fetchingResponse', async () => {
    const storedResponse = localStorage.getItem('response')
    if (storedResponse) {
      // setResponse(JSON.parse(storedResponse))
      console.log('storedResponse', storedResponse)
    }
  })

  const fetcher = async () => {
    const models = await (await fetch('/api/models')).json()
    setModels(models.data)
    const modelIndex = models.data.findIndex(
      (model: ModelType) => model.id === 'gpt-3.5-turbo',
    )
    setCurrentModel(models.data[modelIndex].id)
    return models
  }

  useSWR('fetchingModels', fetcher)

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentModel(e.target.value)
  }

  return (
    <div className='flex justify-center '>
      <ModelSelector {...{ currentModel, handleModelChange, models }} />
      <ClearHistoryButton {...{ handleReset }} />

      <div className='w-full mx-2 flex flex-col items-start gap-3 pt-6 last:mb-6 md:mx-auto md:max-w-3xl pb-[500px] mt-[100px] text-2xl' css={[fontNotoSerifJp]}>
        <div>

          {isLoading2 && dialogue2.length > 1 && dialogue2.length % 2 == 0
            ? <div>{dialogue2.slice(-1)[0]}</div>
            : dialogue2 && dialogue2.length > 1 && dialogue2.length % 2 == 0
              ? <div>{dialogue2.slice(-1)[0]}</div>
              : null}
        </div>
        <div css={[fontNotoSerifJp]}>{book1}</div>
        <div>

          {isLoading
            ? dialogue.map((item: any, index: number) => {
              return (
                <div
                  key={index}>
                  <p>{item}</p>
                </div>
              )
            })
            : dialogue
              ? dialogue.map((item: string, index: number) => {
                return (
                  <div
                    key={index}>
                    <p>{item}</p>
                  </div>
                )
              })
              : null}
        </div>
      </div>
      <div className='fixed bottom-0 w-full md:max-w-3xl bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] mb-4'>

        <FormInput {...{ handleSubmit, messageInput, handleEnter, isLoading }} />
        <FormInput {...{
          handleSubmit: handleSubmit2,
          messageInput: messageInput2,
          handleEnter: null,
          isLoading: isLoading2,
          placeholder: 'convert text',
        }} />
      </div>
      trans: {translation}
      <SelectedTextPopup {...{ handleButtonClick, returnResp: translation }} />

    </div>
  )
}

export default Form
