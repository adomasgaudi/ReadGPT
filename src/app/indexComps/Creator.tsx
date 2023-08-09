import tw from 'twin.macro'
import { Attention } from '../chunkyui/WrapComp'
import { H1, H2 } from '../css/twinstyles/twinStyles'

export default function Creator() {
  return (
    <>
      <H1 hero>I am a creator, you can't stop me</H1>
      <H2>Intro</H2>
      <p>I do not want to use css libraries like <a href="" >MUI</a> or bootstrap. I want to write my own css and understand excactly what code does what.</p>
      <p>In this blog I will try to explain my css system. The ideas I propose might seem advanced to a beginner, though the solutions are for some vary basic use cases, so while being difficult is not entirely of no interest to beginners. For people who have a desire to have css under their control, and who unlike me would like to avoid re-learning what they've already learned over and over, for you, carry on.</p>

      <Attention>
        <span css={tw`font-[600] text-xl`}>Assumptions </span><br /> To save some resources this article assumes that you are using the same tech stack as I am and are familiar with the majority of the technologies I use. <br /><span css={tw`font-[600]`}>I use Next.js, which is based on React together with typescript and eslint.</span><br /> I know this is not the only way to code, so you'll have to apply my ideas to your problems creatively.
      </Attention>

      <H2>The settup: Atomic + JS + CSS</H2>
      <p>
        I will be using SASS for my separate css files in which I create mostly general styles for all pages and that I might copy from project to project entirely.
      </p>
      <p>
        For most of the specific styling I will use an Atomic inline css like <a href="">Tailwind</a> but with js capabilities like emotion.js and styled components. This is all accomplished with twin.macro.
      </p>
      <p>I recomend using all of these technologies as they each serve a function that might be difficult to achieve otherwise. This boilerplate / settup complexity in my mind is pays off.</p>
    </>
  )
}
