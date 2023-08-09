import tw from 'twin.macro'
import { AnchorH2, AnchorP, Ghost, IconImg, NW } from './Parts'
import { laravel, mysql, php, reactIcon, tsIcon } from '@/images'

export const Seemsneat = () => {
  return (
    <div css={tw`max-w-[800px]`}>
      <div css={tw`pb-40`}>
        <Ghost>2023 01</Ghost>
        <h2>
          <AnchorH2 href='https://seemsneat.com/'>Seemsneat</AnchorH2> · <NW>Full-Stack dev</NW> · 8 mon
        </h2>
        <p>
          <IconImg src={reactIcon} />
          <IconImg src={tsIcon} />
          <IconImg src={php} />
          <IconImg src={laravel} />
          <IconImg src={mysql} />
        </p>
        <p>I worked on a social app designed for thousands of users to chat and share their experiences. A complex project by itself, not to mention the scaling challenges in the later months when the project came closer to its end.</p>
        <h3 css={tw`inline-block`}>What I learned in the beginning</h3>
        <span css={tw`text-base font-[500] text-[#777]`}>
          <NW> <IconImg src={reactIcon} /> React Native </NW> <NW> <IconImg src={tsIcon} /> Typescript </NW>
        </span>
        <p>The project's front-end was built on a <AnchorP href="https://reactnative.dev/">React Native</AnchorP> platform - <AnchorP href="https://expo.dev/">expo</AnchorP>, together with typescript and tailwind. I was only familiar with React at the time, so it was an adjustment to transition to React Native. I worked mostly on fixing bugs and adding new pages and so on.
        </p>
        <h3 css={tw`inline-block`}>Later Months</h3>
        <span css={tw`text-base font-[500] text-[#777] m-5`}>
          <NW> <IconImg src={php} /> PHP </NW> <NW> <IconImg src={laravel} /> Larvel</NW> <NW> <IconImg src={mysql} /> MySQL</NW>
        </span>
        <p>
          In the later months I also learned more about how the back-end worked and transitioned to also work on modifying the existing <AnchorP href="https://laravel.com/">Laravel</AnchorP>  controlers and models as needed for my front-end task functionality.
        </p>

        <p>
          I also stumbled upon the <AnchorP href="https://www.amazon.com/Scrum-Doing-Twice-Work-Half/dp/038534645X">"Scrum"</AnchorP> book, as per the company's suggestion. Soon it became my guiding encylopedia of productivity, a topic I have spend many hours in the past investigating.
        </p>

        <h3>Example task</h3>
        <p>
          My tasks were often a mix of front-end and back-end development, though in the beginning I would ask for a lot of help with PHP. An example task would be creating a carousel (based off of a <AnchorP href="https://www.figma.com/">Figma</AnchorP> design) with buttons that edit a users profile membership and then making sure that the whole mysql database is altered accordingly, as well as checking all of the pages within the application to make sure that all of the related values change correctly as a user's membership might implicate a lot of other parts in the app.
        </p>
      </div>
    </div>
  )
}
