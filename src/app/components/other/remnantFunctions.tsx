// function TextOrientate({ vertical, containerRef, text }: any) {
//   const verticalTextStyle = css`-webkit-writing-mode: vertical-rl;
//   -moz-writing-mode: vertical-rl;
//   -ms-writing-mode: vertical-rl;
//   writing-mode: vertical-rl;
//   `
//   // &&::-webkit-scrollbar {
//   //   display: none;
//   // }
//   return (
//     <div ref={containerRef} className="container pt-1 pl-5 text-xl w-full overflow-scroll grow max-h-[380px] " css={[fontNotoSerifJp]}>
//       <p css={[vertical ? verticalTextStyle : '']} lang={vertical ? 'ja' : 'en'}>{divideBySentence(text).join(' ')}</p></div>
//   )
// }

// function divideBySentence(givenText: string) {
//   const sentences = givenText.split(/(。|！|？)/)
//     .filter(sentence => sentence)
//     .map(sentence => sentence.trim())

//   const formattedSentences = []
//   for (let i = 0; i < sentences.length; i += 2)
//     formattedSentences.push(sentences[i] + (sentences[i + 1] || ''))

//   return formattedSentences
// }

// useEffect(() => {
//   if (containerRef.current) {
//     const scrollHeight = containerRef.current.scrollHeight
//     const elementHeight = containerRef.current.offsetHeight
//     const numberOfElements = allPages[pagePos].length

//     const scrollPos = (scrollHeight - elementHeight) / (numberOfElements - 1) * pagePartPos

//     containerRef.current.scrollTo({ top: scrollPos, behavior: 'smooth' })
//   }
// }, [pagePartPos])

// const buttonDownLogic = () => pagePartPos + 1 !== allPages[selectedPagePos].length
//   && <ButtonDownBlock {...{
//     setPagePartPos, setSelectedPagePos, pagePartPos, allPages, selectedPagePos, setIsPagesVisible,
//   }}
//   />
// const buttonUpLogic = () => pagePartPos !== 0
//   && <ButtonUpBlock {...{ setPagePartPos, setSelectedPagePos, pagePartPos }} />




// const ButtonUpBlock = ({ setPagePartPos, pagePartPos, setSelectedPagePos }: any) =>
//   <div css={[tw`absolute top-0 w-full -mb-10 z-10`, ins.center, gradientStyles(180)]} >
//     <button
//       css={[ss.e4, tw`h-[50px] w-[50px]`]}
//       onClick={() => {
//         setPagePartPos((prev: any) => prev - 1)
//         setSelectedPagePos((prev: any) => prev - 1)
//       }}
//       disabled={pagePartPos === 0}
//     >
//       <FontAwesomeIcon icon={faCaretUp} />
//     </button>
//   </div>

// const ButtonDownBlock = ({
//   setPagePartPos, pagePartPos, allPages, selectedPagePos, setSelectedPagePos, setIsPagesVisible,
// }: any) =>
//   <div css={[tw`absolute bottom-10 w-full -mb-10 z-10`, ins.e4, gradientStyles(0)]} >
//     <button css={[tw`w-[50px]`]}>

//     </button>
//     <button
//       css={[ss.e4, ss.e5, tw`w-[50px] m-2`]}
//       onClick={() => {
//         setPagePartPos((prev: any) => prev + 1)
//         setSelectedPagePos((prev: any) => prev + 1)
//       }}
//       disabled={pagePartPos + 1 === allPages[selectedPagePos].length}
//     >
//       <FontAwesomeIcon icon={faCaretDown} />
//     </button>
//     <button css={[tw`w-[50px]`, ss.e5]} onClick={() => setIsPagesVisible((prev: any) => !prev)}>
//       <FontAwesomeIcon icon={faBars} />
//     </button>
//   </div>
