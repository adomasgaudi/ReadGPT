'use client'

import tw from 'twin.macro'
import { fontNotoSerifJp } from '../css/twinstyles/twinStyles'

const RTKBlock = ({ childs }: any) => {
  return (
    <div css={[tw`flex flex-col my-10 border-2 border-blue-100 p-2`]}>
      <div css={[tw`flex justify-between`]}>
        <div>{childs.number} </div>
        <div>{childs.key}</div>
      </div>
      <div css={[tw`flex `]}>
        <div css={[tw`text-6xl`]}>{childs.kanji}</div>
        <div css={[tw`ml-2`]}>{childs.main}</div>
      </div>
      <div>{childs.images}</div>
      <div>{childs.second}</div>
    </div>
  )
}
const P = ({ children }: any) => <p css={[tw`my-10 text-xl`]}>{children}</p>
const H2 = ({ children }: any) => <h2 css={[tw`my-10 text-3xl`]}>{children}</h2>
export default function ReadGPTLogic() {
  return (
    <div css={[tw`max-w-[800px] mx-auto`]}>
      <div css={[tw`container p-[5%]`, fontNotoSerifJp]}>

        <H2>
          Gaudi Japanese Immersion to A1
        </H2>

        <P>
          This e-book は*(wa)、by simply reading it A1 or half-N5 level に(ni) to reach be able to is designed for。
          The senteces は from japanese word for word are translated、as you progress more of words と(to) grammar が(ga) will be added。

          First of ひらがな(hiragana) を(o) to learn、next カタカナ(katakana) を(o)to learn you will need。
          Then、some の(no) basic kanji を to learn、for this の memory techniques を begin to develop。
        </P>

        <P>*1 - sentence marker は(wa)</P>

        <P>Lets start with basic hirgana. There is a great app for learning hiragana and katakana. They are called Hiragana Pro and Katakana Pro. Download them both. I recomend paying for them. Go through the Basic, the Variants and the combinations, until you can answer any combination hiragana question and type the correct answer, not just multiple choice. This should take a few days.
        </P>

        <P>In the mean time I will assume that you have the ability to read hiragana and will continue without every using romaji ever again. You should avoid romaji as well if possible, read japanese with furigana. Furigana is the pronunciation marker text of kanji with hiragana. You can see it as small hiragana or katakana above kanji. </P>

        <P>Lets continue with some basic kanji. We will start with the most basic most popular kanji one: 一,see: 見,say: 言,exit: 出,child: 子,large: 大,think: 思,hand: 手,part: 分, person: 人</P>
        <p>We will take these and learn them using the Remembering the Kanji(RTK) method. The RTK method is good because it teaches you the parts of the kanji, the "Radicals" or primitives, of which there are only 200, unlike the 2000 kanji. By identifying common primitives we will be able to learn kanji by creating stories to help us remember. The RTK is also structured in a way that creates a lot of spaced repetition. We will use that too. To learn our 10 most common kanji, we will learn 30: 一二三四五口日只貝員見子女好如大言話語読思意息手出山岩分人他伝. The repetitive radicals will make it easier to learn the 30 than it would be to just learn the 10.</p>

        <p>So lets get going.
        </p>

        <H2>
          First Kanji
        </H2>

        <RTKBlock childs={
          {
            number: <>1</>,
            key: <>one</>,
            kanji: <>一</>,
            main: <>In Chinese characters, the number one is laid on its side, unlike the Roman numeral I which stands upright. As you would expect, it is written from left to right.</>,
            images: <>--</>,
            second: <>[1] 一 * As a primitive used in other kanji. The single horizontal stroke takes on the meaning of floor or ceiling, depending on its position: if it stands above another primitive, it means ceiling; if below, floor.</>,
          }
        }
        />
        <RTKBlock childs={
          {
            number: <>2</>,
            key: <>two</>,
            kanji: <>二</>,
            main: <>Like the Roman numeral II, which reduplicates the numeral
              i, the kanji for two is a simple reduplication of the horizontal
              stroke that means one. The order of writing goes from above to
              below, with the first stroke slightly shorter.</>,
            images: <>--</>,
            second: <></>,
          }
        }
        />
        <RTKBlock childs={
          {
            number: <>3</>,
            key: <>three</>,
            kanji: <>三 </>,
            main: <>And like the Roman numeral iii, which triples the numeral i,
              the kanji for three simply triples the single horizontal stroke. In
              writing it, think of “1 + 2 = 3” (一 + 二 = 三 ) in order to keep the
              middle stroke shorter. [3]</>,
            images: <>--</>,
            second: <></>,
          }
        }
        />
        <RTKBlock childs={
          {
            number: <>5</>,
            key: <>five </>,
            kanji: <>五</>,
            main: <>Similar to previous numbers the "5" appears to have 5 lines and even somewhat resembles the roman 5, however remember that the stroke count is 4, because one of the lines is bent.</>,
            images: <>--</>,
            second: <></>,
          }
        }
        />

        <P>Congratulations, now much effort invested yet, probably don't even need spaced repetition for this. The first kanji "-" is learned and its acompanying kanji as well. From this point on, the images will be more vivid, and the next kanji will get more complex.
        </P>

        <P>As we progress in our understanding of japanese, we will try to use that knowledge for actually usefull tasks. That might be reading a simplified newspaper in japanese or reading a simplified book. The book might be japanese or it might be western. Whatever most interests you.
        </P>

        <P>The first book that we will read</P>

        <P>The next most popular kanji used is to see: 見 and 口,日, 只,貝,員,見</P>

        <RTKBlock childs={
          {
            number: <>11</>,
            key: <>mouth</>,
            kanji: <>口</>,
            main: <>Like several of the first characters we shall learn, the kanji for
              mouth is a clear pictograph. Since there are no circular shapes
              in the kanji, the square must be used to depict the circle. </>,
            images: <>--</>,
            second: <>As a primitive, this form also means mouth. Any of the range
              of possible images that the word suggests—an opening or
              entrance to a cave, a river, a bottle, or even the largest hole in
              your head—can be used for the primitive meaning</>,
          }
        }
        />
        <RTKBlock childs={
          {
            number: <>RTK 12</>,
            key: <>day</>,
            kanji: <>日</>,
            main: <>This kanji is intended to be a pictograph of the sun. Recalling
              what we said in the previous frame about round forms, it is easy
              to detect the circle and the big smile that characterize our simplest drawings of the sun—like those yellow badges with the
              words, “Have a nice day!” </>,
            images: <>--</>,
            second: <>Used as a primitive, this kanji can mean sun or day or a
              tongue wagging in the mouth. This latter meaning, incidentally, derives from an old character outside the standard list
              meaning something like “sayeth” and written almost exactly
              the same, except that the stroke in the middle does not touch
              the right side (曰, frame 620).</>,
          }
        }
        />
        <RTKBlock childs={
          {
            number: <>Primitive (PR) 1</>,
            key: <>animal legs
            </>,
            kanji: <></>,
            main: <>Like the four that follow it, this primitive is not a kanji in its own
              right, though it is said to be derived from 八, the character we
              learned earlier for eight. It always comes at the bottom of the
              primitive to which it is related. It can mean the legs of any kind
              of animal: from a grizzly bear’s paws to an octopus’s tentacles
              to the spindle shanks of a spider. (The one animal not allowed is
              our friend homo sapiens, whose legs figure in the next frame.)
              Even where the term “legs” will apply metaphorically to the legs
              of pieces of furniture, it is best to keep the association with animal legs. (You may review frame 6 here.) [2]</>,
            images: <>--</>,
            second: <></>,
          }
        }
        />
        <RTKBlock childs={
          {
            number: <>PR 2</>,
            key: <>human legs</>,
            kanji: <></>,
            main: <>Notice how these human legs are somewhat shapelier and more
              highly evolved than those of the so-called “lower animals.” The
              one on the left, drawn first, is straight; while the one on the right
              bends gracefully and ends with a hook. Though they are not
              likely to suggest the legs of any human you know, they do have
              something of the look of someone out for a stroll, especially if
              you compare them to animal legs.
              If you had any trouble with the kanji for the number four, now
              would be the time to return to it (frame 4). [2]</>,
            images: <>--</>,
            second: <></>,
          }
        }
        />
        <RTKBlock childs={
          {
            number: <>RTK 55</>,
            key: <>only</>,
            kanji: <>只</>,
            main: <>When we run across abstract key words like this one, the best
              way to get an image it to recall some common but suggestive
              phrase in which the word appears. For instance, we can think
              of the expression “it’s the only one of its kind.” Then we imagine
              a barker at a side-show advertising some strange pac-man like
              creature he has inside his tent, with only a gigantic mouth and
              two wee animal legs. [5]</>,
            images: <>--</>,
            second: <></>,
          }
        }
        />
        <RTKBlock childs={
          {
            number: <>RTK 56</>,
            key: <>shellfish</>,
            kanji: <>貝 </>,
            main: <>To remember the primitive elements that make up this kanji,
              an eye and animal legs, you might be tempted to think of it as a
              pictograph of a shellfish with its ridged shell at the top and two
              little legs sticking out of the bottom. But that might not help you
              recall later just how many ridges to put on the shell. Better to
              imagine a freakish shellfish with a single, gigantic eye roaming
              the beaches on its slender little legs, scaring the wits out of the
              sunbathers.</>,
            images: <>--</>,
            second: <></>,
          }
        }
        />
        <RTKBlock childs={
          {
            number: <>RTK 59</>,
            key: <>shellfish</>,
            kanji: <>員 </>,
            main: <>How do we get a mouth over a shellfish to mean an employee?
              Simple. Just remember the advice new employees get about
              keeping their mouths shut and doing their job, and then make
              that more graphic by picturing an office building full of whitecollar workers scurrying around with clams pinched to their
              mouths. [10]</>,
            images: <>--</>,
            second: <></>,
          }
        }
        />
        <RTKBlock childs={
          {
            number: <>RTK 61</>,
            key: <>see</>,
            kanji: <>見</>,
            main: <>「見る」の word を constituent elements は目です
              human の leg に firmly と fixed されています。
              体験すると、引きずり出されるのを待っている鮮やかなイメージがあります
              このキャラクターを覚えていただくために…. </>,
            images: <>--</>,
            second: <></>,
          }
        }
        />

        <P>
          <span>OnePunchManOVAEpisode1
          </span>
          <span>

            うわーまさかあいつーにをたというのかクソおいエイリアンはどこだあいつまだの前にやがる
          </span>

        </P>

      </div>
    </div>
  )
}
