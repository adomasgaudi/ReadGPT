import tw from 'twin.macro'
import { AnchorH2, Ghost, IconImg } from './Parts'
import { graphql, muiIcon, reactIcon, tsIcon } from '@/images'

export const Mediapark = () => {
  return (
    <>
      <div css={tw`pb-40`}>
        <Ghost>2023 01</Ghost>
        <h2>
          <AnchorH2 css={tw`p-2`} href='https://mediapark.com/'>Mediapark</AnchorH2> · Front-End dev
        </h2>
        <p>
          <IconImg src={reactIcon} /> React <IconImg src={tsIcon} /> Typescript <IconImg src={graphql} /> GraphQL <IconImg src={muiIcon} /> MUI
        </p>
        <h3 >What I learned in the beginning</h3>
        <p>In my internship I worked with React as a front-end developer. The project used Material UI, typescript, GraphQL, all of which I had to get famliar with to get started.
        </p>
        <p>

          During my 4 months I got accustomed to reading and working with complex code written by many other people among large sections of code that I had no idea how it worked. I had not been used to that as in my personal projects I knew how everything worked intimately.
        </p>
        <p>
          My tasks were mainly simple front-end changes with some data fetching with GraphQL.
        </p>

        <h3>Example task</h3>
        <p>
          To add a table column to an existing table and make sure it shows the correct values, has the right bbuttons and expands and collapses correctl according to the design.
        </p>
      </div>
    </>)
}
