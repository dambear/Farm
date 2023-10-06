import React from "react"

function DataPanelModal({
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
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Data Panel (Modal)</p>
            <button className="modal-close" onClick={toggleModal}>
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M10.293 9l3.646-3.646a1 1 0 10-1.414-1.414L9.88 7.293 6.234 3.646a1 1 0 10-1.414 1.414L8.466 9l-3.647 3.646a1 1 0 001.414 1.414L9.88 10.706l3.646 3.647a1 1 0 001.414-1.414L10.293 9z" />
              </svg>
            </button>
          </div>

          <label className="block mb-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
            <span className="inline-block relative">Select All</span>
          </label>
          <input
            type="text"
            placeholder="Search by name"
            className="w-full border rounded p-2 mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
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
      </div>
    </div>
  )
}

export default DataPanelModal
