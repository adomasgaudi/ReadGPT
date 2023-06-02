// @ts-expect-error
import tw, { styled } from 'twin.macro'

// const hoverStyles = css`
//   &:hover {
//     border-color: black;
//     ${tw`text-black`}
//   }
// `
// export const Input = ({ media, ...props }: any) => (
//   <div css={[
//     tw`border`, hoverStyles,
//   ]} {...props}/>
// )

// const xlBreakPoint = (content: any) => css`
//   @media (min-width: ${theme`screens.xl`}) {
//     ${content}
//   }
// `

// const Component = () => (
//   <div css={ xlBreakPoint(`${tw`block`} color: red;`)} />
// )

// export const Container = tw.div`container mx-auto`

// export const Div_Popup = ({ isPopupShown, ...props }: any) => <div
//   {...props}
//   css={[
//     tw`hidden absolute border min-w-[30px]`,
//     isPopupShown && tw`block`,
//   ]}
// />

// export const Div_FlexRow = tw.div`flex flex-row`

export const Container = tw.div`container`
export const Div_HScreen = tw.div`h-[100vh]`
export const In = tw.div`h-full`

export const In_WHalf = styled.div`
  ${tw`h-full md:w-[50%]`}
  flex-grow: 1;
`
export const In_Center = tw.div`h-full flex justify-center items-center`
