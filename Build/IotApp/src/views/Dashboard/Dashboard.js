import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {getTabs, getTiles, getTileData} from "../../services/api";
import Tabs from "../../components/Dashboard/Tabs";
import Pane from "../../components/Dashboard/Pane";
import {reject} from "lodash";
import {
    GET_TILES, SET_TILES_DATA, SET_TILE_DATA, ADD_TILE
} from '../../redux/constrants/actionTypes';
import Weather from "../../components/Weather";
import {isMobile} from "react-device-detect";


let ws;
let timer;
const Dashboard = ({setTilesData, setTileData, addTile}) => {

    const [tabs, setTabs] = useState([]);
    const [selectedTab, setSelectedTab] = useState({});
    const [tiles, setTiles] = useState([]);
    const [isDraggable, setIsDraggable] = useState(false);
    const [layouts, setLayouts] = useState({});
    const [prevLayouts, setPrevLayouts] = useState({});

    useEffect(() => {

        loadTabs()

        ws = new WebSocket(`wss://viranique.com/ws/dashboard/${localStorage.getItem('token')}/`);
        ws.onopen = () => {
            ws.addEventListener('message', function (event) {
                const data = JSON.parse(event.data)
                switch (data.type) {
                    case 'get_tiles':
                        setTilesData(data.response)
                        break;
                    case 'get_data':
                        setTileData(data.response)
                        break;
                    case 'get_tile':
                        addTile(data.response)
                        break;
                    default:
                        break;
                }
            });
        };
        return () => {
            clearTimeout(timer);
            ws.close()
        }
    }, []);

    useEffect(() => {
        if (selectedTab?.id) {
            loadTiles();

            if (ws.readyState === 1) {
                ws.send(JSON.stringify({
                    "tab_id": selectedTab?.id
                }));
            }
        }
    }, [selectedTab]);

    useEffect(() => {
        tiles.map(item => {
            getTileData(item.id)
                .then(res => {
                    setTileData(res)
                }).catch(err => console.log(err))
        })
    }, [tiles])

    const loadTabs = async () => {
        let response = await getTabs();
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
        localStorage.setItem(`position-${selectedTab.id}`, JSON.stringify(layouts))
    }

    const onRemoveItem = (i) => {
        setTiles(reject(tiles, {id: i}));
    }

    const editLayout = () => {
        setPrevLayouts(layouts);
        setIsDraggable(true);
    }

    const resetLayout = () => {
        localStorage.setItem(`position-${selectedTab.id}`, JSON.stringify(prevLayouts))
        setLayouts(prevLayouts);
        setIsDraggable(false);
    }

    useEffect(() => {
        setIsDraggable(false)
        if (Object.keys(prevLayouts).length !== 0) {
            resetLayout()
        }
    }, [selectedTab])

    return (
        <div className="">
            <Tabs tabs={tabs} onLoadTabs={loadTabs} onEditLayout={editLayout} isDraggable={isDraggable}
                  onClick={setSelectedTab} selectedTab={selectedTab}/>
            <div className={`row mt-3 overflow-auto height-custom ${isMobile ? "pb-5" : ""}`}>
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
                    />
                </div>
                {/*<div className={`col-xl-5 col-lg-6 col-sm-12 order-lg-2 order-sm-1 order-1 ${isMobile ? "" : "pr-0"}`}>*/}
                {/*    <Weather/>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    setTilesData: (data) => dispatch({type: SET_TILES_DATA, payload: data}),
    setTileData: (data) => dispatch({type: SET_TILE_DATA, payload: data}),
    addTile: (data) => dispatch({type: ADD_TILE, payload: data}),
});

export default connect(null, mapDispatchToProps)(Dashboard);

