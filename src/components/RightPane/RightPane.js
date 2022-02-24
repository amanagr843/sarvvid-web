import React, { useState, useEffect } from "react";
import "./RightPane.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Chart } from "react-google-charts";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import userGif from "../../assets/gif/user.gif";
import logoutGif from "../../assets/gif/logout.gif";
import upgradeGif from "../../assets/gif/upgrade.gif";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { useSelector } from "react-redux";
import Axios from "axios";

// New
// import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AccountIcon from "../../assets/img/account.svg"
import LogoutIcon from "../../assets/img/logout.svg"


const chartOptions = {
  pieHole: 0.6,
  slices: [
    {
      // color: "#2BB673",
      color: "12adfd",
      // color: "black",
      // color: "#0f0",
      // offset: 0.05,
    },
    {
      color: "#66cfa4",
      // color: "black",
      // color: "#05e395",
      offset: 0.1,
    },
  ],
  legend: {
    position: "none",
  },
  tooltip: {
    showColorCode: true,
  },
  // pieSliceBorderColor: "#343951",
  pieSliceBorderColor: "white",
  chartArea: {
    left: 10,
    top: 20,
    bottom: 10,
    width: "100%",
    height: "90%",
  },
  fontName: "Roboto",
  backgroundColor: "none",
  // title: "Storage",
};
const useUpgradeStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    top: "5%",
    left: "7%",
    width: "66%",
    height: "90%",
    // backgroundColor: "#05e395",
    backgroundColor: "white",
    // backgroundImage: "linear-gradient(to bottom right,#00b3ff, #ecfaff )",
    // border: "2px solid #000",
    // boxShadow: "0 0 20px rgb(0, 195, 255)",
    borderRadius: "1%",
    padding: theme.spacing(2, 4, 3),
    color: "black",
    textAlign: "center",
  },
}));
// const useUpgradeCounterStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//       backgroundColor: "none",
//     },
//   },
// }));
const RightPane = (props) => {
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [userAnim, setUserAnim] = useState(true);
  const [LogoutAnim, setLogoutAnim] = useState(true);
  const classesUpgrade = useUpgradeStyles();
  const current_plan = isNaN(props.b) ? 20 : props.b;
  const fileChange = useSelector((state) => state.fileSystem);



  // useEffect(() => {
  //   Axios(
  //     `https://api.anteagle.tech/api/getdata/?ping=${localStorage.getItem(
  //       "ping"
  //     )}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json, text/plain, */*", // It can be used to overcome cors errors
  //         "Content-Type": "application/json",
  //         Authtoken: localStorage.getItem("authtoken"),
  //       },
  //       data: JSON.stringify({
  //         IMEI: localStorage.getItem("IMEI"),
  //       }),
  //     }
  //   )
  //     .then((res) => {
  //       console.log(res);
  //       props.setA(
  //         ((res.data.current_storage * res.data.filled_per) / 100).toFixed(2)
  //       );
  //       props.setB(res.data.current_storage);
  //       localStorage.setItem(
  //         "used",
  //         isNaN(
  //           ((res.data.current_storage * res.data.filled_per) / 100).toFixed(2)
  //         )
  //           ? 0
  //           : ((res.data.current_storage * res.data.filled_per) / 100).toFixed(
  //               2
  //             ) *
  //               1000 *
  //               1000 *
  //               1000
  //       );
  //       localStorage.setItem(
  //         "total",
  //         isNaN(res.data.current_storage)
  //           ? 20 * 1000 * 1000 * 1000
  //           : res.data.current_storage * 1000 * 1000 * 1000
  //       );
  //     })
  //     .catch(() => {
  //       if (localStorage.getItem("used") == null)
  //         localStorage.setItem("used", 0);
  //       if (localStorage.getItem("total") == null)
  //         localStorage.setItem("total", 20 * 1000 * 1000 * 1000);
  //     });
  // }, [fileChange]);
  let used = isNaN(props.a) ? 100 : (props.a / props.b) * 100;
  let unused = isNaN(props.b) ? 0 : ((props.b - props.a) / props.b) * 100;
  //Logout Functionality Starts
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  let title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  );
  if (props.location.pathname === "/") {
    title = "Welcome";
  }

  // function renderLogout() {
  //   if (props.location.pathname === "/") {
  //     return (
  //       <div className="ml-auto">
  //         <button className="btn btn-danger" onClick={() => handleLogout()}>
  //           Logout
  //         </button>
  //       </div>
  //     );
  //   }
  // }
  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    localStorage.removeItem("authtoken");
    localStorage.removeItem("IMEI");
    localStorage.removeItem("ping");
    localStorage.removeItem("used");
    localStorage.removeItem("total");
    props.history.push("/login");
  }

  // New


  return (
    <div className="rightPane">
      <div className="rightPane_user">
        <div className="user_info">
          <img src={AccountIcon} alt = "account" />
          <div className="user_details" >
            <h3>{localStorage.getItem("user_name")}</h3>
            <h6>{localStorage.getItem("user_number")}</h6>
          </div>
        </div>
        <div
          className="user_logout_div"
          onClick={() => handleLogout()}
        >
          <h3>Logout</h3>
          <img src={LogoutIcon} alt="logout" />

        </div>
      </div>
      <hr />
      <div className="storage_detail">
        <h2 className="storage_detail_heading">Storage</h2>
        <Chart
          width={"100%"}
          height={"250px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Storage Status", "Size"],
            ["Used", 15],
            ["Unused", 20],
          ]}
          options={chartOptions}
          rootProps={{ "data-testid": "1" }}
        />
        <p className="storage_total">
          {isNaN(props.b) ? "NaN" : props.b + " GB"}
        </p>
        <p className="storage_detail_desc">
          {isNaN(props.a) ? "NaN" : props.a} GB of{" "}
          {isNaN(props.b) ? "NaN" : props.b} GB used
        </p>
      </div>
      <button className="storage_button" onClick={() => setOpenUpgrade(true)}>
        Upgrade Storage
      </button>
      <div className="Detail-Modal">
        <Modal
          open={openUpgrade}
          onClose={() => {
            setOpenUpgrade(!openUpgrade);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="upgrade_modal"
        >
          <div className={classesUpgrade.paper}>
            <div className="div_upgrade_heading">
              <h2 id="simple-modal-title" className="upgradeStorageHeading">
                Upgrade Storage
              </h2>
              <hr style={{ borderTop: "1px solid rgba(0,179,255,0.3)" }} />
            </div>
            <div className="upgrade_plans_div">
              <div className="upgrade_plan_div">
                <div className="upgrade_plan_top">
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p className="upgrade_plan_storage">20 GB</p>
                  <p className="upgrade_plan_recommendation">Free</p>
                  <p>&nbsp;</p>
                  {current_plan === 20 ? (
                    <button
                      type="button"
                      className="upgrade_plan_button"
                      disabled={true}
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button type="button" className="upgrade_plan_button">
                      &#8377; 0/month
                    </button>
                  )}
                </div>
                <hr />
                <div className="upgrade_plan_bottom">
                  <p style={{ margin: "2%" }}>Base Plan Includes:</p>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">20 GB storage</span>
                  </div>
                </div>
              </div>

              <div
                className="upgrade_plan_div"
                style={{ border: "5px solid rgb(0, 195, 255)" }}
              >
                <div className="upgrade_plan_top">
                  <p className="upgrade_plan_recommendation">Recommended</p>
                  <p className="upgrade_plan_storage">100 GB</p>
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p>&nbsp;</p>
                  {current_plan === 100 ? (
                    <button
                      type="button"
                      className="upgrade_plan_button"
                      disabled={true}
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={{ color: "white", background: "#00b3ff" }}
                      className="upgrade_plan_button"
                    >
                      &#8377; 130/month
                    </button>
                  )}
                </div>
                <hr />
                <div className="upgrade_plan_bottom">
                  <p style={{ margin: "2%" }}>Advanced Plan Includes:</p>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">100 GB storage</span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Access to Sarvvid experts
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Option to add your family
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Extra member benefits
                    </span>
                  </div>
                </div>
              </div>
              <div className="upgrade_plan_div">
                <div className="upgrade_plan_top">
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p className="upgrade_plan_storage">200 GB</p>
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p>&nbsp;</p>
                  {current_plan === 200 ? (
                    <button
                      type="button"
                      className="upgrade_plan_button"
                      disabled={true}
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button type="button" className="upgrade_plan_button">
                      &#8377; 210/month
                    </button>
                  )}
                </div>
                <hr />
                <div className="upgrade_plan_bottom">
                  <p style={{ margin: "2%" }}>Pro Plan Includes:</p>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">200 GB storage</span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Access to Sarvvid experts
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Option to add your family
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Extra member benefits
                    </span>
                  </div>
                </div>
              </div>

              <div className="upgrade_plan_div">
                <div className="upgrade_plan_top">
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p className="upgrade_plan_storage">500 GB</p>
                  <p className="upgrade_plan_recommendation">&nbsp;</p>
                  <p>&nbsp;</p>
                  {current_plan === 500 ? (
                    <button
                      type="button"
                      className="upgrade_plan_button"
                      disabled={true}
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button type="button" className="upgrade_plan_button">
                      &#8377; 530/month
                    </button>
                  )}
                </div>
                <hr />
                <div className="upgrade_plan_bottom">
                  <p style={{ margin: "2%" }}>Advanced Plan Includes:</p>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">500 GB storage</span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Access to Sarvvid experts
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Option to add your family
                    </span>
                  </div>
                  <div className="upgrade_plan_description">
                    <CheckRoundedIcon className="upgrade_plan_tick" />
                    <span className="upgrade_plan_info">
                      Extra member benefits
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default withRouter(RightPane);
