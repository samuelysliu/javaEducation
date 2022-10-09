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
import user from '../images/user.png'
import { ImProfile } from "react-icons/im"
import { AiFillFileAdd, AiFillEdit } from "react-icons/ai"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import { GrGroup } from "react-icons/gr"
import { MdHomeWork } from "react-icons/md"
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { css } from '@emotion/css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideBar = ({ item }) => {
    const userName = useSelector((state) => state.userProfile.value["account"])
    const authority = useSelector((state) => state.userProfile.value["authority"])

    const navigate = useNavigate();

    let isTeacher
    if (authority === "teacher") {
        isTeacher = true
    } else {
        isTeacher = false
    }

    const [menuCollapse, setMenuCollapse] = useState(false)
    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    //當項目被點時要變黃底
    const [menuItem, setMenuItem] = useState({ profile: false, project: false, comment: false, addProject: false, checkStudent: false, editProject: false, group: false })

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
        } else if (item == 'group') {
            setMenuItem(false)
            setMenuItem({ group: true })
        } else if (item == 'answerSitulation') {
            setMenuItem(false)
            setMenuItem({ answerSitulation: true })
        }

    }

    useEffect(() => {
        menuItemClick(item);
    }, []);

    const aStyle = {
        color: 'black'
    }
    const logout = () => {
        localStorage.setItem('token', "")
        navigate("/login")
    }
    return (
        <div className={style}>
            <div className="sidebar" >
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext">
                            {menuCollapse ?
                                <img src={user} width='50px'></img>
                                :
                                <>
                                    <img src={user} width='80px'></img>
                                    <p> {userName} </p>
                                </>}

                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <BsFillArrowRightCircleFill size={24} />
                            ) : (
                                <BsFillArrowLeftCircleFill size={24} />
                            )}
                        </div>
                        <Menu iconShape="square">

                            <MenuItem active={menuItem.profile} icon={<ImProfile />} onClick={() => menuItemClick('profile')}>
                                <Link to="/profile" style={aStyle}>個人檔案</Link>
                            </MenuItem>


                            {/*<MenuItem active={menuItem.project} icon={<AiFillCode />} onClick={() => menuItemClick('project')}>
                                <a href="./myProject" style={aStyle}>我的成品</a>
                            </MenuItem>*/}


                            {/*<MenuItem active={menuItem.comment} icon={<AiOutlineComment />} onClick={() => menuItemClick('comment')}>
                                收到的評論
                            </MenuItem>*/}

                            {isTeacher ?
                                <>
                                    <MenuItem active={menuItem.addProject} icon={<AiFillFileAdd />} onClick={() => menuItemClick('addProject')}>
                                        <Link to="/addProject" style={aStyle}>新增題目</Link>
                                    </MenuItem>
                                    <MenuItem active={menuItem.editProject} icon={<AiFillEdit />} onClick={() => menuItemClick('editProject')}>
                                        <Link to="/editProject" style={aStyle}>編輯題目</Link>
                                    </MenuItem>
                                    <MenuItem active={menuItem.group} icon={<GrGroup />} onClick={() => menuItemClick('group')}>
                                        <Link to="/group" style={aStyle}>查看分組</Link>
                                    </MenuItem>

                                    <MenuItem active={menuItem.answerSitulation} icon={<MdHomeWork />} onClick={() => menuItemClick('answerSitulation')}>
                                        <Link to="/answerSitulation" style={aStyle}>學生作答情況</Link>
                                    </MenuItem>

                                </>
                                : ''}
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu id="logout">
                            <MenuItem>{menuCollapse ? '' : <Button variant="primary" onClick={logout}>登出</Button>}</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </div>
    );
};

export default SideBar;

const style = css`
    .sidebar {
    float: left;
    }

    .pro-sidebar {
        height: 100vh;
    }

    .closemenu {
        position: absolute;
        right: 0;
        top: 50%;
        z-index: 999;
    }

    .closemenu svg{
        color: black;
    }


    .pro-sidebar {
        min-width: 100%;
    }

    .pro-sidebar.collapsed {
        width: 80px;
        min-width: 80px;
    }

    .pro-sidebar-inner {
        background-color: white !important;
        box-shadow: 0.5px 0.866px 2px 0px rgba(0, 0, 0, 0.15);
    }

    .pro-sidebar-inner .pro-sidebar-layout {
        overflow-y: hidden;
    }

    .pro-sidebar-inner .pro-sidebar-layout .logotext {
        text-align: center;
        padding-top: 10px;
        padding-bottom: 40px;
    }

    .logotext p{
        color: black;
        font-size: 24px;
    }

    .pro-sidebar-inner .pro-sidebar-layout ul {
        padding: 0 5px;
    }

    .pro-sidebar-inner .pro-sidebar-layout ul .pro-inner-item {
        color: #000;
        margin: 10px 0px;
        font-weight: bold;
    }

    .pro-sidebar-inner .pro-sidebar-layout ul .pro-inner-item .pro-icon-wrapper {
        background-color: #fbf4cd !important;
        color: #000;
        border-radius: 3px;
    }

    .pro-sidebar-inner .pro-sidebar-layout .active {
        z-index: -1;
        background-image: linear-gradient(0deg, #fece00 0%, #ffe172 100%);
    }

    #logout {
        text-align: center;
    }

    #logout button {
        min-width: 200px;
    width: auto;
        max-width: 1000px;
    }

    html {
        overflow: hidden;
        background-color: white;
    }
`