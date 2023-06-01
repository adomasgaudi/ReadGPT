'use client'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { fontNotoSerifJp } from '../css/twinStyles'
import { ClearHistoryButton, FormInput, ModelSelector, ModelType, book1, runChatGPT, runSimpleGPT } from './FormLogic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

const convertJPToENGPrompt = `Task: convert japanese into english
    Prompt: 悪魔
    Response: Devil
    Prompt: 悪魔の弟子
    Response: Devil's Disciple
    Prompt: 浜尾四郎
    Response: Shiro Hamao
    Prompt: 目次
    Response: Table of Contents
    Prompt: `

const convertTextToJSONArrayPrompt = `Task: convert text to json
    Prompt: 未決, 囚徒, たる, 私,、, 即ち, 島浦, 英三, は,、, 其の, 旧友, に, して, 嘗かつて, は, 兄弟, より, 親しかりし, 土田, 検事, 殿, に,、, 此の, 手紙, を, 送ります
    Response: [
      {"word": "未決", "level": "N1"},
      {"word": "囚徒", "level": "N1"},
      {"word": "たる", "level": "N1"},
      {"word": "私", "level": "N5"},
      {"word": "即ち", "level": "N1"},
      {"word": "島浦", "level": "N1"},
      {"word": "英三", "level": "N1"},
      {"word": "は", "level": "N5"},
      {"word": "其の", "level": "N1"},
      {"word": "旧友", "level": "N1"},
      {"word": "にして", "level": "N1"},
      {"word": "嘗", "level": "N1"},
      {"word": "かつて", "level": "N2"},
      {"word": "は", "level": "N5"},
      {"word": "兄弟", "level": "N3"},
      {"word": "より", "level": "N4"},
      {"word": "親しかりし", "level": "N1"},
      {"word": "土田", "level": "N1"},
      {"word": "検事", "level": "N1"},
      {"word": "殿に", "level": "N1"},
      {"word": "此の", "level": "N1"},
      {"word": "手紙", "level": "N3"},
      {"word": "を", "level": "N5"},
      {"word": "送ります", "level": "N3"}
    ]
    Prompt: 悪魔の弟子
    Response: [
      {"word": "悪魔", "level": "N2"},
      {"word": "の", "level": "N5"},
      {"word": "弟子", "level": "N2"}
    ]
    Prompt: `

const separateByCommaPrompt = `Task: separate these japanese words by comma, also separating the punctuation
    Prompt: 悪魔の弟子 浜尾四郎 +目次 一 
    Response: 悪魔,の,弟子, 浜尾,四郎, +,目次, 一"
    Prompt: 未決囚徒たる私、即ち島浦英三は、其の旧友にして嘗かつては兄弟より親しかりし土田検事殿に、此の手紙を送ります
    Response: 未決, 囚徒, たる, 私,、, 即ち, 島浦, 英三, は,、, 其の, 旧友, に, して, 嘗かつて, は, 兄弟, より, 親しかりし, 土田, 検事, 殿, に,、, 此の, 手紙, を, 送ります
    Prompt: `
const simplifySentencePrompt = `Task: simplify this japanese sentence into an easier one, n5 level, for beginners
    Prompt: 検事殿、あなたは私を無論思い出して居おらるる事でしょうね
    Response: 検事さん、あなたは私を覚えていますね
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
      <span className='mr-4'>
        {selection}: {response}
      </span>

      <button onClick={() => handleButtonClick(selection)}>
        <FontAwesomeIcon icon={faBook} />
      </button>
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

  const messageInput3 = useRef<HTMLTextAreaElement | null>(null)
  const [dialogue3, setDialogue3] = useState<string[]>([])
  const [isLoading3, setIsLoading3] = useState<boolean>(false)
  const [newVal, setNewVal] = useState<string>('')

  const [newText, setNewText] = useState<string>('')
  const [switches, setSwitches] = useState<any>(0)

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

  const handleSubmit3 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = messageInput3.current?.value;

    // Await the first call
    const result1 = await runSimpleGPT(`${separateByCommaPrompt}${message}\n Response:`);
    // console.log(result1.response, 'first');

    // Here, ensure that you are awaiting the response before passing it to the second function
    const awaitedResponse1 = await result1.response;

    const result2 = await runSimpleGPT(`${convertTextToJSONArrayPrompt}${awaitedResponse1}\n Response:`);
    // console.log(awaitedResponse1, await result2.response);

    setNewVal(result2.response)
    messageInput.current!.value = '';
  };


  const handleButtonClick = async (text: any) => {
    const { response, isLoading } = await runSimpleGPT(`${convertJPToENGPrompt}${text}\n Response:`)
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

  console.log(book1.split('。').filter(item => item.trim() !== ''))
  useEffect(() => {
    const storedResults = localStorage.getItem('textSimplified');

    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      console.log(parsedResults);
      setNewText(parsedResults.join('。'));
      return;
    }

    (async () => {
      const bookParts = book1.split('。').filter(item => item.trim() !== '');
      const results = [];

      for (let i = 0; i < bookParts.length; i++) {
        const result1 = await runSimpleGPT(`${simplifySentencePrompt}${bookParts[i]}\n Response:`);
        const awaitedResponse1 = await result1.response;
        results.push(awaitedResponse1);
      }
      console.log(results);
      setNewText(results.join('。'));
      localStorage.setItem('textSimplified', JSON.stringify(results));
    })();
  }, []);



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
        <div css={[fontNotoSerifJp]}>{switches === 0 ? book1 : newText}</div>
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
      <div className='fixed bottom-0 w-full md:max-w-3xl bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] mb-4' css={[`background: white;`]}>
        <div css={[`background: #aaa;`]}>
          newVal: {newVal}
        </div>
        <FormInput {...{ handleSubmit, messageInput, handleEnter, isLoading }} />
        <FormInput {...{
          handleSubmit: handleSubmit2,
          messageInput: messageInput2,
          isLoading: isLoading2,
          placeholder: 'convert text',
        }} />
        <FormInput {...{
          handleSubmit: handleSubmit3,
          messageInput: messageInput3,
          isLoading: isLoading3,
          placeholder: 'to brackets'
        }} />
        <button onClick={() => setSwitches(1)}>switch</button>
      </div>
      <SelectedTextPopup {...{ handleButtonClick, returnResp: translation }} />

    </div>
  )
}

export default Form
