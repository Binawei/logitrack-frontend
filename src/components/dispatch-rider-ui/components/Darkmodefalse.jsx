import { useMemo } from "react";
import "../style/Darkmodefalse.css";

const Darkmodefalse = ({
  darkmodefalseBackgroundColor,
  darkmodefalseWidth,
  darkmodefalsePosition,
  darkmodefalseTop,
  darkmodefalseLeft,
}) => {
  const darkmodefalseStyle = useMemo(() => {
    return {
      backgroundColor: darkmodefalseBackgroundColor,
      width: darkmodefalseWidth,
      position: darkmodefalsePosition,
      top: darkmodefalseTop,
      left: darkmodefalseLeft,
    };
  }, [
    darkmodefalseBackgroundColor,
    darkmodefalseWidth,
    darkmodefalsePosition,
    darkmodefalseTop,
    darkmodefalseLeft,
  ]);

  return <div className="darkmodefalse" style={darkmodefalseStyle} />;
};

export default Darkmodefalse;
