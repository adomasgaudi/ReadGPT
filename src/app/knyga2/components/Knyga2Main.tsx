'use client'

import { useCssOutline } from "@/app/utils/useTools"
import BookGPT from "./BookGPT"
import { ChakraProvider } from "@chakra-ui/react"
import { 悪魔の弟子 } from "./text"

export default function Knyga2Main() {
  useCssOutline(false)
  return (
    <ChakraProvider>
      <BookGPT text={悪魔の弟子} />
    </ChakraProvider>
  )
}
