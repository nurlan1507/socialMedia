import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux";
import {getUserData} from "../../redux/reducers/userReducer";
import {Outlet } from 'react-router-dom';
import styles from './main.module.css'

//socketIo configuration
import io from 'socket.io-client';

//components
import {Sidebar} from "../../components/sidebar/sidebar";



const socket = io.connect(`http://localhost:8080`);

export const Main = () =>{
    const user = useSelector(getUserData)
    useEffect(()=>{
        socket.emit('connection', {...user});
        console.log(user)
        alert('userConnected')
    },[])

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