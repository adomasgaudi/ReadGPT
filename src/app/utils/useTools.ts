'use client'
import { useEffect } from 'react'

export function useCssOutline(val: boolean) {
  return useEffect(() => {
    const all = document.querySelectorAll('*')
    if (val) {
      all.forEach((ele: any) => {
        ele.style.outline = '1px dashed #fbc7c7'
      })
    }
    document.addEventListener('keypress', (e) => {
      if (e.key === 'm') {
        all.forEach((ele: any) => {
          ele.style.outline = '1px dashed #fbc7c7'
        })
      }
      if (e.key === 'n') {
        all.forEach((ele: any) => {
          ele.style.outline = 'none'
        })
      }
    })
  }, [
  ])
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
