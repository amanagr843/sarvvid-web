import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import md5 from "md5";
import sarvvid from "../../assets/img/sarvvid.png";
import loginbg from "../../assets/img/loginbg.png";
import QRCode from "react-qr-code";
import Backdrop from "@material-ui/core/Backdrop";
import QRC from "./QRC/QRC.js";
import Navbar from "../Navbar/Navbar";
import logo from '../../assets/img/sarvvid-logo.svg'

// NEW ONES

import { v4 as uuid } from 'uuid';
import {sha256} from "js-sha256"
import { setEntry } from "../../actions/fileSystem";
import { Modal } from "@material-ui/core";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';


const crypto = require("crypto");
const platform = require("platform");
const browser = platform.name + platform.version;
// console.log(browser);
const QRvalue = JSON.stringify({
  "browser-name": browser,
  timestamp: new Date(),
});
// const Hash = JSON.stringify({
//   hash: crypto.createHash("sha256").update(QRvalue).digest("hex"),
// });
const Hash = crypto.createHash("sha256").update(QRvalue).digest("hex");
// console.log(Hash);
function LoginForm(props) {



  const [state, setState] = useState({
    email: "",
    authtoken: "",
    piid: "",
    successMessage: null,
  });
  const [err, showerr] = useState(false);
  const [aerr, showautherr] = useState(false);
  const [dis, setdis] = useState(false);
  // const [QR, setQR] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  // const handleQRCode = () => {
  //   setQR(!QR);
  // };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };
    console.log(state.email);
    console.log(state.authtoken);
    console.log(state.piid);
    if (state.authtoken.trim() == "" || state.piid.trim() == "") {
      showerr(true);
      showautherr(false);
    } else if (state.authtoken.length < 40 || state.authtoken.length > 40) {
      showautherr(true);
      showerr(false);
    } else {
      showautherr(false);
      showerr(false);
      localStorage.setItem("authtoken", state.authtoken);
      localStorage.setItem("ping", state.piid);
      localStorage.setItem("IMEI", state.email);
      axios
        .post(
          `https://api.sarvvid-ai.com/login?IMEI=${state.email}&ping=${state.piid}`,
          {
            Accept: "application/json, text/plain, */*",
            Authtoken: state.authtoken, // It can be used to overcome cors errors
            "Content-Type": "application/json",
          }
        )
        .then(function (response) {
          console.log(response.data);
          if (response.data.code === 200) {
            const temp = response.data.data;
            var new_data = JSON.parse(localStorage.getItem("fileSystem"));
            var newEntry = {};
            newEntry.name = "SarvvidBox";
            newEntry.type = "__folder__";
            newEntry.creatorName = "";
            newEntry.size = 0;
            newEntry.path = "/SarvvidBox";
            newEntry.parentPath = "/";
            newEntry.children = [];
            newEntry.date = "";
            newEntry.parentID = md5("/" + "__folder__");
            const id_1 = md5("/SarvvidBox" + "__folder__");
            new_data[id_1] = newEntry;
            let i = 0;
            for (i = 0; i < temp.length; i++) {
              var newEntry_1 = {};
              newEntry_1.name = temp[i];
              newEntry_1.type = "__file__";
              newEntry_1.creatorName = "";
              newEntry_1.size = 0;
              newEntry_1.path = "/SarvvidBox/" + temp[i];
              newEntry_1.parentPath = "/SarvvidBox";
              newEntry_1.parentID = md5("/SarvvidBox" + "__folder__");
              newEntry_1.date = "";
              new_data[md5("/SarvvidBox/" + temp[i] + "__file__")] = newEntry_1;
              new_data[md5("/SarvvidBox" + "__folder__")].children.push(
                md5("/SarvvidBox/" + temp[i] + "__file__")
              );
            }
            console.log(new_data);
            localStorage.setItem("fileSystem", JSON.stringify(new_data));
            console.log("dfuysdgfuysdgfuysdgfsdfsdyfsyfds HI I am IN");
            setState((prevState) => ({
              ...prevState,
              successMessage: "Login successful. Redirecting to home page..",
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, 1);
            redirectToHome();
            props.showError(null);
          } else if (response.code === 204) {
            props.showError("Username and password do not match");
          } else {
            props.showError("Username does not exists");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };

  //EXTREAS
  // const getData = async() => {
  //   try{
  //     const resp = axios.post(`https://api.sarvvid-ai.com/weblogin?email=${userEmail}`)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // NEW ONES

  // ENC key
  let SCHT = {'0':'92a2', '1':'0f11', '2':'0cf1', '3':'6955', '4':'7779', '5':'e171', '6':'0b6a', '7':'751a', '8':'713f', '9':'c939', 'A':'73c5', 'B':'d832', 'C':'d6d3', 'D':'d289', 'E':'a703', 'F':'603f', 'G':'77d8', 'H':'4fc8', 'I':'85d1', 'J':'de77', 'K':'8788', 'L':'3042', 'M':'48d5', 'N':'1c41', 'O':'c396', 'P':'84f8', 'Q':'f40c', 'R':'c78e', 'S':'3494', 'T':'089f', 'U':'c19a', 'V':'a66f', 'W':'41df', 'X':'a82f', 'Y':'9723', 'Z':'b7c0'};
  let key = '541DBC699AD251F68C3C55A86C147CFD7C6D2E90BE9E170507B153560C8A65AAAFB2BB839B16F9DED96A41FE15406FEC0116BFDD7BCF7F27B827F2E047E8196DDF03E3A7C6364FD6626041CB8B8133051D969DC67E7ED6EF0944DE6A0BC96443225EE15C60AC49C17EEFA5AF3E54FECB19FD1573BF94C9D5198DB816FC814EF3';
  let enc = '';
  let i=0;
  for(i=0;i<key.length;i++){
    enc += SCHT[key.slice(i,i+1)]
  }

  // States
  const [loginOpened, setLoginOpened] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userPass, setUserPass] = useState("")
  const [userPh, setUserPh] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [userCPass, setUserCPass] = useState("")
  

  // Functions

  // forgot password

  const forgotPassHandler = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios({
        method: "post",
        url: "http://103.155.73.35:3000/forgetpassword",
        data: {
          email: userEmail
        }
      })

      console.log( "forgot pass resp...",  resp)

      if(resp.data.code == 404){
        alert(`No user found width this email ${userEmail}`)
      } else if(resp.data.code == 200){
        alert(`check you mail to update password at ${userEmail}`)
      }

      setModalOpen(false)

    } catch (error) {
      console.log(error)
    }


  }
  
  // register through sarvvid-web

  const registerWeb = async (e) => {

    e.preventDefault()
    
    try{
      console.log("register started...")

      console.log("user Pass...", userPass)
      console.log("user Mail...", userEmail)
      console.log("user Phone...", userPh)

      const userId = sha256(userEmail).slice(0,24);
      console.log("user ID...", userId)

      const resp = await axios({
                      method: 'post',
                      url: `http://103.155.73.35:3000/webregister`,
                      headers: {"authtoken": enc}, 
                      data: {
                        email: userEmail,
                        password: userPass,
                        phone: userPh,
                        uniqueID: userId
                      }
                    });
      
      const msresp = await axios({
        method: "get",
        url: `http://103.155.73.35:3000/ms?ms=${130}&IMEI=${userId}`})



      console.log("signup resp...", resp)

      if(resp.status === 200){
        
        console.log("Signed up successfully")
        console.log("file sytem...", resp.data.filesys)

        localStorage.setItem("IMEI", resp.data.IMEI);
        localStorage.setItem("authtoken", resp.data.authtoken);
        localStorage.setItem("ping", 130);
        localStorage.setItem("user_name", resp.data.username);
        localStorage.setItem("user_number", resp.data.phone);

        
        const temp = resp.data.data;

        let new_fileSystem = resp.data.filesys;
        localStorage.setItem("fileSystem", JSON.stringify(new_fileSystem))
        var new_data = JSON.parse(localStorage.getItem("fileSystem"));
        var newEntry = {};
        newEntry.name = "SarvvidBox";
        newEntry.type = "__folder__";
        newEntry.creatorName = "";
        newEntry.size = 0;
        newEntry.path = "/SarvvidBox";
        newEntry.parentPath = "/";
        newEntry.children = [];
        newEntry.date = "";
        newEntry.parentID = md5("/" + "__folder__");
        const id_1 = md5("/SarvvidBox" + "__folder__");
        new_data[id_1] = newEntry;
        let i = 0;
        for (i = 0; i < temp.length; i++) {
          var newEntry_1 = {};
          newEntry_1.name = temp[i];
          newEntry_1.type = "__file__";
          newEntry_1.creatorName = "";
          newEntry_1.size = 0;
          newEntry_1.path = "/SarvvidBox/" + temp[i];
          newEntry_1.parentPath = "/SarvvidBox";
          newEntry_1.parentID = md5("/SarvvidBox" + "__folder__");
          newEntry_1.date = "";
          new_data[md5("/SarvvidBox/" + temp[i] + "__file__")] = newEntry_1;
          new_data[md5("/SarvvidBox" + "__folder__")].children.push(
            md5("/SarvvidBox/" + temp[i] + "__file__")
          );
        }
        console.log( "new data...", new_data);
        if (new_fileSystem.length > 2) {
          localStorage.setItem("fileSystem", new_fileSystem);
          // setEntry(JSON.parse(new_fileSystem));
        } else {
          localStorage.setItem("fileSystem", JSON.stringify(new_data));
          // setEntry(new_data);
        }

        axios(
            `http://103.155.73.35:3000/getdata?ping=${localStorage.getItem(
              "ping"
            )}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json, text/plain, */*", // It can be used to overcome cors errors
                "Content-Type": "application/json",
                Authtoken: localStorage.getItem("authtoken"),
              },
              data: JSON.stringify({
                IMEI: localStorage.getItem("IMEI"),
              }),
            }
          ).then((res) => {
                console.log( "getdata...", res);
                props.setA(
                  ((res.data.current_storage * res.data.filled_per) / 100).toFixed(
                    2
                  )
                );
                props.setB(res.data.current_storage);
                localStorage.setItem(
                  "used",
                  isNaN(
                    (
                      (res.data.current_storage * res.data.filled_per) /
                      100
                    ).toFixed(2)
                  )
                    ? 0
                    : (
                        (res.data.current_storage * res.data.filled_per) /
                        100
                      ).toFixed(9) *
                        1000 *
                        1000 *
                        1000
                );
                localStorage.setItem(
                  "total",
                  isNaN(res.data.current_storage)
                    ? 20 * 1000 * 1000 * 1000
                    : res.data.current_storage * 1000 * 1000 * 1000
                );
              })
              .catch(() => {
                if (localStorage.getItem("used") == null)
                  localStorage.setItem("used", 0);
                if (localStorage.getItem("total") == null)
                  localStorage.setItem("total", 20 * 1000 * 1000 * 1000);
              });

              console.log("dfuysdgfuysdgfuysdgfsdfsdyfsyfds HI I am IN");
              setState((prevState) => ({
                ...prevState,
                successMessage: "Login successful. Redirecting to home page..",
              }));
              localStorage.setItem(ACCESS_TOKEN_NAME, 1);
             
              props.updateTitle("Home");
              props.history.push("/");

      } else {
        console.log("TRYING AGAIN<<<<<<<<<<<<<<");
      }
           
    } catch (error) {
      console.log("signup error...", error)
    }
  }

  // login through sarvvid-web

  const loginWeb = async(e) => {

    e.preventDefault()


    try{
      console.log("register started...")

      console.log("user Pass...", userPass)
      console.log("user Mail...", userEmail)
  
      const resp = await axios({
        method: 'post',
        url: `http://103.155.73.35:3000/weblogin`,
        headers: {"authtoken": enc}, 
        data: {
          email: userEmail,
          password: userPass,
        }
      });

      

      console.log("login resp...", resp)

      if(resp.status === 200){
        
        console.log("Logged in successfully")
        console.log("file sytem...", resp.data.filesys)

        localStorage.setItem("IMEI", resp.data.IMEI);
        localStorage.setItem("authtoken", resp.data.authtoken);
        localStorage.setItem("ping", 130);
        localStorage.setItem("user_name", resp.data.username);
        localStorage.setItem("user_number", resp.data.phone);
        
        const temp = resp.data.data;

        let new_fileSystem = resp.data.filesys;
        localStorage.setItem("fileSystem", JSON.stringify(new_fileSystem))
        var new_data = JSON.parse(localStorage.getItem("fileSystem"));
        var newEntry = {};
        newEntry.name = "SarvvidBox";
        newEntry.type = "__folder__";
        newEntry.creatorName = "";
        newEntry.size = 0;
        newEntry.path = "/SarvvidBox";
        newEntry.parentPath = "/";
        newEntry.children = [];
        newEntry.date = "";
        newEntry.parentID = md5("/" + "__folder__");
        const id_1 = md5("/SarvvidBox" + "__folder__");
        new_data[id_1] = newEntry;
        let i = 0;
        for (i = 0; i < temp.length; i++) {
          var newEntry_1 = {};
          newEntry_1.name = temp[i];
          newEntry_1.type = "__file__";
          newEntry_1.creatorName = "";
          newEntry_1.size = 0;
          newEntry_1.path = "/SarvvidBox/" + temp[i];
          newEntry_1.parentPath = "/SarvvidBox";
          newEntry_1.parentID = md5("/SarvvidBox" + "__folder__");
          newEntry_1.date = "";
          new_data[md5("/SarvvidBox/" + temp[i] + "__file__")] = newEntry_1;
          new_data[md5("/SarvvidBox" + "__folder__")].children.push(
            md5("/SarvvidBox/" + temp[i] + "__file__")
          );
        }
        console.log(new_data);
        if (new_fileSystem.length > 2) {
          localStorage.setItem("fileSystem", new_fileSystem);
          // setEntry(JSON.parse(new_fileSystem));
        } else {
          localStorage.setItem("fileSystem", JSON.stringify(new_data));
          // setEntry(new_data);
        }

        axios(
            `http://103.155.73.35:3000/getdata?ping=${localStorage.getItem(
              "ping"
            )}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json, text/plain, */*", // It can be used to overcome cors errors
                "Content-Type": "application/json",
                Authtoken: localStorage.getItem("authtoken"),
              },
              data: JSON.stringify({
                IMEI: localStorage.getItem("IMEI"),
              }),
            }
          ).then((res) => {
                console.log( "getdata...", res);
                props.setA(
                  ((res.data.current_storage * res.data.filled_per) / 100).toFixed(
                    2
                  )
                );
                props.setB(res.data.current_storage);
                localStorage.setItem(
                  "used",
                  isNaN(
                    (
                      (res.data.current_storage * res.data.filled_per) /
                      100
                    ).toFixed(2)
                  )
                    ? 0
                    : (
                        (res.data.current_storage * res.data.filled_per) /
                        100
                      ).toFixed(9) *
                        1000 *
                        1000 *
                        1000
                );
                localStorage.setItem(
                  "total",
                  isNaN(res.data.current_storage)
                    ? 20 * 1000 * 1000 * 1000
                    : res.data.current_storage * 1000 * 1000 * 1000
                );
              })
              .catch(() => {
                if (localStorage.getItem("used") == null)
                  localStorage.setItem("used", 0);
                if (localStorage.getItem("total") == null)
                  localStorage.setItem("total", 20 * 1000 * 1000 * 1000);
              });

              console.log("dfuysdgfuysdgfuysdgfsdfsdyfsyfds HI I am IN");
              setState((prevState) => ({
                ...prevState,
                successMessage: "Login successful. Redirecting to home page..",
              }));
              localStorage.setItem(ACCESS_TOKEN_NAME, 1);
             
              props.updateTitle("Home");
              props.history.push("/");

      } else {
        console.log("TRYING AGAIN<<<<<<<<<<<<<<");
      }

      

    } catch(error) {
      console.log("login error...", error)
    }


  }



  return (
  
    <div className="login">
      
      <div className="nav">
         <img src={logo} alt="logo" />
      </div>
      {/* <img className="loginLogo" src={sarvvid} alt="Sarvvid AI" /> */}
        <div className="main">
            <QRC
            updateTitle={props.updateTitle}
            history={props.history}
            setA={(val) => {
              props.setA(val);
            }}
            setB={(val) => {
              props.setB(val);
            }}
          />
          <div className="forms">
              <div className={`form-main ${loginOpened ? "active1" : ""}`}>
              <div className="form-container sign-up-container">
                <form action="#">
                  <div className="form">
                  <h1>Create Account</h1>
                    
                    <p>Email</p>
                    <input type="email" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)}/>
                    <p>Phone no.</p>
                    <input type="number" placeholder="Phone no." onChange={(e) => setUserPh(e.target.value)}/>
                    <p>Password</p>
                    <input type="password" placeholder="Password" onChange={(e) => setUserPass(e.target.value)}/>
                    <button type="submit"  onClick={(e) => registerWeb(e)} >Sign Up</button>
                    <h3>Already have an account. <span onClick={() => setLoginOpened(true)} >Sign in</span></h3>
                  </div>

                </form>
	          </div>
                    <div className="form-container sign-in-container">
                        <form action="#">
                          <div className="form">
                          <h1>Sign in</h1>
                          <p>Email</p>
                          <input type="email" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)}/>
                          <p>Password</p>
                          <input type="password" placeholder="Password" onChange={(e) => setUserPass(e.target.value)}/>
                          <a onClick={() => setModalOpen(true)} style = {{cursor:"pointer", color:"blue"}} >Forgot your password?</a>
                          <button type="submit" onClick={(e) => loginWeb(e)} >Sign In</button>
                          <h3>New to Sarvvid <span onClick={() => setLoginOpened(false)} >Sign up</span></h3>
                          </div>
                        </form>
                    </div>
              </div>
          </div>

        </div>

        
        <Modal
          open = {modalOpen}
           aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >

            <div className="forgot-modal">
            <div className="form">
              <div style = {{display:"flex", alignItems:"center", justifyContent: "space-between", width: "100%"}} >
              <h1>Forgot Password</h1>
              <CloseRoundedIcon style = {{fontSize: "2rem", cursor:"pointer"}}  onClick = {() => setModalOpen(false)} />
              </div>
              <p>Email</p>
              <input type="email" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)}/>
              <button type="submit" onClick={(e) => forgotPassHandler(e)} >Submit</button>
              
            </div>
            </div>
        </Modal>
      
    </div>
  );
}

export default withRouter(LoginForm);
