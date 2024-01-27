import React from "react"
import { useAppStore } from "~/store"

const Modal = ({ children }) => {
  const { setModal } = useAppStore()
  return (
    <div
      onClick={() => setModal(false, null)}
      className="fixed h-screen w-full min-w-screen overflow-hidden z-50 inset-0 bg-overlay-70 flex items-center justify-center"
    >
      {children}
    </div>
  )
}

export default Modal
