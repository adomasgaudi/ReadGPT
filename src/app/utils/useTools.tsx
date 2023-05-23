import { useEffect } from 'react'

export function useCssOutline() {
  return useEffect(() => {
    document.addEventListener('keypress', (e) => {
      if (e.key === 'm') {
        const all = document.querySelectorAll('*')
        all.forEach((ele: HTMLElement) => {
          ele.style.outline = '1px dashed #fbc7c7'
        })
      }
      if (e.key === 'n') {
        const all = document.querySelectorAll('*')
        all.forEach((ele: HTMLElement) => {
          ele.style.outline = 'none'
        })
      }
    })
  }, [])
}

export function useSquare(id: string) {
  return useEffect(() => {
    const el = document.getElementById(id)
    if (el)
      el.style.height = `${el.offsetWidth}px`
  }, [])
}

export function useWindow(handleScroll: any) {
  return useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
