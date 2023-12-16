import React from 'react'
import AdminAssignTo from './AdminAssignTo';
function AssignContent() {
    const [isAssignToVisible, setIsAssignToVisible] = useState(false);
  const [results, setResults] = useState([]); // State to manage results
  const toggleAssignTo = () => {
    setIsAssignToVisible(!isAssignToVisible);
  };
  return (
    <div>     
      Assign
      <RiArrowDropDownLine
        className={`drop-down-icon ${isAssignToVisible ? 'active' : ''}`}
        onClick={toggleAssignTo}
      />
      {isAssignToVisible && <AdminAssignTo setResults={setResults} />}
    </div>
  )
}

export default AssignContent
