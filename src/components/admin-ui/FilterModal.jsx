import React, { useState } from 'react'

function FilterModal({ items, onClose, onSelect }) {
    const [filterText, setFilterText] = useState('');
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(filterText.toLowerCase())
    );
  
    const handleItemClick = (item) => {
      onSelect(item);
      onClose();
    };
  
    return (
      <div className="filter-modal">
        <div className="modal-content">
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <ul>
            {filteredItems.map((item) => (
              <li key={item} onClick={() => handleItemClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  
  export default FilterModal;
