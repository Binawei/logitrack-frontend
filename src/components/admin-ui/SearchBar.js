import React, {useState} from 'react'
import {GrSearch} from 'react-icons/gr'
import '../../css/SearchBar.css'
import FilterModal from './FilterModal';


function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>

      {isModalOpen && (
        <FilterModal
          items={items}
          onClose={closeModal}
          onSelect={handleItemSelect}
        />
      )}
      {selectedItem && <p>Selected Item: {selectedItem}</p>}
    </div>
  );
}
export default SearchBar
