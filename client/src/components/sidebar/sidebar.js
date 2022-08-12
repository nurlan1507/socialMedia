import React from 'react';
import styles from './sidebar.module.css';
import {getUserData} from "../../features/userAuth/userSlice";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment, faList, faGear,faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

export const Sidebar = ()=>{
    const dispatch = useDispatch();
    const user = useSelector(getUserData);
    const newUser = {...user};
    return(
        <>
            <div className={styles.sidebar}>
                <div className={styles.sidebarContent}>
                    <div className={styles.mainUserInfo}>
                            <img src={user.avatar} className={styles.avatar} alt={'avatar'}/>
                        <div className={styles.nameContainer}>
                            <h2 className={styles.username}>{user.firstName +'   ' + user.secondName}</h2>
                            <p className={styles.email}>{user.email}</p>
                        </div>
                    </div>
                    <div className={styles.tabsContainer}>
                        <ul className={styles.tabs}>
                            <Link to={`/news`}  style={{textDecoration:"none"}}>
                                <li className={styles.tabsItem}><FontAwesomeIcon className={styles.fontAwesome} icon={faList} />  News</li>
                            </Link>
                            <Link to={`/chats`} style={{textDecoration:"none"}}>
                                <li className={styles.tabsItem}> <FontAwesomeIcon className={styles.fontAwesome} icon={faComment} /> Chats</li>
                            </Link>
                            <Link to={`settings`} style={{textDecoration:"none"}}>
                                <li className={styles.tabsItem}><FontAwesomeIcon className={styles.fontAwesome} icon={faGear} /> Settings</li>
                            </Link>
                            <Link to={`/logout`} style={{textDecoration:"none"}}>
                                <li className={styles.tabsItem}> <FontAwesomeIcon className={styles.fontAwesome} icon={faArrowRightFromBracket} /> Logout</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}