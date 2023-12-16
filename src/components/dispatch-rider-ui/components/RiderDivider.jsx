import { useMemo } from "react";
import "../style/RiderDivider.css";

const RiderDivider = ({
  dividerDivider,
  dividerIconMaxHeight,
  dividerIconWidth,
  dividerIconPosition,
  dividerIconHeight,
}) => {
  const dividerIconStyle = useMemo(() => {
    return {
      maxHeight: dividerIconMaxHeight,
      width: dividerIconWidth,
      position: dividerIconPosition,
      height: dividerIconHeight,
    };
  }, [
    dividerIconMaxHeight,
    dividerIconWidth,
    dividerIconPosition,
    dividerIconHeight,
  ]);

  return (
    <img
      className="divider-icon"
      alt=""
      src={dividerDivider}
      style={dividerIconStyle}
    />
  );
};

export default RiderDivider;
