import React, { useEffect, useRef } from "react"
import successImg from "../../static/notif-alert/success.png"

const SuccessCustomAlert = ({ message, onClose }) => {
  const modalContainerRef = useRef(null)

  useEffect(() => {
    const { current: modalContainer } = modalContainerRef
    if (modalContainer) {
      modalContainer.classList.add("scale-100")

      return () => {
        modalContainer.classList.remove("scale-100")
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

      <div
        ref={modalContainerRef}
        className="modal-container bg-white w-96 mx-auto rounded-3xl z-50 border-2
       border-green-500 shadow-2xl shadow-green-500/40 transform scale-0 transition-transform duration-300"
      >
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex flex-col justify-center items-center">
            <img className="w-48" src={successImg} alt="" />

            <label className="text-[27px] font-bold my-3">
              Success ♡⸜(˶˃ ᵕ ˂˶)⸝♡
            </label>
          </div>

          <div className="mt-1 text-center">
            <p className="text-[16px]">{message}</p>
          </div>

          <div className="flex flex-col justify-center items-center mt-4">
            <button
              onClick={onClose}
              className="bg-white w-32 text-blue-500 border-[1px]  border-blue-400 hover:bg-blue-500 
                        flex hover:text-white font-sm py-2 rounded-3xl  shadow-md shadow-blue-500/40
                        transition duration-300 ease-in-out transform hover:scale-105 justify-center"
            >
              <span className="font-semibold text-[14px]">CLOSE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessCustomAlert
