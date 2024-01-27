import React from "react"
import { useLocation } from "react-router-dom"
import { useAppStore } from "~/store"

const TimGhep = () => {
  const location = useLocation()
  const { catalogs } = useAppStore()
  return (
    <main className="w-full bg-white lg:w-main px-4 py-4 mx-auto">
      <h1 className="text-3xl font-semibold mt-6">
        {catalogs?.find((el) => "/" + el.slug === location.pathname)?.text}
      </h1>
      <span className="text-base line-clamp-2 block my-4">
        {
          catalogs?.find((el) => "/" + el.slug === location.pathname)
            ?.description
        }
      </span>
      <div>content</div>
    </main>
  )
}

export default TimGhep
