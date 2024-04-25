import React from "react";
import { useTranslation } from "react-i18next";

export const notificationTextGenerator = (item) => {
    //  let text =  '  نود  '  + item?.actor?.part_number + '  ';
    let text = "";
    text += verbGenerator(item.verb);
    return text
}
export const notificationText_TitleGenerator = (item) => {
    const { t } = useTranslation();
    if(item?.actor == null)
    console.log(item?.actor)
    if ((((item?.actor?.title)?.indexOf('رله')) != -1)) {
        if (item.verb == 'has connected')
            return t("text.Internetrelaysconnectedsuccessfully");
        else if (item.verb == 'has disconnected')
            return t("text.Internetrelayswasdisconnected");
    }
    else {
        if (item.verb == 'has connected')
            return `${t("text.Internetsensors")} ${item?.actor?.part_number} ${t("text.Successfullyconnected")}`;
        else if (item.verb == 'has disconnected')
            return `${t("text.Internetsensors")} ${item?.actor?.part_number}  ${t("text.disconnected")}`;
    }
}

export const verbGenerator = (verb) => {
    const { t } = useTranslation();

    switch (verb) {
        // case 'has connected':
        //     return ' اینترنت وصل شد';
        // case 'has disconnected':
        //     return ' اینترنت قطع شد';
        case 'has plugged in':
            return t("text.sensorconnected")
        case 'has plugged out':
            return t("text.sensordisconnected")
        case 'Successfully Turned On':
            return t("text.SuccessfullyTurnedOn")
        case 'Successfully Turned Off':
            return t("text.TurnedOff")
        case 'Higher Than Set Point':
            return t("text.Morethanspecifiedvalue")
        case 'Lower Than Set Point':
            return t("text.lessthanspecifiedvalue")
        case 'Turned Off':
            return t("text.TurnedOff") 
        case 'Created':
            return t("text.built")
        case 'Deleted':
            return t("text.Deleted")
        case 'Added user':
            return t("text.added") 
        case 'Removed user':
            return t("text.Deleted")
        case 'started following':     
            return t("text.folowing")
        case 'Failed To Turn On':
                return t("text.Itfailed")
        default:
            return t("text.disconnected");
    }
}
