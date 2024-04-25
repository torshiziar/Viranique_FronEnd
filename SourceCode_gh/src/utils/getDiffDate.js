import TimeAgo from "javascript-time-ago";
import moment from "moment-jalaali";
const timeAgo = new TimeAgo('fa-IR')

export const getTimeMessage = (date) => {
    const now = new Date();
    const messageDate = new Date(date)
    const diff = Math.abs(messageDate - now)
    // if(diff >= (1000 * 60 * 60 *24)) {
    const a = moment(date).format('jDD jMMMM hh:mm');
    const b = timeAgo.format(Date.now() - diff, 'twitter');
    const obj = [a, b]
    if (localStorage.getItem("i18nextLng") == "fa")
        return `${obj[0]} : ${obj[1]}`;
    else
        return moment(date).locale("en").format('DD MMMM hh:mm');

    // }


    // return timeAgo.format(Date.now() - diff, 'twitter');

}

