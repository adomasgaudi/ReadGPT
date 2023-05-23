import type { FC } from 'react'
import React from 'react'
import NextHead from 'next/head'

interface Props {
  title: string
}

const Head: FC<Props> = ({ title }) => (
  <NextHead>
    <title>{title}</title>
  </NextHead>
)

export default Head
