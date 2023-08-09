import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'
import { H2, fadeStyles } from '../css/twinstyles/twinStyles'
import { AnchorH2, AnchorP, NW, Spn, Spnn } from './Parts'

export const Li = tw.li`ml-4 mb-5`

export const Backward = <FontAwesomeIcon icon={faBackward} />

export const LinkToCreate
  = <Spn>
    <Link href='creator'>
      I am a creator
    </Link>
  </Spn>

export const Holder = ({ children }: any) => <div css={[fadeStyles.fadein, tw`max-w-[800px]`]}>{children}</div>

export const University = () => <>
  <H2>
    <AnchorH2 href='https://www.lboro.ac.uk/'>Loughborough</AnchorH2> · <NW>Materials Engineering</NW> <span css={tw`text-base text-gray-400`}>UK</span>
  </H2>
  <p>

    Studied Materials Engineering for 2 years.
    Then decided to change my studies to Programing and front-end development.
  </p>
</>
export const Schools = () => <>
  <H2>
    <AnchorH2 href='https://www.aisv.lt/'>AISV </AnchorH2> <br /> American Intenational school of vilnius <br />IB programme <span css={tw`text-base text-gray-400`}> 2011 - 2013</span>
  </H2>
  <H2>
    <AnchorH2 href='https://lt.wikipedia.org/wiki/Vilniaus_lic%C4%97jus'>Vilniaus Licėjus</AnchorH2> <span css={tw`text-base text-gray-400`}>2013 - 2015</span>
  </H2>
</>
export const Contact = () => <>
  <H2>Contact Me</H2>
  <p>
    I'm currently looking for new opportunities. If you have a project you think I'd be a good fit for, feel free to contact me.
  </p>
  <p>
    I am currently working from Vilnius, Lithuania, but I am open to other locations as well as remote work.
  </p>
  <p>
    I preffer to be reached by phone call or message +37061609911, but if you must, you can also send me an email adomas.gaudi@gmail.com
  </p>
</>
export const Welcome = () => <>
  <h3>Hey, here's somthing random</h3>
  <p>
    Some of my life realisations this year.
  </p>
  <p>
    <ul>
      <Li>
        - Waren Buffett would've been quite average if he had started investing at 25 and stopped at age 65
      </Li>
      <Li>- You burn about 300g of fat per day if you don't count what you gain by eating</Li>
      <Li>- Climing grades (5a, 7c, 8b ect.) are aplicable to any kind of progression, be it linear, natural or simply intuitive</Li>
      <Li>- 1 out of 5 people has <AnchorP href="https://youtu.be/FQLBnUBKggY?t=102">HSP</AnchorP> (Highly Sensitive Person)</Li>

    </ul>
  </p>
</>

export const ContactNav = ({ useParagraph, useNav }: any) => <>

  {[['all', <>{Backward} Go back </>, 'all']].map((item: any, index: any) =>
    <Spnn selected={useParagraph[0] === item[0]} key={index} onClick={() => {
      useParagraph[1](item[0])
      if (item[2]) {
        useNav[1](item[2])
      }
    }}
    >
      {item[1]}
    </Spnn>,
  )}

</>
export const EduNav = ({ useParagraph, useNav }: any) => {
  const [paragraph, setParagraph] = useParagraph
  const [nav, setNav] = useNav
  return (<>
    {[
      ['all', Backward, 'all'],
      ['courses', 'why i have no degree'],
      ['university', 'university'],
      ['school', 'schools'],
    ].map((item: any, index: any) =>
      <Spnn selected={paragraph === item[0]} key={index} onClick={() => {
        setParagraph(item[0])
        if (item[2]) {
          setNav(item[2])
        }
      }}
      >
        {item[1]}
      </Spnn>)}
  </>)
}
export const ExpNav = ({ useParagraph, useNav }: any) => {
  const [paragraph, setParagraph] = useParagraph
  const [nav, setNav] = useNav
  return (

    <>{
      [
        ['all', Backward, 'all'],
        ['seemsneat', 'seemsneat'],
        ['mediapark', 'mediaprk'],
      ].map((item: any, index: any) =>
        <Spnn selected={paragraph === item[0]} key={index} onClick={() => {
          setParagraph(item[0])
          if (item[2]) {
            setNav(item[2])
          }
        }}
        >
          {item[1]}
        </Spnn>,
      )
    }</>
  )
}
export const AllNav = ({ useParagraph, useNav }: any) => {
  const [paragraph, setParagraph] = useParagraph
  const [nav, setNav] = useNav
  return (

    <>{
      [
        ['seemsneat', 'exp', 'Experience'],
        ['courses', 'edu', 'Education'],
        ['courses', 'create', LinkToCreate],
        ['contact', 'contact', 'Contact'],
      ].map((item: any, index: any) => <>
        {
          typeof item[2] === 'string'
            ? <Spnn selected={paragraph === item[0]} key={index} onClick={() => {
              setParagraph(item[0])
              setNav(item[1])
            }}
            >
              {item[2]}
            </Spnn>
            : <>{item[2]}</>
        }
      </>,
      )
    }</>
  )
}
