import React from "react"

import addDataimg from "../../static/farmer/addData.png"

import editimg from "../../static/farmer/edit.png"

function AddRecipientModal({
  isOpen,
  toggleModal,
  selectedItems,
  filteredData,
  handleSelectAllChange,
  handleCheckboxChange,
  searchQuery,
  setSearchQuery,
  handleItemHover,
  handleItemLeave,
  selectAll, // Pass selectAll as a prop
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

      <div className="modal-container bg-white  w-[500px]  mx-auto rounded-3xl shadow-lg z-50 p-6">
        <div className="modal-content ">
          <div className="flex justify-center">
            <div className="w-12">
              <img src={addDataimg} alt="" />
            </div>

            <span className="text-center text-xl font-medium mt-3 ml-2">
              Add Recipient
            </span>
          </div>

          <div className="flex flex-col">
            <div className="mt-4 flex">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
                className=" border rounded border-gray-400 mr-2
                  focus:outline-none"
                required
              />
              <label className="text-sm font-semibold text-black">
                Select All
              </label>
            </div>

            <div className="mt-1">
              <input
                type="text"
                placeholder="Search by name"
                className="w-full border rounded px-3 py-2 mt-1 border-gray-400
                  focus:outline-none focus:ring focus:border-blue-300"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-2">
            <label className=" font-semibold text-black">
              List of Recipient
            </label>

            <div className="px-6 pt-2 border mt-2 overflow-auto h-80">
              {filteredData.map((item, index) => (
                <label
                  key={index}
                  className="block mb-2"
                  onMouseEnter={() => handleItemHover(item)}
                  onMouseLeave={handleItemLeave}
                >
                  <input
                    type="checkbox"
                    value={index}
                    onChange={handleCheckboxChange}
                    checked={selectedItems.includes(
                      `${item.first_name} ${item.last_name}`
                    )}
                    className="mr-2"
                  />
                  <span className="inline-block relative">{`${item.first_name} ${item.last_name}`}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center mt-4 ml-2">
            <button
              type="button"
              onClick={toggleModal}
              className="bg-white text-blue-500 border-[1px]  border-blue-400 hover:bg-blue-500 
                        flex hover:text-white font-sm py-2 px-4 pr-2 rounded-3xl  mr-2 shadow-md shadow-blue-500/40
                        transition duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="font-semibold text-[14px] mt-[1.5px] ml-44">
                CLOSE
              </span>
              <img className="w-6 ml-36" src={editimg} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRecipientModal
