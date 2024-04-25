import {lazy} from 'react';

const Dashboard = lazy(() => import('../views/Dashboard/Dashboard'));
const Settings = lazy(() => import('../views/Settings/Settings'));
const Control = lazy(() => import('../views/Control/Control'));
const HistoryData = lazy(() => import('../views/HistoryData/HistoryData'));
const UserList = lazy(() => import('../views/User/List'));
const UserAction = lazy(() => import('../views/User/Action'));
const Me = lazy(() => import('../views/User/Me'));
const AddNewTile = lazy(() => import('../views/Dashboard/AddNewTile'))
const IncCredit_ = lazy(() => import('../components/Accunting/IncCredit_'));
const Usagetimepanel = lazy(() => import('../components/Accunting/Usagetimepanel'));

const ActuatorManual = lazy(() => import('../views/Control/ActuatorManual'));
const ActuatorAutomatic = lazy(() => import('../views/Control/ActuatorAutomatic'));
const DevicesList = lazy(() => import('../views/Settings/DevicesList'));
const NotificationManagement = lazy(() => import('../views/Settings/NotificationManagement'));
// import UserNew from "../views/User/Store";

const mainRoutes = [
    {
        key: 0,
        path: "/Panel/Dashboard/Dashboard",
        title: "text.Dashboard",
        sidebarName: "text.Dashboard",
        pageCategory: 'Dashboard',
        iconClass: 'icon-dashboard',
        component: Dashboard,
        bottomNavigation: true,
    },
    {
        key: 1,
        path: "/Panel/Dashboard/Control",
        title: "text.automation",
        sidebarName: `text.automation`,
        pageCategory: 'Dashboard',
        iconClass: 'icon-control',
        component: Control,
        bottomNavigation: true,
        showHeader: false,
        headerOptions: {},
        canControl: true,
    },
    {
        key: 2,
        path: "/Panel/Dashboard/HistoryData",
        title: "text.Datahistory",
        sidebarName: "text.Datahistory",
        pageCategory: 'Dashboard',
        iconClass: 'icon-history',
        component: HistoryData,
        bottomNavigation: true,
        showHeader: false,
        headerOptions: {},
    },
    {
        key: 3,
        path: "/Panel/Dashboard/User/List",
        sidebarName: "text.Usermanagement",
        title:"text.Usermanagement",
        pageCategory: "Dashboard",
        iconClass: "icon-user",
        component: UserList,
        bottomNavigation: true,
        showHeader: false,
        canControl: true,
    },
    {
        key: 4,
        path: "/Panel/Dashboard/Settings",
        title: "text.Settings",
        sidebarName: "text.Settings",
        pageCategory: 'Dashboard',
        iconClass: 'icon-setting',
        component: Settings,
        bottomNavigation: true,
        showHeader: false,
        headerOptions: {},
    },
    {
        title: "text.Devicemanagement",
        path: "/Panel/Dashboard/Settings/DeviceManagement",
        pageCategory: "Dashboard",
        component: DevicesList,
        headerAction: "text.Devicemanagement",
        canControl: true,
    },
    {
        title: "text.Usermanagement",
        path: "/Panel/Dashboard/User/Action/:id",
        param: "id",
        pageCategory: "Dashboard",
        component: UserAction,
        headerAction: "text.Edituser",
        canControl: true,
    },
    {
        path: "/Panel/Dashboard/User/Action",
        title: "text.Usermanagement",
        pageCategory: "Dashboard",
        component: UserAction,
        headerAction: "text.Createuser",
        canControl: true,
    },
    {
        path: "/Panel/Dashboard/User/Me",
        title: "text.Editprofile",
        pageCategory: "Dashboard",
        component: Me,
        headerAction: "text.Editprofile",
    },
    {
        // path: "/Panel/Dashboard/Accunting",
        // title: "text.Editprofile",
        // pageCategory: "Dashboard",
        // component: Accunting,
        // headerAction: "text.Editprofile",


        // key: 2,
        path: "/Panel/Dashboard/IncCredit_",
        title: "text.Accounting",
        // sidebarName: "text.Datahistory",
        pageCategory: 'Dashboard',
        // iconClass: 'icon-history',
        component: IncCredit_,
        bottomNavigation: true,
        showHeader: false,
        headerOptions: {},



    },
    {
        // path: "/Panel/Dashboard/Accunting",
        // title: "text.Editprofile",
        // pageCategory: "Dashboard",
        // component: Accunting,
        // headerAction: "text.Editprofile",


        // key: 2,
        path: "/Panel/Dashboard/Usagetimepanel",
        title: "text.Accounting",
        // sidebarName: "text.Datahistory",
        pageCategory: 'Dashboard',
        // iconClass: 'icon-history',
        component: Usagetimepanel,
        bottomNavigation: true,
        showHeader: false,
        headerOptions: {},



    },
    {
        path: "/Panel/Dashboard/AddNewTile",
        title: "text.Dashboard",
        pageCategory: 'Dashboard',
        iconClass: 'icon-dashboard',
        component: AddNewTile,
        headerAction: "text.Addtiles",
    },
    {
        path: "/Panel/Dashboard/AddNewTile/:id",
        title: "text.Dashboard",
        pageCategory: 'Dashboard',
        iconClass: 'icon-dashboard',
        component: AddNewTile,
        headerAction: "text.Tileediting",
    },
    {
        path: "/Panel/Dashboard/Control/AddActuatorManual/:id",
        title: "text.Manualautomation",
        pageCategory: "Control",
        component: ActuatorManual,
        headerAction: "text.Manualautomation",
        canControl: true,
    },
    {
        path: "/Panel/Dashboard/Settings/NotificationManagement/:id",
        title: "text.Managealerts",
        pageCategory: "Settings",
        component: NotificationManagement,
        headerAction: "text.Managealerts",
        canControl: true,
    },
    {
        path: "/Panel/Dashboard/Settings/NotificationManagement",
        title: "text.Managealerts",
        pageCategory: "Settings",
        component: NotificationManagement,
        headerAction: "text.Managealerts",
        canControl: true,
    },
    {
        path: "/Panel/Dashboard/Control/AddActuatorManual",
        title: "text.Manualautomation",
        pageCategory: "Control",
        component: ActuatorManual,
        headerAction: "text.Manualautomation",
        canControl: true,
    },
    {
        path: "/Panel/Dashboard/Control/AddActuatorAutomatic/:id",
        title: "text.Automaticautomation",
        pageCategory: "Control",
        component: ActuatorAutomatic,
        headerAction: "text.Automaticautomation",
        canControl: true,
    },
    {
        path: "/Panel/Dashboard/Control/AddActuatorAutomatic",
        title: "text.Automaticautomation",
        pageCategory: "Control",
        component: ActuatorAutomatic,
        headerAction: "text.Automaticautomation",
        canControl: true,
    },
    {redirect: true, path: "/Panel", to: "/Panel/Dashboard/Dashboard", navbarName: "Redirect"}
];

export default mainRoutes;