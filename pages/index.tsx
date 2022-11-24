import {
  useState, useEffect, useMemo, useCallback,
} from 'react'
import styles from './index.module.css'

export default function Index({ jokes }: any) {
  const [currentJokes, setCurrentJokes] = useState('Welcome to Random Jokes Generator, Click below to get a random jokes.')
  const history: any = useMemo(() => [], [])
  const popedHistory: any = useMemo(() => [], [])

  const handleKeyDown = useCallback((e: any) => {
    if (e.ctrlKey && e.code === 'KeyZ') {
      if (history.length) {
        const array = [...history]
        setCurrentJokes(array.pop())
        popedHistory.push(currentJokes)
        history.pop()
      }
    } else if (e.ctrlKey && e.code === 'KeyY') {
      if (popedHistory.length) {
        const array = [...popedHistory]
        setCurrentJokes(array.pop())
        popedHistory.pop()
        history.push(currentJokes)
      }
    }
  }, [currentJokes, history, popedHistory])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, history, jokes])

  const getJokes = () => {
    const random = Math.floor(Math.random() * jokes.length)
    setCurrentJokes(jokes[random].body)
    history.push(currentJokes)
    popedHistory.splice(0, popedHistory.length)
  }

  const undo = (e: any) => {
    if (history.length) {
      if (e.code === 'Enter' || e.code === 'Space' || e.button === 0) {
        const array = [...history]
        setCurrentJokes(array.pop())
        popedHistory.push(currentJokes)
        history.pop()
      }
    }
  }

  const redo = (e: any) => {
    if (popedHistory.length) {
      if (e.code === 'Enter' || e.code === 'Space' || e.button === 0) {
        const array = [...popedHistory]
        setCurrentJokes(array.pop())
        popedHistory.pop()
        history.push(currentJokes)
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>Random Jokes Generator</div>
      <div className={styles.jokesBox}>{currentJokes}</div>
      <div className={styles.buttonGroup}>
        <button className={styles.jokesButton} onClick={getJokes} type="button">Get Random Jokes</button>
        <div className={styles.historyButton}>
          <div
            className={styles.undoButton}
            style={{
              opacity: history.length ? '100%' : '50%',
              cursor: history.length ? 'pointer' : 'default',
            }}
            onClick={undo}
            onKeyDown={undo}
            tabIndex={history.length ? 0 : -1}
            role="button"
            title="Undo (Ctrl+Z)"
          >
            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          </div>
          <div
            className={styles.redoButton}
            style={{
              opacity: popedHistory.length ? '100%' : '50%',
              cursor: popedHistory.length ? 'pointer' : 'default',
            }}
            onClick={redo}
            onKeyDown={redo}
            tabIndex={popedHistory.length ? 0 : -1}
            role="button"
            title="Redo (Ctrl+Y)"
          >
            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
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
