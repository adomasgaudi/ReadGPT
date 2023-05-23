import tw from 'twin.macro'

export const Container = tw.div`container mx-auto`

export const Div_Popup = ({ isPopupShown, ...props }: any) => <div
  {...props}
  css={[
    tw`hidden absolute border min-w-[30px]`,
    isPopupShown && tw`block`,
  ]}
/>

export const Div_FlexRow = tw.div`flex flex-row`
