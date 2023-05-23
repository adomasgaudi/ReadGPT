import type { FC, ReactNode } from 'react'
import React from 'react'

interface Props {
  children: ReactNode
}

const NegMargin: FC<Props> = ({ children }) => (
  <div>
    <div tw="-my-10">{children}</div>
  </div>
)

export default NegMargin
