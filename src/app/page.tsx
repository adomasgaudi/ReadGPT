'use client'

import { useContext, useState } from 'react'
import tw from 'twin.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrush } from '@fortawesome/free-solid-svg-icons'
import { Courses } from './indexComps/Courses'
import { AllNav, Contact, ContactNav, EduNav, ExpNav, Holder, Schools, University, Welcome } from './indexComps/Other'
import { useCssOutline } from './utils/useTools'
import { Snappers } from './css/twinstyles/snapper'
import { Spn } from './indexComps/Parts'
import { Seemsneat } from './indexComps/Seemsneat'
import { Mediapark } from './indexComps/Mediapark'
import { LevelContext } from '@/context/levelContext'

//

//

//

//

//

export default function App() {
  useCssOutline(!true)

  const [paragraph, setParagraph] = useState('all')
  const [nav, setNav] = useState('all')
  const [theme, setTheme] = useContext(LevelContext)

  const toggleTheme = () => {
    setTheme((prevTheme: any) => prevTheme === 'light' ? 'dark' : 'light')
  }

  const states = {
    useParagraph: [paragraph, setParagraph],
    useNav: [nav, setNav],
  }

  return (

    <Snappers.P3>
      <div css={tw`ml-5`}>

        <Spn onClick={toggleTheme} > <FontAwesomeIcon icon={faBrush} /> </Spn>
      </div>
      <div css={tw``}>
        <div css={tw`pt-10`}>
          {paragraph === 'all' && <h1 css={tw`text-4xl mt-20`}>Adomas Gaudiešius</h1>}
          <p>
            {
              [
                { code: 'all', comp: <AllNav {...states} /> },
                { code: 'exp', comp: <ExpNav {...states} /> },
                { code: 'edu', comp: <EduNav {...states} /> },
                { code: 'contact', comp: <ContactNav {...states} /> },

              ].map((item, index) =>
                <div key={index}>{nav === item.code && item.comp}</div>,
              )}

          </p>

          <div css={tw`mt-10`}>
            {
              [
                { code: 'all', comp: <Welcome /> },
                { code: 'seemsneat', comp: <Seemsneat /> },
                { code: 'mediapark', comp: <Mediapark /> },
                { code: 'contact', comp: <Contact /> },
                { code: 'courses', comp: <Courses /> },
                { code: 'university', comp: <University /> },
                { code: 'school', comp: <Schools /> },
              ]
                .map((item, index) =>
                  <Holder key={index}>
                    {paragraph === item.code && <>{item.comp}</>}
                  </Holder>,
                )}

          </div>
        </div>
      </div>
    </Snappers.P3 >
  )
}
