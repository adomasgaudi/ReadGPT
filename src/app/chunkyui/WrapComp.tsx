'use client'
import tw from 'twin.macro'
import { useEffect } from 'react'
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCssOutline } from '../utils/useTools'
import { Snappers } from '../css/twinstyles/snapper'
import { H1, H2, PRE, fontEbGaramond } from '../css/twinstyles/twinStyles'

export const useContainerWithoutScrollBar = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
    }
  }, [])
}

export const AuthorTag = () =>
  <p>
    <span css={tw``}> <FontAwesomeIcon icon={faUser} /> </span>Author · Adomas Gaudiesius
  </p>
export const DateTag = (props: any) =>
  <p {...props}>
    <span > <FontAwesomeIcon icon={faCalendar} /> </span>July 12th
  </p>
export const Attention = (props: any) =>
  <p {...props} css={[tw`font-[400] border-l-4 -ml-4 pl-5 pr-2 py-2 mb-5 mt-5 bg-white text-[#777]`]} />

export default function ReadGPTLogic() {
  useCssOutline(!true)
  useContainerWithoutScrollBar()
  return (
    <Snappers.MaxW800P3 cssIn={[tw`pb-[300px]`]}>
      <H1 hero css={tw`mb-2 mt-20`}><span css={tw`bg-[#3ec3af] text-[#36555f]`}>Advanced CSS</span> ideas for basic functions</H1>
      <AuthorTag />
      <DateTag css={tw`mb-14`} />

      {/* // */}

      <H2>Intro</H2>
      <p>I do not want to use css libraries like <a href="" >MUI</a> or bootstrap. I want to write my own css and understand excactly <i>which</i> code does <i>what</i>.</p>
      <p>In this blog I will try to explain my css system. The ideas I propose might seem advanced to a beginner, though the solutions are for some very basic use cases, so while being difficult is not entirely of no interest to beginners. For people who have a desire to have css under their control, and who, unlike me, would like to avoid re-learning what they've already learned over and over, for you, carry on.</p>

      <Attention>
        <h3 css={tw`text-gray-500 mt-2 mb-2`}>Assumptions</h3>
        <p css={tw``}>
          To save some resources in this article it is assumed that you are using the same tech stack as I am and are familiar with the majority of the technologies I use. <br /><span css={tw`font-[600]`}>I use Next.js, which is based on React together with typescript and eslint.</span><br /> I know this is not the only way to code, so you'll have to apply my ideas to your problems creatively.
        </p>
      </Attention>

      <H2>The settup: Atomic + JS + CSS</H2>
      <p>
        I will be using SASS for my separate css files in which I create mostly general styles for all pages and that I might copy from project to project entirely.
      </p>
      <p>
        For most of the specific styling I will use an Atomic inline css like <a href="">Tailwind</a> but with js capabilities like emotion.js and styled components. This is all accomplished with twin.macro.
      </p>
      <p>I recomend using all of these technologies as they each serve a function that might be difficult to achieve otherwise. This boilerplate / settup complexity in my mind pays off.</p>

      {/* // */}

      <H2>Project setup</H2>

      <p>My project uses Next.js v.13.4 which allows the app directory. The API gives you the option to choose the app dir, typescript, eslint and tailwind, which I do choose. I set it up with pnpm, not yarn or npm, though I've found no issues in switching them mid project</p>
      <PRE> <span>{'>>> pnpm create next-app new-next-app '}</span></PRE>
      {/* // */}

      <H2>File structure</H2>

      <p>Here is what my Next project structure looks like, with src and app directory.</p>
      <PRE>{`src >
    app >       // app directory from Next v.13+
    shared >    // shared files that are copied from project to project
`
      }
      </PRE>
      <PRE>
        {`
src >
    app >

        css> 
    sass > 
        // your basic sass files that 
        // you will use in every project
        ...
        ...
        ...
    all.sass
    all.css.map
    all.css
    twinStyles >
        // your twin styles and components
        ...
        ...
        ...
        `}
      </PRE>
      <p>the _FBody :</p>
      <PRE>{`// common body and html styles
* {
  box-sizing: border-box;
}

body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

html {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  scroll-behavior: smooth;
}

body {
  overflow-y: auto;
  overflow-x: hidden;
}

`}</PRE>
      <p>The next thing would be to import tailwind css styles</p>
      <pre>{`@tailwind base
@tailwind components
@tailwind utilities`
      }</pre>
      <p>Before I go further I have to specify that I will use twin.macro, as it solves a lot of the future problems.</p>
      <p>twin might be a bit more difficult to install,</p>
      <H2>Twin</H2>
      <p>Twin will be the solution to most of our problems. What I wanted was to write css with js flexibility, but also not just css but shorter inline css - tailwind. Twin mostly covers these needs.</p>
      <h2>Container ➡️ snapper </h2>
      <p>Lets get into the chunky ui components so that we see why we need twin.</p>
      <p>The "container" in tailwind is a very common wrapper for content, however, it has a few flaws. I think the name is slightly inaccurate as the container is really more fit to be placed within the body or the outter most div. The container snaps. That allows the content to look mostly the same with minimal screen changes. It's inside doesn't change width as much thus it makes the viewing more easy on the eyes and also easier to fix issues. So really its mostly fit for only in one place and its main feature is snapping, so I re-named it "Snapper"</p>
      <H2>next</H2>
      <p>You will want some basic styles for your h1 and p tags and so on. </p>
    </Snappers.MaxW800P3>
  )
}
