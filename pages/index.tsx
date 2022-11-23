import { useState, useEffect } from 'react'
import styles from './index.module.css'

export default function Index({ jokes }: any) {
  const [currentJokes, setCurrentJokes] = useState(null)
  useEffect(() => {
    const random = Math.floor(Math.random() * jokes.length)
    setCurrentJokes(jokes[random].body)
  }, [jokes])

  const getJokes = () => {
    const random = Math.floor(Math.random() * jokes.length)
    setCurrentJokes(jokes[random].body)
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>Random Jokes Generator</div>
      <div className={styles.jokesBox}>{currentJokes}</div>
      <button className={styles.jokesButton} onClick={getJokes} type="button">Get Random Jokes</button>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments')
  const jokes = await res.json()
  return {
    props: {
      jokes,
    },
  }
}
