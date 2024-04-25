import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { Responsive, WidthProvider } from "react-grid-layout"
import AddTile from "./AddTile";
import { addTile, getTile, updateTile } from "../../services/api";
import Tile from "./Tile";
import Button from "../Button/Button";
import { isMobile, isDesktop, isTablet } from 'react-device-detect';
import { Link } from 'react-router-dom';
import Weather from "../Weather";
import { convertToNumber } from "../../utils/convertToNumber";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from 'react-responsive';


const ResponsiveGridLayout = WidthProvider(Responsive);

Modal.setAppElement('#root');

const customStyles = {
    content: {
        height: 'max-content',
        overflowY: isMobile ? 'auto' : 'unset'
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
    setIsDraggable,
    location,
    setLocation
}) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [tile, setTile] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    const IsDesktop = useMediaQuery({ query: '(min-width: 1025px)' })
    const IsTablet = useMediaQuery({ query: '(min-width:769px )' }) && useMediaQuery({ query: '(max-width:1024px )' })
    const IsMobile = useMediaQuery({ query: '(min-width:426px )' }) && useMediaQuery({ query: '(max-width:768px )' })
    const IsMobileSmall = useMediaQuery({ query: '(min-width:320px )' }) && useMediaQuery({ query: '(max-width:425px )' })

    const addTileToTab = async (data) => {
        setIsLoading(true);
        let response = null
        try {
            if (tile) {
                response = await updateTile(data, tile.id);
                updateLocalStoragePosition(data);

            } else {
                response = await addTile(data, selectedTab.id)
                ///////////////gh
                if (response) {
                    let concatArray = {}
                    let viewSize;
                    isMobile ? viewSize = 'xxs' : isTablet ? viewSize = 'sm' : isDesktop ? viewSize = 'lg' : 'lg';

                    let oldPosition = (JSON.parse(Cookies.get(`position-${selectedTab.id}`)))[viewSize];
                    convertToNumber(response.data.status)
                    let objNew = [{ ...response.data.status, i: JSON.stringify(response.data.id) }]
                    if (oldPosition && objNew) {
                        if (isMobile) concatArray = { xxs: [...oldPosition, ...objNew] };
                        else if (isTablet) concatArray = { sm: [...oldPosition, ...objNew] }
                        else if (isDesktop) concatArray = { lg: [...oldPosition, ...objNew] }
                        else concatArray = { lg: [...oldPosition, ...objNew] }
                    }

                    Cookies.set(`position-${selectedTab.id}`, JSON.stringify(concatArray), { expires: 5110 })
                }

                /////////////////////////gh

            }
        } catch (err) {
            if (err?.response?.status === 403) {
                if (err?.response?.data?.error?.code == "Max_tile_error")// gh for translate باید سمت بک اند برای خطای ولیدیشن کد گذاشته شود که با متن خطا اینجا مقایسه نشود باید اصلاح گردد سمت بک اند
                    alert.show(t("text.YourservicedoesnothaveabilitycreatetilestabmorethanlimitContactsupport"), { type: "error" }); // gh for translate
                else if (err?.response?.data?.error?.code == "permission_denied" && err?.response?.data?.error?.details?.detail == "شما اجازه انجام این دستور را ندارید.")// gh for translate
                    alert.show(t("text.Youarenotauthorizedexecutecommand"), { type: "error" }); // gh for translate)

                setShowModal(false)
                // alert.show(err?.response?.data?.error?.details?.detail, { type: "error" });// gh for translate
            } else {
                if (err?.response?.data?.error?.details?.title) // gh for translate
                    setErrors({ title: [t("text.maximumfieldlengthis24characters"), 'مطمعن شوید طول این مقدار بیشتر از 24 نیست.'] })// gh for translate
                else// gh for translate
                    setErrors(err?.response?.data?.error?.details)
            }
        }

        setIsLoading(false);
        if (response) {
            handleCloseModalTile();
            onloadTiles()
            alert.show(tile ? `${t("text.Editedsuccessfully")}` : `${t("text.Addedsuccessfully")}`, { type: "success" });
        }
    }

    // const updateLocalStoragePosition = (data) => {
    //     console.log("dsadasdasdsad")
    //     const positions = (Cookies.get(`position-${selectedTab.id}`));
    //     convertToNumber(data.status);
    //     ///////////////gh
    //     let viewSize;
    //     isMobile ? viewSize = 'xxs' : isTablet ? viewSize = 'sm' : isDesktop ? viewSize = 'lg' : 'lg';
    //     let a = JSON.parse(positions)[viewSize]
    //     const index = a.findIndex(i => i.i === tile.id.toString())
    //     a[index].h = data.status.h;
    //     a[index].w = data.status.w;
    //     let positionNew = {}
    //     if (isMobile)
    //         positionNew = { xxs: a };
    //     else if (isTablet) positionNew = { sm: a }
    //     else if (isDesktop) positionNew = { lg: a }
    //     else positionNew = { lg: a }
    //     // console.log(JSON.stringify(positionNew))

    //     Cookies.set(`position-${selectedTab.id}`, JSON.stringify(positionNew))
    //     setLayouts(JSON.parse(positionNew));

    //     ///////////////gh
    // }
    const updateLocalStoragePosition = (data) => {
        const positions = JSON.parse(Cookies.get(`position-${selectedTab.id}`));
        convertToNumber(data.status);
        Object.values(positions).map(item => {
            if (item.length > 0) {
                const index = item.findIndex(i => i.i === tile.id.toString())
                item[index].w = data.status.w;
                item[index].h = data.status.h;
            }
        })
        Cookies.set(`position-${selectedTab.id}`, JSON.stringify(positions), { expires: 5110 })
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



    const createTiles = () => {
        const result = [];
        let index = 0;

        // let ix = 0;
        // let iy = 1;
        let tiles__ = tiles.sort((a, b) => a.status.w > b.status.w ? -1 : 1)
        let tiles_ = tiles__.sort((a, b) => a.status.h > b.status.h ? -1 : 1)

        for (let i = 0; i < tiles_.length; i++) {
            const item = tiles_[i];
            let mainPosition;
            let hasPositions = Cookies.get(`position-${selectedTab.id}`)
            hasPositions ? hasPositions = (JSON.parse(hasPositions)) : []

            let viewSize;
            IsMobileSmall ? viewSize = 'xxs' : IsMobile ? viewSize = 'xs' : IsTablet ? viewSize = 'sm' : IsDesktop ? viewSize = 'lg' : 'lg';
            if ((hasPositions) && (hasPositions)[viewSize] && (hasPositions)[viewSize].length !== 0) { // && localStorage.getItem("is_admin") == "true"
                const positions = (Cookies.get(`position-${selectedTab.id}`));
                mainPosition = (JSON.parse(positions))[viewSize].find(el => parseInt(el.i) === item.id)
            } else {
                mainPosition = tiles_[i]?.status;
                mainPosition = { ...mainPosition, i: item.id }
                convertToNumber(mainPosition);
            }
            result.push(
                <div key={item?.id} data-grid={mainPosition}>
                    <Tile
                        data={item}
                        key={item.id}
                        onRemoveItem={removeItem}
                        onEdit={retrieveTile}
                        isDraggable={isDraggable}
                        selectedTab={selectedTab.id}
                        location={location} //ghبرای تایل آب و هوا بعدا بردارم
                        setLocation={setLocation} //gh برای تایل آب و هوا بعدا بردارم
                    />
                </div>
            );
            // if (ix > 8) {
            //     ix = 0;
            //     iy = iy + 2;
            // }
            // else
            //     ix = ix + 2;
        }
        return result;
    }

    const layoutChange = (layout, layouts) => {
        onLayoutChange && onLayoutChange(layout, layouts);
    }

    const removeItem = (i) => {
        onRemoveItem && onRemoveItem(i);
    }

    const handleCloseModalTile = () => {
        setShowModal(false)
        setTile(null)
        setErrors(null)
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
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 9, md: 8, sm: 6, xs: 4, xxs: 2 }}
                    allowOverlap={false}
                    isResizable={true}
                >
                    {
                        tiles.length > 0 && createTiles()
                    }

                </ResponsiveGridLayout>
                {
                    isDraggable && (
                        <div className="d-flex justify-content-end mt-3 px-2 pb-4">
                            <Button
                                className="d-flex button btn-primary-fill height-auto py-1 px-4 justify-content-center align-items-center ml-1"
                                handler={() => setIsDraggable(false)}
                            >
                                <span>{t("text.save")}</span>
                            </Button>

                            <Button
                                className="d-flex button btn-primary-outline btn-primary-border height-auto px-4 py-1 justify-content-center ml-1 align-items-center"
                                handler={onResetLayout}
                            >
                                <span className="">{t("text.cancel")}</span>
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
                            <i className="icon icon-24 icon-plus-primary" />
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
                            <i className="icon icon-48 icon-plus-primary" />
                        </Link>
                    ))
                }
            </section>
            <Modal
                isOpen={showModal}
                contentLabel="اضافه کردن تایل"
                className="position-unset bg-white"
                onRequestClose={handleCloseModalTile}
                shouldCloseOnOverlayClick={true}
                style={customStyles}
            >
                <AddTile
                    onSave={(data) => { addTileToTab(data) }}
                    onClose={handleCloseModalTile}
                    isLoading={isLoading}
                    tile={tile}
                    errors={errors}
                />
            </Modal>
        </>
    )
}

export default Pane;