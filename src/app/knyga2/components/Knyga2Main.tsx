'use client'

import { useCssOutline } from "@/app/utils/useTools"
import BookGPT from "./BookGPT"
import { book1 } from "@/app/components/FormLogic"

export default function Knyga2Main() {
  useCssOutline(true)
  return (
    <BookGPT text={book1} />
  )
}