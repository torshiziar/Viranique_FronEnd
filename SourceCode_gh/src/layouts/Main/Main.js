import React, { Component, Suspense, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { isMobile } from 'react-device-detect';
import { Helmet } from "react-helmet";
import mainRoutes from "../../routes/main.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import Header from "../../components/Header/Header";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import Loader from '../../components/Loader/Loader';
import { ADD_HEADER_ACTION, REMOVE_HEADER_ACTION, SET_LANG } from "../../redux/constrants/actionTypes";
import { getMe } from "../../services/api";
import { store } from "../../redux/store.js";
import { useTranslation } from "react-i18next";

const hist = createBrowserHistory();

const Main = (props) => {
    const { t} = useTranslation();
    const [user, setUser] = useState();
    const [redirectToLogin, setRedirectToLogin] = useState(null)

    useEffect(() => {
        getMe()
            .then(res => {
                setUser(res)
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setRedirectToLogin(true);
        }
    }, [])

    // useEffect(() => {
    //     console.log("propsmainnnnnnnnnnnnnnn");
    //     console.log(props);
    //     console.log(store.getState(),props.langueg_)

    //     // let langueg = localStorage.getItem('lang');
    //     // if (langueg == null) {
    //     //     localStorage.setItem('lang', 'fa')
    //     // }
    //     // if (langueg == 'en') document.body.classList.add('ltr');
    //     // else document.body.classList.remove('ltr');
    // }, [localStorage.getItem('lang')]);


    

    const createSingleRoute = (prop, key) => {
        // if (!hasPermission(prop)) return null;
        return <Route exact path={prop.path} key={key} render={(innerItem) => (
            isLoggedIn(prop) ?
                <>
                    <Helmet>
                        <title>{`${t(prop.title)}  -${t("text.Smartsystem")}`}</title>
                    </Helmet>
                    <prop.component {...innerItem} />
                </> :
                <Redirect to={"./login"} />
        )} />
    }

    const isLoggedIn = (item) => {
        const { setHeaderAction } = props;
        setHeaderAction && setHeaderAction(t(item?.headerAction) || null);
        return true;
    }

    const hasPermission = (route) => {
        if (route?.canControl) {
            if (user?.can_control) {
                return true
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    const switchRoutes = (
        <Suspense fallback={<Loader />}>
            <Switch history={hist}>
                {mainRoutes.map((prop, key) => {
                    if (prop.redirect) {
                        return <Redirect from={prop.path} to={prop.to} key={key} />;
                    }
                    if (prop.subs) {
                        return prop.subs.map((sub, k) => {
                            if (!sub.isNotRoute)
                                return createSingleRoute(sub, k)
                        });
                    }
                    return createSingleRoute(prop, key)
                })}
            </Switch>
        </Suspense>
    );

    if (redirectToLogin) {
        return <Redirect to={{ pathname: "/Login" }} />;
    }

    return (
        <div className={"container-fluid " + (isMobile ? "is-mobile" : "")}>
            <Header userLoggedIn={user} />
            {
                isMobile ? <BottomNavigation routes={mainRoutes}
                    location={props.location}
                    hasPermission={hasPermission}
                /> : <Sidebar
                    routes={mainRoutes}
                    location={props.location}
                    hasPermission={hasPermission}
                />
            }
            <div className="main-wrapper">
                <div className={"content-holder "}>
                    <div className={isMobile ? "" : "container-fluid pl-2 pr-2"}>
                        <div className="content">
                            {switchRoutes}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

const mapStateToProps = state => ({
    headerAction: state.headerAction,
});

const mapDispatchToProps = dispatch => ({
    setHeaderAction: (data) => dispatch({ type: ADD_HEADER_ACTION, data: data }),
    removeHeaderAction: () => dispatch({ type: REMOVE_HEADER_ACTION, data: null }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
