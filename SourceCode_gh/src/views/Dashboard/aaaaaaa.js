import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { getTabs, getTiles, getTileData, getTileGaugeData, getTileGraphData } from "../../services/api";
import Tabs from "../../components/Dashboard/Tabs";
import Pane from "../../components/Dashboard/Pane";
import { reject } from "lodash";
import {
    GET_TILES, SET_TILES_DATA, SET_TILE_DATA, ADD_TILE, SET_GRAPH_DATA, RESET_GRAPH_DATA, UPDATE_GRAPH_DATA
} from '../../redux/constrants/actionTypes';
import { isMobile } from "react-device-detect";
import { convertToNumber } from "../../utils/convertToNumber";
import Cookies from "js-cookie";
import { useMediaQuery } from 'react-responsive';


let timerTiles;
let refreshTime = 1000 * 60 * 2;
const Dashboard = ({ setTilesData, setTileData, addTile, resetGraph, addGraph, updateGraph }) => {

    const [tabs, setTabs] = useState([]);
    const [selectedTab, setSelectedTab] = useState({});
    const [tiles, setTiles] = useState([]);
    const [isDraggable, setIsDraggable] = useState(false);
    const [layouts, setLayouts] = useState({});
    const [prevLayouts, setPrevLayouts] = useState({});
    const [location, setLocation] = useState(null);
    const [webSocket, setWebSocket] = useState(null);

    const IsDesktop = useMediaQuery({ query: '(min-width: 1025px)' })
    const IsTablet = useMediaQuery({ query: '(min-width:769px )' }) && useMediaQuery({ query: '(max-width:1024px )' })
    const IsMobile = useMediaQuery({ query: '(min-width:426px )' }) && useMediaQuery({ query: '(max-width:768px )' })
    const IsMobileSmall = useMediaQuery({ query: '(min-width:320px )' }) && useMediaQuery({ query: '(max-width:425px )' })

    useEffect(() => {
        timerTiles = setInterval(() => {
            tiles?.map(item => {
                if (item.size === "large") {
                    getTileGraphData(item?.id)
                        .then(res => {
                            updateGraph(res);
                        }).catch(err => console.log(err))
                }
            })
        }, refreshTime)
    }, [tiles])

    useEffect(() => {

        loadTabs()

        return () => {
            clearTimeout(timerTiles);
        }
    }, []);

    useEffect(() => {
        if (webSocket) {
            webSocket.onopen = (event) => {
                webSocket.send(JSON.stringify({
                    "tab_id": tabs[0]?.id
                }));
            };

            webSocket.onmessage = function (event) {
                const data = JSON.parse(event.data)
                if (data?.id) {
                    setTileData(data);
                }
            };

            webSocket.onclose = (e) => {
                setTimeout(function () {
                    setWebSocket(new WebSocket(`wss://viranique.com/ws/monitoring/${localStorage.getItem('token')}/`));
                }, 1000);
            };
        }

        return () => {
            if (webSocket) {
                webSocket.close();
            }
        }
    }, [webSocket])

    useEffect(() => {
        if (selectedTab?.id) {
            resetGraph()
            setLocation(selectedTab?.location ? selectedTab?.location : null)
            loadTiles();
            if (webSocket.readyState === 1) {
                webSocket.send(JSON.stringify({
                    "tab_id": selectedTab?.id
                }));
            }
        }
    }, [selectedTab]);

    useEffect(() => {
        resetGraph()
        tiles.map(item => {
            getTileGaugeData(item.id)
                .then(res => {
                    setTileData(res)
                }).catch(err => console.log(err))
            if (item.size === "large") {
                getTileGraphData(item?.id)
                    .then(res => {
                        addGraph(res);
                    }).catch(err => console.log(err))
            }
        })
    }, [tiles])
    ///////////gh زمانی که با سیستم های متفاوت اما یک اکانت وارد سیستم میشدیم با تغییر اندازه یک یا چند تایل در یک سیستم ، اندازه ی تایل ها در سیستم دیگر با همان اکانت یا زیر مجموعه آن اکانت بهم میریخت- این نیکه کد برای جلوگیری از آن بهم ریختگی هاست
    let positionCookies1
    useEffect(() => {
        let positionCookies_ = {}
        positionCookies1 = Cookies.get(`position-${selectedTab.id}`)
        let viewSize;
        IsMobileSmall ? viewSize = 'xxs' : IsMobile ? viewSize = 'xs' : IsTablet ? viewSize = 'sm' : IsDesktop ? viewSize = 'lg' : 'lg';
        if (positionCookies1) {
            positionCookies1 = (JSON.parse(Cookies.get(`position-${selectedTab.id}`)))

            Object.values(positionCookies1).map((item) => {
                let item_ = item //.slice(1, item.lenght)
                positionCookies1 = item_.map((Item, index) => {
                    const item2 = tiles.find(i2 => i2.id.toString() === Item.i);
                    item2?.status &&
                        convertToNumber(item2?.status)
                    return { ...Item, w: item2?.status.w, h: item2?.status.h }
                })
            });

        }
        positionCookies1 && (
            positionCookies_[viewSize] = (positionCookies1),
            Cookies.set(`position-${selectedTab.id}`, JSON.stringify(positionCookies_), { expires: 5110 }),
            setLayouts(positionCookies_)
        )

    }, [tiles, positionCookies1])
    /////gh


    const getGraphData = (id) => {
        getTileGraphData(id)
            .then(res => {
                addGraph(res);
            }).catch(err => console.log(err))
    }

    const loadTabs = async () => {
        let response = await getTabs();
        setWebSocket(new WebSocket(`wss://viranique.com/ws/monitoring/${localStorage.getItem('token')}/`));
        if (response) {
            setTabs(response);
            setSelectedTab(response[0]);
        }
    }

    const loadTiles = async () => {
        let response = await getTiles(selectedTab?.id);
        if (response) {
            setTiles(response);
            setTilesData(response)
        }
    }

    const onLayoutChange = (layout, layouts) => {
        setLayouts(layouts);
        Cookies.set(`position-${selectedTab.id}`, JSON.stringify(layouts), { expires: 5110 })
    }

    const onRemoveItem = (i) => {
        setTiles(reject(tiles, { id: i }));
    }

    const editLayout = () => {
        setPrevLayouts(layouts);
        setIsDraggable(true);
    }

    const resetLayout = () => {
        Cookies.set(`position-${selectedTab.id}`, JSON.stringify(prevLayouts), { expires: 5110 })
        setLayouts(prevLayouts);
        setIsDraggable(false);
    }

    useEffect(() => {
        if (isDraggable) {
            if (Object.keys(prevLayouts).length !== 0) {
                resetLayout()
            }
        }
    }, [selectedTab])

    const handleSelectedTab = (item) => { //gh
        setIsDraggable(false);
        setSelectedTab(item);
    }
    const onArrange = () => {
        let objectArrange = {};
        let arrayArrange1_1 = [];
        let arrayArrange1_2 = [];
        let arrayArrange2_2 = [];
        let arrayArrange2_4 = [];

        let arrayArrange = [];
     

        let viewSize;
        IsMobileSmall ? viewSize = 'xxs' : IsMobile ? viewSize = 'xs' : IsTablet ? viewSize = 'sm' : IsDesktop ? viewSize = 'lg' : 'lg';
        /////////////////////////
        // tiles &&
        //     console.log(layouts);
            // let ix = 0;
            // let iy = 0;
        // tiles.map(item => {
        //     if ((item.status.w == 4 && item.status.h == 2) && (ix <= 2)) {
        //         arrayArrange.push({ w: item.status.w, h: item.status.h, x: ix, y: iy, i: item.id, moved: false, static: false });
        //         ix = ix + 4;
        //     }
        //     else if (item.status.w == 2 && item.status.h == 2 && (ix <= 4)) {
        //         arrayArrange.push({ w: item.status.w, h: item.status.h, x: ix, y: iy, i: item.id, moved: false, static: false });
        //         ix = ix + 2;
        //     }
        //     else if (item.status.w == 2 && item.status.h == 1 && (ix <= 4)) {
        //         arrayArrange.push({ w: item.status.w, h: item.status.h, x: ix, y: iy, i: item.id, moved: false, static: false });
        //         ix = ix + 2;
        //     }
        //     else if (item.status.w == 1 && item.status.h == 1 && (ix <= 7)) {
        //         arrayArrange.push({ w: item.status.w, h: item.status.h, x: ix, y: iy, i: item.id, moved: false, static: false });
        //         ix = ix + 1;
        //     }
        // })
        // objectArrange[viewSize] = arrayArrange;
        // onLayoutChange(null, objectArrange)

/////////////////////////////////////
        tiles.map(item => {
            if (item.status.w == 4 && item.status.h == 2)
                arrayArrange2_4.push(item)
            if (item.status.w == 2 && item.status.h == 2)
                arrayArrange2_2.push(item)
            if (item.status.w == 2 && item.status.h == 1)
                arrayArrange1_2.push(item)
            if (item.status.w == 1 && item.status.h == 1)
                arrayArrange1_1.push(item)
        })
        let ix = 0;
        let iy = 0;

tiles &&
            console.log(layouts);
        arrayArrange2_4.map(item => {
            arrayArrange.push({ w: item.status.w, h: item.status.h, x: ix, y: iy, i: item.id, moved: false, static: false })
            if (ix <= 2)
                ix = ix + 4;
            else {
                iy = iy + 2
                ix = 0;
            }
        })
        arrayArrange2_2.map(item => {
            arrayArrange.push({ w: item.status.w, h: item.status.h, x: ix, y: iy, i: item.id, moved: false, static: false })
            if (ix <= 4)
                ix = ix + 2;
            else {
                iy = iy + 2
                ix = 0;
            }
        })
        arrayArrange1_2.map(item => {
            arrayArrange.push({ w: item.status.w, h: item.status.h, x: ix, y: iy, i: item.id, moved: false, static: false })
            if (ix <= 4 && iy%2 != 0)
                ix = ix + 2;
            else if(iy%2 == 0){
                iy = iy + 1
            }
            else{
                iy = iy + 1
                ix = 0;
            }
        })
        arrayArrange1_1.map(item => {
            arrayArrange.push({ w: item.status.w, h: item.status.h, x: ix, y: iy, i: item.id, moved: false, static: false })
            if (ix <= 7 && iy%2 != 0)
                ix = ix + 1;
                else if(iy%2 == 0){
                    iy = iy + 1
                }
                else{
                    iy = iy + 1
                    ix = 0;
                }
        })

        objectArrange[viewSize] = arrayArrange
        onLayoutChange(null, objectArrange)
    }
    return (
        <div className="">
            <Tabs tabs={tabs} onLoadTabs={loadTabs} onEditLayout={editLayout} isDraggable={isDraggable}
                onClick={(item) => handleSelectedTab(item)} selectedTab={selectedTab}
                onArrange={onArrange}
            />
            <div className={`row mt-3 overflow-auto height-custom ${isMobile ? "pb-5" : ""} border border-danger`}>
                <div className="col-xl-12 col-sm-12">
                    <Pane
                        tiles={tiles}
                        selectedTab={selectedTab}
                        useCSSTransforms={true}
                        onRemoveItem={onRemoveItem}
                        onLayoutChange={onLayoutChange}
                        onloadTiles={loadTiles}
                        onResetLayout={resetLayout}
                        isDraggable={isDraggable}
                        setIsDraggable={setIsDraggable}
                        layouts={layouts}
                        setLayouts={setLayouts}
                        location={location}
                        setLocation={setLocation}
                    />
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    setTilesData: (data) => dispatch({ type: SET_TILES_DATA, payload: data }),
    setTileData: (data) => dispatch({ type: SET_TILE_DATA, payload: data }),
    addTile: (data) => dispatch({ type: ADD_TILE, payload: data }),
    addGraph: (data) => dispatch({ type: SET_GRAPH_DATA, payload: data }),
    updateGraph: (data) => dispatch({ type: UPDATE_GRAPH_DATA, payload: data }),
    resetGraph: () => dispatch({ type: RESET_GRAPH_DATA })
});

export default connect(null, mapDispatchToProps)(Dashboard);

