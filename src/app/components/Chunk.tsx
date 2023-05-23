import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = () => {
  const codeString = `
  .container {
    width: 100%;
  }
  
  $breakpoints: (
    'sm': 640px,
    'md': 768px,
    'lg': 1024px,
    'xl': 1280px,
    '2xl': 1536px
  );
  
  @each $breakpoint, $width in $breakpoints {
    @media (min-width: $width) {
      .container {
        max-width: $width;
      }
    }
  }
  `
  return (
    <SyntaxHighlighter language="css" style={a11yDark}>
      {codeString}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
