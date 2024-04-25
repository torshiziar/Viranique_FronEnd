import {verbGenerator} from "./notificationTextGenerator";
import { useTranslation } from "react-i18next";


export const activityTextGenerator = item => {
    let text = item?.action_object?.app ? typeGenerator(item?.action_object?.app) + ' ' : '';
    text += item?.action_object?.username ? item?.action_object.username : '';
    text += item?.action_object?.title ? item?.action_object?.title + ' ' : ' ';
    // text += item?.actor?.username + ' ';
    text += verbGenerator(item?.verb)
    return text
}

const typeGenerator = type => {
    const { t } = useTranslation();
    switch (type) {
        case 'Automation':
            return t("text.automationof")
        default:
            return '';
    }
}