"use client"

import { useCallback } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export function useUpdateSearchParams() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const updateSearchParam = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null || value === "") {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router],
  )

  const deleteSearchParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router],
  )

  return { updateSearchParam, deleteSearchParam, searchParams }
}
