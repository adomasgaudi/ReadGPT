
import ReadLayout from "./ReadLayout";

export default function BookGPT({ text }) {
  return (
    <ReadLayout text={text}
      children={{
        sidebar: <div>hi there sidebar</div>,

      }}
    />
  )
}