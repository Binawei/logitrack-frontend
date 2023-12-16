import "../css/PriceCalculation.css";
// import img from "../assets/keyalt.svg";
import loading from "../assets/loading@2x.png";

const PriceCalculation = () => {
  return (
    <div className="create-orderform">
      <img className="loading-icon" alt="" src={loading} />
      <div className="calculating-price-based-on-wei-wrapper">
        <b className="calculating-price-based">
          Calculating Price based on weight
        </b>
      </div>
      <div className="buttondefault-wrapper">
        <div className="buttondefault">
          <div className="text">Please wait</div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculation;
