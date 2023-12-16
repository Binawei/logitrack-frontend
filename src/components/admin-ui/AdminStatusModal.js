import React from 'react';

function AdminStatusModal({ onStatusChange, topPosition, orderId, onStatusSelect }) {
  const generalStatus = {
    width: "112px",
    padding: "10px",
    alignItems: "flex-end",
    backgroundColor: 'var(--White, #FFF)',
    borderRadius: '8px',
    boxShadow: "0px 6px 16px 0px rgba(0, 0, 0, 0.16)",
    position: "absolute",
    top: topPosition,
    left: 1170,
    zIndex: 300,
    flexShrink: 3,
    border: "1px solid #ccc",
  };

  const optionStatus = {
    width: '97px',
    color: 'var(--Main-Text, #101828)',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '20px',
    cursor: 'pointer',
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(newStatus);
    console.log("Selected status in AdminStatusModal:", newStatus);
    onStatusSelect(newStatus);
  };

  return (
    <div style={generalStatus}>
      <p onClick={() => handleStatusChange('IN_PROGRESS')} style={optionStatus}>
      IN_PROGRESS
      </p>
      <p onClick={() => handleStatusChange('SUCCESSFUL')} style={optionStatus}>
      SUCCESSFUL
      </p>
      <p onClick={() => handleStatusChange('FAILED')} style={optionStatus}>
      FAILED
      </p>
      <p onClick={() => handleStatusChange('DELIVERED')} style={optionStatus}>
      DELIVERED
      </p>
      <p onClick={() => handleStatusChange('PICKED_UP')} style={optionStatus}>
      PICKED_UP
      </p>
    </div>
  );
}

export default AdminStatusModal;
