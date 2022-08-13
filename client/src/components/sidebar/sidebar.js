import React, {useEffect,useState} from 'react';
import styles from './sidebar.module.css';
import {useSelector} from "react-redux";
import {getUserData} from "../../redux/reducers/userReducer";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment, faList, faGear,faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";



export const Sidebar = ()=>{
    const user = useSelector(getUserData)
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
                               <li className={styles.tabsItem} onClick={async()=>{
                                   console.log('asdasds')}} style={{textDecoration:"none"}}> <FontAwesomeIcon className={styles.fontAwesome} icon={faArrowRightFromBracket}/> Logout </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}