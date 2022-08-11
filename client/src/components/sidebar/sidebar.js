import React from 'react';
import styles from './sidebar.css';
import {getUserData} from "../../features/userAuth/userSlice";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";

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
                            <li className={styles.tabsItem}>
                                <Link to={`/main/news`}> News</Link>
                            </li>
                            <li className={styles.tabsItem}>
                                <Link to={`/main/chats`}>Chats</Link>
                            </li>
                            <li className={styles.tabsItem}>
                                <Link to={`/main/settings`}>Settings</Link>
                            </li>
                            <li className={styles.tabsItem}>
                                <Link to={`/main/logout`}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}