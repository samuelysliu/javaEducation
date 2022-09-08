//import useState hook to create menu collapse state
import React, { useEffect, useState } from "react";

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/sidebar.css";
import user from '../images/user.png'
import rightArrow from '../images/right-arrow.png'
import leftArrow from '../images/left-arrow.png'
import { ImProfile } from "react-icons/im"
import { AiFillCode, AiOutlineComment, AiFillFileAdd, AiFillEdit } from "react-icons/ai"
import { BsPersonCheckFill } from "react-icons/bs"
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux'

const SideBar = ({ item }) => {
    const userName = useSelector((state) => state.userProfile.value["account"])
    const authority = useSelector((state) => state.userProfile.value["authority"])
    let isTeacher
    if(authority === "teacher"){
        isTeacher = true
    }else{
        isTeacher = false
    }

    const [menuCollapse, setMenuCollapse] = useState(false)
    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    //當項目被點時要變黃底
    const [menuItem, setMenuItem] = useState({ profile: false, project: false, comment: false, addProject: false, checkStudent: false, editProject: false })

    const menuItemClick = (item) => {
        if (item == 'profile') {
            setMenuItem(false)
            setMenuItem({ profile: true })
        } else if (item == 'project') {
            setMenuItem(false)
            setMenuItem({ project: true })
        } else if (item == 'comment') {
            setMenuItem(false)
            setMenuItem({ comment: true })
        } else if (item == 'addProject') {
            setMenuItem(false)
            setMenuItem({ addProject: true })
        } else if (item == 'checkStudent') {
            setMenuItem(false)
            setMenuItem({ checkStudent: true })
        } else if (item == 'editProject') {
            setMenuItem(false)
            setMenuItem({ editProject: true })
        }
    }

    useEffect(() => {
        menuItemClick(item);
    }, []);

    const aStyle = {
        color: 'black'
    }
    return (
        <>
            <div id="sidebar">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext">
                            {/* small and big change using menucollapse state */}
                            {menuCollapse ? "" : <img src={user} width='80px'></img>}
                            <p> {userName} </p>
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <img src={rightArrow} width='30px'></img>
                            ) : (
                                <img src={leftArrow} width='30px'></img>
                            )}
                        </div>
                        <Menu iconShape="square">

                            <MenuItem active={menuItem.profile} icon={<ImProfile />} onClick={() => menuItemClick('profile')}>
                                <a href="./profile" style={aStyle}>個人檔案</a>
                            </MenuItem>


                            {/*<MenuItem active={menuItem.project} icon={<AiFillCode />} onClick={() => menuItemClick('project')}>
                                <a href="./myProject" style={aStyle}>我的成品</a>
                            </MenuItem>*/}


                            {/*<MenuItem active={menuItem.comment} icon={<AiOutlineComment />} onClick={() => menuItemClick('comment')}>
                                收到的評論
                            </MenuItem>*/}

                            {isTeacher ?
                                <MenuItem active={menuItem.addProject} icon={<AiFillFileAdd />} onClick={() => menuItemClick('addProject')}>
                                    <a href="./addProject" style={aStyle}>新增題目</a>
                                </MenuItem>
                                : ''}

                            {isTeacher ?
                                <MenuItem active={menuItem.editProject} icon={<AiFillEdit />} onClick={() => menuItemClick('editProject')}>
                                    <a href="./editProject" style={aStyle}>編輯題目</a>
                                </MenuItem>
                                : ''}

                            {/*isTeacher ? <MenuItem active={menuItem.checkStudent} icon={<BsPersonCheckFill />} onClick={() => menuItemClick('checkStudent')}>
                                查看學生作答情況
                            </MenuItem> : ''*/}
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu id="logout">
                            <MenuItem>{menuCollapse ? '' : <Button variant="primary">登出</Button>}</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default SideBar;
