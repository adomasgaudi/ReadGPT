'use client'
import { useRef, useState } from "react";
import tw, { css } from "twin.macro";
import { fontNotoSerifJp } from "@/app/css/twinStyles";
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex } from "@chakra-ui/react";


function divideBySentence(text) {
  // Split text by "。", "！", "？", and map over the results to trim whitespace and add the punctuation back
  let sentences = text.split(/(。|！|？)/)
    .filter(sentence => sentence)
    .map(sentence => sentence.trim());

  // Combine every two elements into a single sentence (since split creates an element for the punctuation as well)
  let formattedSentences = [];
  for (let i = 0; i < sentences.length; i += 2) {
    formattedSentences.push(sentences[i] + (sentences[i + 1] || ''));
  }

  return formattedSentences;
}


export default function BookGPT({ text }: any) {
  const containerRef = useRef(null);

  // State for slider value
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <Flex>
      <Box flex="1" pr="0">
        <div ref={containerRef} className="container pt-5 pl-5 text-xl" css={[fontNotoSerifJp]}>{divideBySentence(text).join(" ")}</div>
      </Box>
      <Box width="30px">
        <Slider
          aria-label="slider-ex-4"
          orientation="vertical"
          defaultValue={30}
          onChange={(val) => setSliderValue(val)}
          height="300px"
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="tomato" as="span">
              {sliderValue}
            </Box>
          </SliderThumb>
        </Slider>
      </Box>
    </Flex>
  );
}