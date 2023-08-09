import tw from 'twin.macro'
import { snapper } from './twinStyles'
import { merge } from './utils'

export const Snapper = ({ cssOut, cssIn, cssPad, ...props }: any) => {
  return (
    <main css={[...[cssOut || []]]} {...props}>
      <div css={[...[cssPad || []]]} {...props.propsPad}>
        <div css={[...[cssIn || []]]} {...props.propsIn}>{props.children}</div>
      </div>
    </main>
  )
}

const SnapperBase = merge(Snapper, {
  cssOut: [snapper, tw`xl:w-[1124px] mx-auto`],
})

const P5 = merge(SnapperBase, {
  cssPad: [tw`px-[5%]`],
})
const P3 = merge(SnapperBase, {
  cssPad: [tw`px-2 md:px-[3%]`],
})
const H800p3 = merge(SnapperBase, {
  cssOut: [tw`min-h-[800px]`],
  cssPad: [tw`px-2 md:px-[3%]`],
})
const Brilliant = merge(SnapperBase, {
  cssOut: [tw`min-h-[800px]`],
  cssPad: [tw`px-2 sm:px-[15%] md:px-[20%] lg:px-[22%] xl:px-[24%] `],
  cssIn: [tw`flex flex-wrap`],
})
const BrilliantBlock = merge(SnapperBase, {
  cssOut: [tw`min-h-[800px]`],
  cssPad: [tw`px-2 sm:px-[15%] md:px-[20%] lg:px-[22%] xl:px-[24%] `],
  cssIn: [tw``],
})
const MaxW800P3 = merge(SnapperBase, {
  cssOut: [tw`max-w-[800px]`],
  cssPad: [tw`px-2 md:px-[3%]`],
  cssIn: [tw``],
})

export const Snappers = {
  P3,
  P5,
  H800p3,
  Brilliant,
  BrilliantBlock,
  MaxW800P3,
}
