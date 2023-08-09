'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faBrush } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import tw from 'twin.macro'
import { Snappers } from '../css/twinstyles/snapper'
import { AnchorH2, Spn, Spnn } from '../indexComps/Parts'
import { LevelContext } from '@/context/levelContext'

const LL = ({ href, children, ...props }: any) => <Link href={href}>{children}</Link>

const Block = tw.div`mb-20`

export default function Creator() {
  const [theme, setTheme] = useContext(LevelContext)
  const toggleTheme = () => {
    setTheme((prevTheme: any) => prevTheme === 'light' ? 'dark' : 'light')
  }
  return (
    <>
      <div css={tw`ml-5`}>

        <Spn onClick={toggleTheme} > <FontAwesomeIcon icon={faBrush} /> </Spn>
      </div>
      <Snappers.MaxW800P3>
        <Spnn>
          <LL href="/"><FontAwesomeIcon icon={faBackward} /> go back</LL><br />
        </Spnn>
        <p>These are some of the things i've created. </p>
        <Block>

          <h2>
            <AnchorH2 href='https://www.npmjs.com/package/chainedcss'>
              ChainedCSS
            </AnchorH2>
          </h2>
          <p>React Inline CSS with Method chaining instead of strings for classes. It copies tailwind style css naming but with objects and methods.</p>
        </Block>
        <Block>

          <h2>
            <AnchorH2 href='https://elaborate-please.netlify.app/'>
              Elaborate-please
            </AnchorH2>
          </h2>
          <p>A ChatGPT powered book reading prototype website. Can be used for simple chat-enhanced reading or for language learning.</p>
        </Block>
        <Block>

          <h2>
            <AnchorH2 href='chunkyui'>
              chunkyui
            </AnchorH2>
          </h2>
          <p>My take on CSS</p>
        </Block>
        <h2>
          <AnchorH2 href='https://submersion.netlify.app/'>
            submersion
          </AnchorH2>
        </h2>
        <p>A language learning blog I made in 2021</p>
        <h2>
          <AnchorH2 href='https://symbiote-project.web.app/'>
            symbiote
          </AnchorH2>
        </h2>
        <p>My try at making a note taking app in 2022</p>
        <h2>
          <AnchorH2 href='https://github.com/adomasgaudi/next-ts-boiler'>
            boiler
          </AnchorH2>
        </h2>
        <p>A boiler plate i use for my websites</p>

      </Snappers.MaxW800P3 >
    </>
  )
}
