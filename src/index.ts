import { useState, useEffect, useCallback } from 'react'

type Listener = (nextTitle: string) => void

let listenerList: Listener[] = []

const subscribe = (listener: Listener): void => {
  listenerList.push(listener)
}

const unsubscribe = (listener: Listener): void => {
  listenerList = listenerList.filter(currentListener => currentListener !== listener)
}

const notify = (nextTitle: string, exceptListener: Listener): void => {
  listenerList.forEach(listener => {
    listener !== exceptListener && listener(nextTitle)
  })
}

export const useDocumentTitle = (initialTitle?: string | (() => string)): [string, (title: string) => void] => {
  const listener: Listener = useCallback((nextTitle: string) => setCurrentTitle(nextTitle), [])
  const [currentTitle, setCurrentTitle] = useState<string>(() => {
    subscribe(listener)
    if (initialTitle !== undefined) {
      const nextTitle = typeof initialTitle === 'string' ? initialTitle : initialTitle()
      window.document.title = nextTitle
      notify(nextTitle, listener)
    }
    return window.document.title
  })

  const updateCurrentTitle = (nextTitle: string): void => {
    window.document.title = nextTitle
    setCurrentTitle(nextTitle)
    notify(nextTitle, listener)
  }

  const disposeListener = () => () => unsubscribe(listener)
  useEffect(disposeListener, [])

  return [currentTitle, updateCurrentTitle]
}
