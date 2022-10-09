import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import logo from '../images/logo.png'
import user from '../images/user.png'
import { css } from '@emotion/css'
import { useNavigate } from "react-router-dom";
import { PathHook } from '../components/pathHook'
import { useEffect, useState } from 'react'

function Header({ hasLogin }) {
    PathHook()
    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem('token', "")
        navigate("/login")
    }

    return (
        <div className={style}>
            <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
                <Container>
                    <Navbar.Brand><Link to="/"><img src={logo} style={{ width: '30px', marginRight: '5px' }}></img>Java程式教學</Link></Navbar.Brand>
                    {hasLogin ?
                        <>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link><Link to="/">回首頁</Link></Nav.Link>
                                    <Nav.Link><Link to="/projectList">程式練習</Link></Nav.Link>
                                    <Nav.Link><Link to="/assessmentList">同儕互評</Link></Nav.Link>
                                </Nav>
                                <Nav>
                                    <NavDropdown title={<img src={user} width='30px'></img>}>
                                        <NavDropdown.Item><Link to="/profile"><font>個人檔案</font></Link></NavDropdown.Item>
                                        {/*
                            <NavDropdown.Item href="#action/3.2">我的成品</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">收到的評論</NavDropdown.Item>*/}
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logout}><font>登出</font></NavDropdown.Item>
                                    </NavDropdown>

                                </Nav>

                            </Navbar.Collapse>
                        </>
                        :
                        ""
                    }
                </Container>
            </Navbar >
        </div>
    );
}

export default Header;

const style = css`
    .navbar{
        background-color: #378DFC;
    }
    a{
        color: white;
        text-decoration: none;
    }

    font{
        color: black
    }

`
