import React, { useState } from 'react';
import '../../css/adminAssignTo.css';
import { FaSearch } from 'react-icons/fa';

function AdminAssignTo({ visible, items, onItemClick }) {
  const [searchInput, setSearchInput] = useState('');
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleItemClick = (item) => {
    onItemClick(item);
  };

  return (
    <div className="App-general">
      <div className={`assign-to-modal ${visible ? 'visible' : ''}`}>
        <div className="search-field">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            id="input-search"
          />
        </div>
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminAssignTo;
