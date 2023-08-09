import Image from 'next/image'
import tw from 'twin.macro'
import { HoverBoard } from '../css/twinstyles/twinStyles'

export const IconImg = ({ src, ...props }: any) => <Image
  {...props}
  src={src}
  css={[tw`w-5 h-5 inline -translate-y-0.5 ml-2`]}
  alt=""
/>

export const AnchorH2 = ({ children, href, ...props }: any) =>
  <HoverBoard bg='#3ec3af' initH={10} initW={60} range={50}>
    <a href={href} target="_blank" {...props}>
      {children}
    </a>
  </HoverBoard>

export const AnchorP = ({ children, href }: any) =>
  <HoverBoard
    bg='#3ec3af44'
    initH={10}
    initW={100}
    range={20}
  >
    <a href={href} target="_blank" >
      {children}
    </a>
  </HoverBoard>

export const NW = ({ children }: any) => <span css={tw`whitespace-nowrap`}>{children}</span>

export const Ghost = ({ children }: any) => <span css={tw`absolute text-8xl font-bold -z-20 outline-1 text-[var(--ghost)] -translate-y-16 whitespace-nowrap pointer-events-none select-none`}>{children}</span>

export const Spn = tw.button`mr-4 mt-2 text-[#777] cursor-pointer hover:text-[#329d8d] transition duration-500 p-[1px] px-2 `

export const Spnn = ({ selected, ...props }: any) => <Spn {...props} css={[selected && tw`border border-[#3ec3af] `]} />
