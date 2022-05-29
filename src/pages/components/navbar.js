import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import logo from '../../src/images/logo.png'
import user from '../../src/images/user.png'
import axios from 'axios';


function Header() {
    const token = localStorage.getItem('token')

    const config = {
        headers: { Authorization: `JWT ${token}` }
    };

    const [hasLogin, setHasLogin] = useState(false)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/userProfile', config)
            .then((res) => {
                setHasLogin(true)
            })
            .catch((error) => setHasLogin(false))
    }, []);

    const navbarStyle = {
        backgroundColor: '#378DFC',
    }

    const logout = () => {
        localStorage.setItem('token', "")
        window.location.href = "/login"
    }
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" style={navbarStyle}>
            <Container>
                <Navbar.Brand href="/"><img src={logo} style={{ width: '30px', marginRight: '5px' }}></img>Java程式教學</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">回首頁</Nav.Link>
                        <Nav.Link href="./projectList">程式練習</Nav.Link>
                        <Nav.Link href="./assessmentList">同儕互評</Nav.Link>
                    </Nav>
                    <Nav>

                        {hasLogin ?
                            <>
                                <NavDropdown title={<img src={user} width='30px'></img>}>
                                    <NavDropdown.Item href="/profile">個人檔案</NavDropdown.Item>
                                    {/*
                            <NavDropdown.Item href="#action/3.2">我的成品</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">收到的評論</NavDropdown.Item>*/}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout}>登出</NavDropdown.Item>
                                </NavDropdown> </> :
                            ""
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;
