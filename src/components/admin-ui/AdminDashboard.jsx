import { useState, useCallback, useEffect } from "react";
import Option1 from "./Option1";
import PortalPopup from "./PortalPopup";
import "./AdminDashboard.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [isOptionOpen, setOptionOpen] = useState(false);
  const [metrics, setMetrics] = useState("");

  const openOption = useCallback(() => {
    setOptionOpen(true);
  }, []);

  const closeOption = useCallback(() => {
    setOptionOpen(false);
  }, []);

  const bearerToken = JSON.parse(localStorage.getItem("bearerToken"));
console.log(bearerToken)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardMetric = await fetch(`${process.env.REACT_APP_LOGI_TRACK_BASE_URL}/api/v1/admin/dashboard-metrics`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken,
          },
        });
  
        const verifyData = await dashboardMetric.json();
  
        if (verifyData.code === "200") {
          setMetrics(verifyData.data);
        } else {
          toast.error(verifyData.message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [bearerToken]);
  
  const formattedTotalAmountReceived = (metrics.totalAmountReceived || 0).toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
});
  

  return (
    <>
      <div className="dashboard">
        <b className="dashboard-container">Dashboard</b>
        <div className="overview-parent">
          <div className="overview-container">Overview</div>
          <div className="frame-parent-container">
            <div className="frame-wrapper-container">
              <div className="frame-group-container">
                <div className="wrapper-container">
                  <b className="b-element">{formattedTotalAmountReceived}</b>
                </div>
                <div className="total-amount-received-parent-container">
                  <div className="total-amount-received">
                    <p className="amount">Total amount</p>
                    <p className="amount">received</p>
                  </div>
                  <div className="div-container"></div>
                </div>
              </div>
            </div>
            <div className="frame-container-element">
              <div className="wrapper-container">
                <b className="b-element">{metrics.totalNumberOfCustomers}</b>
              </div>
              <div className="total-number-of-customers-container">
                <div className="overview-container">
                  <p className="amount">{`Total Number of `}</p>
                  <p className="amount">Customers</p>
                </div>
                <div className="div-container"></div>
              </div>
            </div>
            <div className="frame-div-element">
              <div className="parent-container">
                <b className="b-element">{metrics.totalNumberOfOrders}</b>
                <img
                  className="vuesaxbulkpeople-icon"
                  alt=""
                  src="/people.svg"
                />
              </div>
              <div className="total-number-of-orders-parent-container">
                <div className="overview-container">
                  <p className="amount">{`Total Number of `}</p>
                  <p className="amount">Orders</p>
                </div>
                <div className="div-container"></div>
              </div>
            </div>
            <div className="frame-parent1-container">
              <div className="parent-container">
                <b className="b-element">{metrics.totalNumberOfNewUnassignedOrders}</b>
                <img
                  className="vuesaxbulkpeople-icon"
                  alt=""
                  src="/people.svg"
                />
              </div>
              <div className="new-orders-unassigned-orders-parent-container">
                <div className="overview-container" style={{
                  display: "flex",
                  width: "205px",
                  alignItems: "flex-start", gap: "0px"
                }}>
                  <p className="amount">{`New Orders/ `}</p>
                  <p className="amount" >Unassigned Orders</p>
                </div>
                <div className="div-container" ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hospital-survey">
          <div className="card-elements-card-fille">
            <div className="card-bg" />
          </div>
          <b className="value-up">50M</b>
          <b className="value-up1">25M</b>
          <b className="value-up2">20M</b>
          <b className="value-up3">15M</b>
          <b className="value-up4">10M</b>
          <b className="value-up5">5M</b>
          <b className="value-up6">0</b>
          <img className="dividers-icon" alt="" src="/divider.svg" />
          <div className="total-revenue-parent">
            <div className="total-revenue">Total Revenue</div>
            <div className="month-parent" onClick={openOption}>
              <div className="month">Month</div>
              <img
                className="iconarrow-down"
                alt=""
                src="/arrow-down.svg"
              />
            </div>
          </div>
          <img className="graphics-icon" alt="" src="/accent-bg.svg" />
          <div className="dates">
            <div className="date">
              <div className="value-down">Jan</div>
              <img
                className="data-pointer-icon"
                alt=""
                src="/data-pointer.svg"
              />
            </div>
            <div className="date1">
              <div className="value-down">Feb</div>
              <img
                className="data-pointer-icon"
                alt=""
                src="/data-pointer1.svg"
              />
            </div>
            <div className="date2">
              <div className="value-down">Mar</div>
              <img
                className="data-pointer-icon2"
                alt=""
                src="/data-pointer2.svg"
              />
            </div>
            <div className="date3">
              <div className="value-down">Apr</div>
              <img
                className="data-pointer-icon3"
                alt=""
                src="/data-pointer3.svg"
              />
            </div>
            <div className="date4">
              <div className="value-down">May</div>
              <img
                className="data-pointer-icon4"
                alt=""
                src="/data-pointer4.svg"
              />
            </div>
            <div className="date5">
              <div className="value-down">Jun</div>
              <img
                className="data-pointer-icon3"
                alt=""
                src="/data-pointer5.svg"
              />
            </div>
            <div className="date6">
              <div className="value-down">July</div>
              <img
                className="data-pointer-icon"
                alt=""
                src="/data-pointer6.svg"
              />
            </div>
            <div className="date7">
              <div className="value-down">Aug</div>
              <img
                className="data-pointer-icon"
                alt=""
                src="/data-pointer7.svg"
              />
            </div>
            <div className="date8">
              <div className="value-down">Sep</div>
              <img
                className="data-pointer-icon2"
                alt=""
                src="/data-pointer8.svg"
              />
            </div>
            <div className="date9">
              <div className="value-down">Oct</div>
              <img
                className="data-pointer-icon4"
                alt=""
                src="/data-pointer9.svg"
              />
            </div>
            <div className="date10">
              <div className="value-down">Nov</div>
              <img
                className="data-pointer-icon3"
                alt=""
                src="/data-pointer10.svg"
              />
            </div>
            <div className="date11">
              <div className="value-down">Dec</div>
              <img
                className="data-pointer-icon4"
                alt=""
                src="/data-pointer11.svg"
              />
            </div>
            <div className="pointer">
              <img className="pointer-icon" alt="" src="/pointer.svg" />
              <div className="circle" />
              <img
                className="cursor-pointing-hand"
                alt=""
                src="/pointing-hand.svg"
              />
              <div className="graphs-elements-helpers">
                <img className="sheet-icon" alt="" src="/sheet.svg" />
                <b className="pointer-value"></b>
              </div>
            </div>
          </div>
        </div>

        <div className="rectangle-parent20">

          <h1 className="innertextd">Daily Performance</h1>
          <div className="inner-rec">
            <img
              className="red"
              alt=""
              src="/ellipse30.svg"
            />
            <img
              className="green"
              alt=""
              src="/ellipse-38.svg"
            />
            <img
              className="blue"
              alt=""
              src="/ellipse34.svg"
            />
            <img
              className="yellow"
              alt=""
              src="/ellipse17.svg"
            />
            <div className="text-holders">
              <h1 className="chart-h"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="#1570EF" />
              </svg>All customers</h1>
              <h1 className="chart-h"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="#34A853" />
              </svg>Rider</h1>
              <h1 className="chart-h"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="#FAC515" />
              </svg>Sign up</h1>
            </div>
            <h1 className="chart-h1" ><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="#F04438" />
            </svg>Failed Orders</h1>

          </div>
        </div>

      </div >
      {isOptionOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOption}
        >
          <Option1 onClose={closeOption} />
        </PortalPopup>
      )
      }
      
    </>
  );
};

export default Dashboard;

