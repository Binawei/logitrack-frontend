import React from 'react'

function AdminOptionsModal() {
  const containerStyle = {
    display: "flex",
width: "112px",
padding: "8px",
flexDirection: "column",
alignItems: "flex-start",
backgroundColor: 'var(--White, #FFF)', 
borderRadius: '4px',
boxShadow: "0px 6px 16px 0px rgba(0, 0, 0, 0.16)"
  }


  const optionStyle = {
    width: "97px",
    color: "var(--Main-Text, #101828)",

fontFamily: "Inter",
fontSize: "14px",
fontStyle: "normal",
fontWeight: "400",
lineHeight: "20px" /* 142.857% */
  };
  return (
    <div style={containerStyle}>
      <p style={optionStyle}>View</p>
      <p style={optionStyle}>Track</p>
    </div>
  )
}

export default AdminOptionsModal
