import React from "react"
import {Outlet } from 'react-router-dom';
import styles from './main.css'


//components
import {Sidebar} from "../../components/sidebar/sidebar";
import {News} from "../../components/news/news";
import {Settings} from "../../components/settings/settings";
import {Chats} from "../../components/chats/chats";
import * as PropTypes from "prop-types";

function Routes(props) {
    return null;
}

Routes.propTypes = {children: PropTypes.node};
export const Main = () =>{
    console.log(location.pathname)
    return(
        <>
            <div className={styles.mainCont}>
                <div className={styles.sideBar}>
                    <Sidebar/>
                </div>
                <div className={styles.mainContent}>
               <Outlet/>




                </div>
            </div>

        </>
    )
}