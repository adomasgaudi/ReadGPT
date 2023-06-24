'use client'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'

export default function SelectedTextPopup({ handleButtonClick, returnResp }: any) {
  const [selection, setSelection] = useState('')
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [response, setResponse] = useState<string | null>(null)
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
      style={{ position: 'fixed', background: 'white', border: '1px solid black', padding: '10px', zIndex: 20 }}
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
