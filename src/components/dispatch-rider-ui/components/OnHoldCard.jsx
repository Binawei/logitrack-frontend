import { useState, useCallback } from "react";
import Option1 from "./Option1";
import PortalPopup from "./PortalPopup";
import Darkmodefalse from "./Darkmodefalse";
import TexttrueStateDefaultChec from "./TexttrueStateDefaultChec";
import "../style/OnHoldCard.css";

const OnHoldCard = () => {
  const [isOptionOpen, setOptionOpen] = useState(false);
  const [isOption1Open, setOption1Open] = useState(false);
  const [isOption2Open, setOption2Open] = useState(false);
  const [isOption3Open, setOption3Open] = useState(false);

  const openOption = useCallback(() => {
    setOptionOpen(true);
  }, []);

  const closeOption = useCallback(() => {
    setOptionOpen(false);
  }, []);

  const openOption1 = useCallback(() => {
    setOption1Open(true);
  }, []);

  const closeOption1 = useCallback(() => {
    setOption1Open(false);
  }, []);

  const openOption2 = useCallback(() => {
    setOption2Open(true);
  }, []);

  const closeOption2 = useCallback(() => {
    setOption2Open(false);
  }, []);

  const openOption3 = useCallback(() => {
    setOption3Open(true);
  }, []);

  const closeOption3 = useCallback(() => {
    setOption3Open(false);
  }, []);

  return (
    <>
      <div className="divider-parent">
        <Darkmodefalse
          darkmodefalseBackgroundColor="1px solid #d0d5dd"
          darkmodefalseWidth="991px"
          darkmodefalsePosition="absolute"
          darkmodefalseTop="58px"
          darkmodefalseLeft="0px"
        />
        <Darkmodefalse
          darkmodefalseBackgroundColor="1px solid #d0d5dd"
          darkmodefalseWidth="991px"
          darkmodefalsePosition="absolute"
          darkmodefalseTop="208px"
          darkmodefalseLeft="0px"
        />
        <Darkmodefalse
          darkmodefalseBackgroundColor="1px solid #d0d5dd"
          darkmodefalseWidth="991px"
          darkmodefalsePosition="absolute"
          darkmodefalseTop="133px"
          darkmodefalseLeft="0px"
        />
        <Darkmodefalse
          darkmodefalseBackgroundColor="1px solid #d0d5dd"
          darkmodefalseWidth="991px"
          darkmodefalsePosition="absolute"
          darkmodefalseTop="283px"
          darkmodefalseLeft="0px"
        />
        <div className="selectioncheckbox-group">
          <TexttrueStateDefaultChec
            checkboxBase="/checkbox-base.svg"
            showText={false}
            texttrueStateDefaultChecPosition="absolute"
            texttrueStateDefaultChecTop="10px"
            texttrueStateDefaultChecLeft="0px"
          />
          <div className="en35487362">EN35487362</div>
          <div className="div">9087665432</div>
          <div className="div1">4/6/2023</div>
          <div className="div2">8/7/2023</div>
          <div className="frame-parent3-rd">
            <div className="select-wrapper">
              <div className="select">Select</div>
            </div>
            <img className="iconarrow-down1" alt="" src="/arrow-down.svg" />
            <div className="share">Share</div>
          </div>
          <div className="frame-parent4f">
            <div className="select-wrapper">
              <div className="select">In progress</div>
            </div>
            <img
              className="iconarrow-down1"
              alt=""
              src="/arrow-down.svg"
            />
            <div className="share">Share</div>
          </div>
          <img
            className="dots-vertical-icon1"
            alt=""
            src="/dots-vertical.svg"
            onClick={openOption}
          />
        </div>
        <div className="selectioncheckbox-container">
          <TexttrueStateDefaultChec
            checkboxBase="/checkbox-base.svg"
            showText={false}
            texttrueStateDefaultChecPosition="absolute"
            texttrueStateDefaultChecTop="10px"
            texttrueStateDefaultChecLeft="0px"
          />
          <div className="en35487362">EN35487362</div>
          <div className="div">9087665432</div>
          <div className="div1">4/6/2023</div>
          <div className="div2">8/7/2023</div>
          <div className="iconarrow-down-parent">
            <img
              className="iconarrow-down1"
              alt=""
              src="/arrow-down.svg"
            />
            <div className="share2">Share</div>
          </div>
          <div className="frame-parent5-rd">
            <div className="select-wrapper">
              <div className="select">On Hold</div>
            </div>
            <img
              className="iconarrow-down1"
              alt=""
              src="/arrow-down.svg"
            />
            <div className="share">Share</div>
          </div>
          <img
            className="dots-vertical-icon1"
            alt=""
            src="/dots-vertical.svg"
            onClick={openOption1}
          />
        </div>
        <div className="selectioncheckbox-parent1">
          <TexttrueStateDefaultChec
            checkboxBase="/checkbox-base.svg"
            showText={false}
            texttrueStateDefaultChecPosition="absolute"
            texttrueStateDefaultChecTop="10px"
            texttrueStateDefaultChecLeft="0px"
          />
          <div className="en35487362">EN35487362</div>
          <div className="div">9087665432</div>
          <div className="div1">4/6/2023</div>
          <div className="div2">8/7/2023</div>
          <div className="iconarrow-down-parent">
            <img
              className="iconarrow-down1"
              alt=""
              src="/arrow-down.svg"
            />
            <div className="share2">Share</div>
          </div>
          <div className="frame-parent5-rd">
            <div className="select-wrapper">
              <div className="select">On Hold</div>
            </div>
            <img
              className="iconarrow-down1"
              alt=""
              src="/arrow-down.svg"
            />
            <div className="share">Share</div>
          </div>
          <img
            className="dots-vertical-icon1"
            alt=""
            src="/dots-vertical.svg"
            onClick={openOption2}
          />
        </div>
        <div className="selectioncheckbox-parent2">
          <TexttrueStateDefaultChec
            checkboxBase="/checkbox-base.svg"
            showText={false}
            texttrueStateDefaultChecPosition="absolute"
            texttrueStateDefaultChecTop="10px"
            texttrueStateDefaultChecLeft="0px"
          />
          <div className="en35487362">EN35487362</div>
          <div className="div">9087665432</div>
          <div className="div1">4/6/2023</div>
          <div className="div2">8/7/2023</div>
          <div className="iconarrow-down-parent">
            <img
              className="iconarrow-down1"
              alt=""
              src="/arrow-down.svg"
            />
            <div className="share2">Share</div>
          </div>
          <div className="frame-parent5-rd">
            <div className="select-wrapper">
              <div className="select">On Hold</div>
            </div>
            <img
              className="iconarrow-down1"
              alt=""
              src="/arrow-down.svg"
            />
            <div className="share">Share</div>
          </div>
          <img
            className="dots-vertical-icon1"
            alt=""
            src="/dots-vertical.svg"
            onClick={openOption3}
          />
        </div>
      </div>
      {isOptionOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOption}
        >
          <Option1 onClose={closeOption} />
        </PortalPopup>
      )}
      {isOption1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOption1}
        >
          <Option1 onClose={closeOption1} />
        </PortalPopup>
      )}
      {isOption2Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOption2}
        >
          <Option1 onClose={closeOption2} />
        </PortalPopup>
      )}
      {isOption3Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOption3}
        >
          <Option1 onClose={closeOption3} />
        </PortalPopup>
      )}
    </>
  );
};

export default OnHoldCard;
