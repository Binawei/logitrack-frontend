import { useMemo } from "react";
import "../style/TexttrueStateDefaultChec.css";

const TexttrueStateDefaultChec = ({
  checkboxBase,
  showText,
  texttrueStateDefaultChecPosition,
  texttrueStateDefaultChecTop,
  texttrueStateDefaultChecLeft,
}) => {
  const texttrueStateDefaultChecStyle = useMemo(() => {
    return {
      position: texttrueStateDefaultChecPosition,
      top: texttrueStateDefaultChecTop,
      left: texttrueStateDefaultChecLeft,
    };
  }, [
    texttrueStateDefaultChecPosition,
    texttrueStateDefaultChecTop,
    texttrueStateDefaultChecLeft,
  ]);

  return (
    <div
      className="texttrue-statedefault-chec"
      style={texttrueStateDefaultChecStyle}
    >
      <img className="checkbox-base-icon" alt="" src={checkboxBase} />
      {showText && <div className="text">Text</div>}
    </div>
  );
};

export default TexttrueStateDefaultChec;
