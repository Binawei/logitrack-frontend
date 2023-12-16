import "./CalculatePrice.css";


const PaymentProcess = () => {

  return (
    <div className="create-orderform-cp">
      <img className="loading-icon-cp" alt="" src="/loading.gif" />
      <div className="calculating-price-based-on-wei-wrapper-cp">
        <b className="calculating-price-based-cp">
          Your Payment is Been Processed
        </b>
      </div>
      <div className="buttondefault-wrapper-cp">
        <div className="buttondefault-cp">
          <img className="key-alt-icon-cp" alt="" src="/keyalt.svg" />
          <div className="text-cp">Please wait</div>
          <img className="key-alt-icon-cp" alt="" src="/iconadd.svg" />
        </div>
      </div>
    </div>
  );
};

export default PaymentProcess;
