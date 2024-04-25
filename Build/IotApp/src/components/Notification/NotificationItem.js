import React, {useEffect, useRef} from "react";
import {useIsInViewport} from "../../utils/useIsInViewport";
import {markAsReadNotification} from "../../services/api";
import TimeAgo from 'javascript-time-ago';
import {getDiffDate} from "../../utils/getDiffDate";
import {notificationTextGenerator} from "../../utils/notificationTextGenerator";


const NotificationItem = ({item}) => {

    const timeAgo = new TimeAgo('fa-IR')

    const notificationRef = useRef(null);

    const isInViewport = useIsInViewport(notificationRef);

    useEffect(() => {
        if(isInViewport && item?.unread) {
            markAsReadNotification(item?.id).then(res => {
                console.log(res)
            }).catch(err => console.log(err))
        }
    },[isInViewport])


    return (
        <div className={`notification-item d-flex flex-column ${item.unread ? "" : "readed"}`} ref={notificationRef}>
            <div className="d-flex align-items-center">
                <div className="notification-item-icon">
                    {/*<i className={`icon icon-24 icon-${item?.actor_content_type?.model ? item?.actor_content_type?.model : 'relay'}`}/>*/}
                </div>
                <div className="mr-3 d-flex flex-column justify-content-between font-size-14">
                    <p className="my-1 font-500 text-dark">هشدار {item?.actor?.title}</p>
                    <p className="my-1 font-400 notification-body-text">{notificationTextGenerator(item)}</p>
                </div>
            </div>
            <div className="d-flex justify-content-end ml-2 font-size-10">
                <span>{timeAgo.format(Date.now() - getDiffDate(item?.timestamp), 'twitter')}</span>
            </div>
        </div>
    )
}


export default NotificationItem;