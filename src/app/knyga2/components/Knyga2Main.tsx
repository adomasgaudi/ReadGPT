'use client'

import { useCssOutline } from "@/app/utils/useTools"
import BookGPT from "./BookGPT"
import { book1 } from "@/app/components/FormLogic"
import { ChakraProvider } from "@chakra-ui/react"

export default function Knyga2Main() {
  useCssOutline(false)
  return (
    <ChakraProvider>
      <BookGPT text={book1} />
    </ChakraProvider>
  )
}
