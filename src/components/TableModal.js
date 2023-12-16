import React from 'react';
import '../css/tablemodal.css';
import { useNavigate } from 'react-router-dom';

function TableModal({ id, onDeleteOrder }) {
  const navigate = useNavigate();

  const onTrackClick = () => {
    navigate('/user-track', { state: { id } });
  };

  const handleDeleteOrder = () => {
    onDeleteOrder(id);
  };


  return (
    <div className="generalmodal">
      <p onClick={onTrackClick} style={{ cursor: 'pointer' }}>
        Track
      </p>
      <p onClick={handleDeleteOrder} style={{ cursor: 'pointer' }}>Delete</p>
    </div>
  );
}

export default TableModal;
