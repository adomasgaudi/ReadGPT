import Form from '../components/Form'
import { book1 } from '../components/FormLogic'

export default function Home() {
  return (
    <main >
      <Form text={book1} />
    </main>
  )
}
