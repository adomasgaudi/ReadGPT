'use client'
import { useEffect, useState } from "react";
import ReadLayout from "./ReadLayout";

export default function BookGPT({ text }: any) {
  const [height, setHeight] = useState('90vh')
  useEffect(() => {
    const resizeListener = () => {
      setHeight(`${window.innerHeight}px`)
    }
    resizeListener()
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])
  return (
    <div className="h-[100vh]" style={{ height }}>
      < ReadLayout text={text}
        children={{
          sidebar: <div>hi there sidebar</div>
        }}
      />
    </div>
  )
}