'use client'
import { useEffect } from 'react'

export function useCssOutline(val: boolean) {
  useEffect(() => {
    let outlineOn = val

    const all = document.querySelectorAll('*')

    if (outlineOn) {
      all.forEach((ele: any) => {
        ele.style.outline = '1px dashed #fbc7c7'
      })
    }
    else {
      all.forEach((ele: any) => {
        ele.style.outline = 'none'
      })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'm') {
        outlineOn = !outlineOn

        if (outlineOn) {
          all.forEach((ele: any) => {
            ele.style.outline = '1px dashed #fbc7c7'
          })
        }
        else {
          all.forEach((ele: any) => {
            ele.style.outline = 'none'
          })
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [val])
}

export function useSquare(id: string) {
  return useEffect(() => {
    const el = document.getElementById(id)
    if (el)
      el.style.height = `${el.offsetWidth}px`
  }, [
  ])
}

export function useWindow(handleScroll: any) {
  return useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [
  ])
}
