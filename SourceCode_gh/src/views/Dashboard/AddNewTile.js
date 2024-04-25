import React, {useEffect, useState} from 'react';
import AddTile from "../../components/Dashboard/AddTile";
import {addTile, getTile, updateTile} from "../../services/api";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {convertToNumber} from "../../utils/convertToNumber";
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const AddNewTile = () => {
    const {t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const [tile, setTile] = useState(null);
    const [errors, setErrors] = useState(null);
    const location = useLocation()
    const history = useHistory();
    const { selectedTab } = location.state;
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getTile(id)
                .then((res) => {
                    setTile({...res, id});
                })
                .catch((err) => {
                    console.log(err, "err");
                });
        }
    }, []);

    const addTileToTab = async (data) => {
        setErrors(null)
        setIsLoading(true);
        let response = null;
        try {
            if (tile) {
                response = await updateTile(data, tile?.id)
                updateLocalStoragePosition(data)
            } else {
                response = await addTile(data, selectedTab);
            }
            setIsLoading(false)
        } catch (error) {
            if (error?.response?.status === 403) {
                if(err?.response?.data?.error?.code == "permission_denied")// gh for translate
                alert.show(t("text.YourservicedoesnothaveabilitycreatetilestabmorethanlimitContactsupport"), { type: "error" }); // gh for translate
                history.goBack()
                // alert.show(error?.response?.data?.error?.details?.detail, {type: "error"});// gh for translate
            } else {
                setIsLoading(false)
                if(err?.response?.data?.error?.details?.title) // gh for translate
                setErrors({title:[t("text.maximumfieldlengthis24characters"), 'مطمعن شوید طول این مقدار بیشتر از 24 نیست.']})// gh for translate
            else// gh for translate
                setErrors(err?.response?.data?.error?.details)
            }
        }
        if (response) {
            alert.show(tile ?`${t("text.Editedsuccessfully")}` : `${t("text.Addedsuccessfully")}`, {type: "success"});
            history.goBack()
        }
    }

    const updateLocalStoragePosition = (data) => {
        const positions = JSON.parse(Cookies.get(`position-${selectedTab}`));
        console.log("positions");
        console.log(positions);
        convertToNumber(data.status);
        Object.values(positions).map(item => {
            if (item.length > 0) {
                const index = item.findIndex(i => i.i === tile.id.toString())
                // item[index] = {...item[index], ...data.status};
                item[index].w = data.status.w;
                item[index].h = data.status.h;
            }
        })
        Cookies.set(`position-${selectedTab}`, JSON.stringify(positions), { expires: 5110})
        setLayouts(positions);

    }
    return (
        <AddTile onSave={(data) => {
            addTileToTab(data)
        }}
                 isLoading={isLoading}
                 tile={tile}
                 errors={errors}
        />
    )
}

export default AddNewTile;