import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {login, setToken, forgetPassword, loginByPhone, submitCodeLogin} from "../../services/api";
import LogoPic from "../../assets/img/logo-angizeh.png";
import {isMobile} from "react-device-detect";
import Username from "../../components/LoginForm/Username";
import Password from "../../components/LoginForm/Password";
import OtpInput from "../../components/LoginForm/OTPInput";
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userPhone, setUserPhone] = useState("")

    const [page, setPage] = useState("getUsername");
    const [codeOTP, setCodeOTP] = useState("");
    const [captchaToken, setCaptchaToken] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token.length > 0) {
            setRedirectToReferrer(true);
        }
    }, []);

    const doLogin = (e) => {
        e.preventDefault();
        const user = {
            username,
            password
        };

        login(user)
            .then((res) => {
                if (res?.data?.tokens?.access) {
                    const {data} = res;
                    setToken(data.tokens?.access);
                    localStorage.setItem("username", res.data?.username);
                    localStorage.setItem("name", res.data?.name);
                    localStorage.setItem("last_name", res.data?.last_name);
                    localStorage.setItem("is_admin", res.data?.is_admin); //gh
                    localStorage.setItem("refresh", res.data?.tokens?.refresh);
                    if (res.data?.photo) {
                        localStorage.setItem("photo", "https://viranique.com" + res.data?.photo);
                    }
                    setRedirectToReferrer(true);
                    alert.show(`${t("text.Loginwassuccessful")}`, {type: "success"});
                }
            })
            .catch((err) => {
                alert.show(`${t("text.usernamepasswordincorrect")}`, {type: "error"});
                console.log(err, "err");
                throw err;
            });

    };

    const changePassword = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username)

        forgetPassword(formData)
            .then((res) => {
                if (res.success) {
                    alert.show(`${t("text.Passwordrecoverylinksentyouremail")}`, {type: "success"});
                }
            })
            .catch((err) => {
                alert.show(`${t("text.emailusernamedosenotexist")}`, {type: "error"});
                throw err;
            });

    };

    const handleSendSMSCode = (e) => {
        e.preventDefault();
        const values = {
            "phone": username
        }
        loginByPhone(values)
            .then(res => {
                setPage("otpInput")
                setUserPhone(res?.to[0] || "")
            })
            .catch(err => console.log(err))
    }

    const handleSubmitCode = () => {
        const values = {
            number: codeOTP
        }

        submitCodeLogin(values)
            .then(res => {
                if (res?.data?.tokens?.access) {
                    const {data} = res;
                    setToken(data.tokens?.access);
                    localStorage.setItem("username", res.data?.username);
                    localStorage.setItem("name", res.data?.name);
                    localStorage.setItem("last_name", res.data?.last_name);
                    localStorage.setItem("refresh", res.data?.tokens?.refresh);
                    if (res.data?.photo) {
                        localStorage.setItem("photo", "https://viranique.com" + res.data?.photo);
                    }
                    setRedirectToReferrer(true);
                    alert.show(`${t("text.Loginwassuccessful")}`, {type: "success"});
                }
            })
            .catch(err => console.log(err))
    }

    return (redirectToReferrer ? <Redirect to={{pathname: "/Panel/Dashboard"}}/> :
        <div className={`${isMobile ? "p-3" : "p-4"}`}>
            <div className={`login-parent row mx-0`}>
                <div className='col-md-7 row display-none'>
                    <div className='col-md-10 bg-primary bg-img text-white'>
                        <h1 className='title'>{t("text.Smartsystem")}</h1>
                        <p className='text-center'>{t("text.AnghizehNegharKhavaran")}</p>
                        <hr className='line'/>
                        <div className='d-flex'>
                            <i className='icon icon-24 icon-phone-light'/>
                            <a href="tel:05137054033" className='text-white mr-2'>051-37054033</a>
                        </div>
                        <div className='d-flex mt-2'>
                            <i className='icon icon-24 icon-location-light'/>
                            <a href="https://maps.google.com/?q=Razavi Khorasan Province, Mashhad, Janbaz Blvd, 8HJ7+228, Iran" className='text-white mr-2' target="_blank">{t("text.addressMorvaridGoharshadBuilding")}</a>
                        </div>
                        <a href="https://angizehco.com" className="text-white d-flex align-items-center mt-2" target="_blank">
                            <i className="icon icon-24 icon-globe ml-1"/>
                            <span>www.angizehco.com</span>
                        </a>
                    </div>
                    <div className='col-md-2 bg-left '/>
                </div>
                <div className='col-md-5 login-form d-flex flex-column justify-content-center'>
                    <div className='text-center mb-auto'>
                        <img
                            src={LogoPic}
                            alt={t("text.AnghizehNegharKhavaran")}
                            className="mb-5"/>
                    </div>
                    {
                        page !== "getUsername" && <div className="d-flex align-items-center border border-muted justify-content-center mx-auto w-fit-content px-3 py-2 rounded-38 mb-auto">
                            <i className="icon icon-user icon-20"/>
                            <span className="mr-2">{username}</span>
                        </div>
                    }
                    <div className="mb-auto">
                        <div className="row">
                            <div className="col-md-12 mt-3 position-unset">
                                <div className="row justify-content-center m-0">
                                    {
                                        page === "getUsername" && <Username userName={username} setUsername={setUsername} setPage={setPage} />
                                    }
                                    {
                                        page === "getPassword" && <Password password={password} setPassword={setPassword} setPage={setPage} handler={doLogin} sendCode={handleSendSMSCode} handleForgetPassword={changePassword}/>
                                    }
                                    {
                                        page === "otpInput" && <OtpInput code={codeOTP} setCode={setCodeOTP} userPhone={userPhone} handler={handleSubmitCode}/>
                                    }
                                </div>
                            </div>
                            <div className="col-md-12 mt-3 bg-red text-center" >
                                <a referrerPolicy="origin" target="_blank"
                                   href="https://trustseal.enamad.ir/?id=366449&amp;Code=kcbBoJWMGpLXFGrJ9ryw"><img
                                    referrerPolicy="origin"
                                    src="https://Trustseal.eNamad.ir/logo.aspx?id=366449&amp;Code=kcbBoJWMGpLXFGrJ9ryw"
                                    alt="" style={{cursor: "pointer"}} id="kcbBoJWMGpLXFGrJ9ryw" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Login;
