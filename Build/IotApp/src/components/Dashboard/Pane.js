import React, {useState} from "react";
import Modal from "react-modal";

import {Responsive, WidthProvider} from "react-grid-layout";
import AddTile from "./AddTile";
import {addTile, getTile, updateTile} from "../../services/api";
import Tile from "./Tile";
import Button from "../Button/Button";
import {isMobile} from 'react-device-detect';
import {Link} from 'react-router-dom';
import Weather from "../Weather";


const ResponsiveGridLayout = WidthProvider(Responsive);

Modal.setAppElement('#root');

const customStyles = {
    content: {
        height: 'max-content',
        overflowY: 'auto'
    }
}
const Pane = ({
                  tiles,
                  selectedTab,
                  onLayoutChange,
                  onRemoveItem,
                  onloadTiles,
                  onResetLayout,
                  isDraggable,
                  layouts,
                  setLayouts,
                  setIsDraggable
              }) => {

    const [showModal, setShowModal] = useState(false);
    const [tile, setTile] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const addTileToTab = async (data) => {
        setIsLoading(true);
        let response = null

        if (tile) {
            response = await updateTile(data, tile.id);
            updateLocalStoragePosition(data);
        } else {
            response = await addTile(data, selectedTab.id);
        }
        setIsLoading(false);
        if (response) {
            setShowModal(false)
            setTile(null)
            onloadTiles()
            alert.show("باموفقیت اضافه گردید", {type: "success"});
        }
    }

    const updateLocalStoragePosition = (data) => {
        const positions = JSON.parse(localStorage.getItem(`position-${selectedTab.id}`));
        convertToNumber(data.status);
        Object.values(positions).map(item => {
            if (item.length > 0) {
                const index = item.findIndex(i => i.i === tile.id.toString())
                item[index] = {...item[index], ...data.status};
            }
        })
        localStorage.setItem(`position-${selectedTab.id}`, JSON.stringify(positions))
        setLayouts(positions);
    }

    const retrieveTile = id => {
        getTile(id)
            .then(response => {
                setTile(response)
                setShowModal(true)
            })
            .catch(err => console.log(err))
    }

    const getTileSize = (item) => {
        switch (item?.size) {
            case "small":
                return {
                    w: 1,
                    h: 1
                }
                break;
            case "medium":
                return {
                    w: 2,
                    h: 1
                }
                break;
            case "large":
                return {
                    w: 2,
                    h: 2
                }
                break;
            default:
                return {
                    w: 1,
                    h: 1
                }
                break;
        }

    }

    const weatherTilePosition = { x: 0, y: 0, w: 4, h: 2, static: true };

    const createTiles = () => {
        const result = [];
        let index = 0;

        result.push(<div key={0} data-grid={weatherTilePosition}><Weather /></div>)

        for (let i = 0; i < tiles.length; i++) {
            const item = tiles[i];
            // item.i = i;
            const size = getTileSize(item);
            // console.log({
            //     x: size?.w === 1 ? 4 - (index % 5) : 3 - (index % 5),
            //     y: Math.round(index / 5),
            //     ...size
            // }, i, index)
            const position = {
                x: size?.w === 1 ? 4 - (index % 5) : 3 - (index % 5),
                y: Math.round(index / 5),
                ...size
            };
            let mainPosition;

            let hasPositions = localStorage.getItem(`position-${selectedTab.id}`)
            if (hasPositions) {
                const positions = JSON.parse(localStorage.getItem(`position-${selectedTab.id}`))
                mainPosition = Object.values(positions)[0].find(el => parseInt(el.i) === item.id)
                if (!mainPosition) {
                    mainPosition = tiles[i].status;
                    mainPosition = {...mainPosition, i: item.id}
                }
            } else {
                mainPosition = tiles[i].status;
                mainPosition = {...mainPosition, i: item.id}
            }

            convertToNumber(mainPosition);
            index = size?.w === 1 ? (index + 1) : (index + 2);
            result.push(
                <div key={item?.id} data-grid={mainPosition}>
                    <Tile
                        data={item}
                        key={item.id}
                        onRemoveItem={removeItem}
                        onEdit={retrieveTile}
                        isDraggable={isDraggable}
                    />
                </div>
            );

        }
        return result;
    }

    const convertToNumber = (position) => {
        Object.keys(position).map(function (key, index) {
            position[key] *= 1
        });
    }

    const calcTilePosSize = (item, i) => {
        const size = getTileSize(item);
        console.log({
            x: size?.w === 1 ? 4 - (i % 5) : 3 - (i % 5),
            y: Math.round(i / 5),
            ...size
        })
        return {
            x: size?.w === 1 ? 4 - (i % 5) : 3 - (i % 5),
            y: Math.round(i / 5),
            ...size
        };
    }

    const layoutChange = (layout, layouts) => {
        onLayoutChange && onLayoutChange(layout, layouts);
        // setLayouts(layouts);
        // localStorage.setItem(`position-${selectedTab.id}`, JSON.stringify(layouts))
    }

    const removeItem = (i) => {
        onRemoveItem && onRemoveItem(i);
    }

    return (
        <>
            <section className={`${isDraggable ? "card" : ""}`}>
                <ResponsiveGridLayout
                    className={`layout rtl react-resizable-handle`}
                    rowHeight={160}
                    width={860}
                    layouts={layouts}
                    onLayoutChange={layoutChange}
                    isDraggable={isDraggable}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}


                    cols={{lg: 10, md: 8, sm: 6, xs: 4, xxs: 2}}
                    allowOverlap={false}
                    isResizable={true}
                >
                    {
                        tiles.length && createTiles()
                    }

                </ResponsiveGridLayout>
                {
                    isDraggable && (
                        <div className="d-flex justify-content-end mt-3 px-2 pb-4">
                            <Button
                                className="d-flex button btn-primary-fill height-auto py-1 px-4 justify-content-center align-items-center ml-3"
                                handler={() => setIsDraggable(false)}
                            >
                                <span>ذخیره تغییرات</span>
                            </Button>
                            <Button
                                className="d-flex button btn-primary-outline btn-primary-border height-auto px-4 py-1 justify-content-center ml-1 align-items-center"
                                handler={onResetLayout}
                            >
                                <span className="">لغو تغییرات</span>
                            </Button>
                        </div>
                    )
                }
                {
                    !isDraggable && selectedTab?.id && (!isMobile ? (
                        <section
                            className="tile-item mt-2 add-tile d-flex align-items-center justify-content-center"
                            onClick={() => setShowModal(true)}
                        >
                            <i className="icon icon-24 icon-plus-primary"/>
                        </section>
                    ) : (
                        <Link
                            className="tile-item mt-2 add-tile d-flex align-items-center justify-content-center"
                            to={{
                                pathname: "/Panel/Dashboard/AddNewTile",
                                state: {
                                    selectedTab: selectedTab.id,
                                },
                            }}
                        >
                            <i className="icon icon-48 icon-plus-primary"/>
                        </Link>
                    ))
                }
            </section>
            <Modal
                isOpen={showModal}
                contentLabel="اضافه کردن تایل"
                className="position-unset bg-white"
                onRequestClose={() => setShowModal(false)}
                shouldCloseOnOverlayClick={true}
                style={customStyles}
            >
                <AddTile onSave={(data) => {
                    addTileToTab(data)
                }} onClose={() => {
                    setShowModal(false)
                    setTile(null)
                }}
                         isLoading={isLoading}
                         tile={tile}
                />
            </Modal>
        </>
    )
}

export default Pane;