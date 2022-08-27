import Header from '../components/navbar';
import { Row, Col, Container, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SideBar from '../components/sidebar';

function MyProject(props) {
    /*useEffect(() => {
        //取得自己所有作品
        axios.get('http://127.0.0.1:8000/api/addProject?projectId=' + projectId, props.config).then((res) => {
          setProject(res['data'].content);
        }).catch((error) => console.log(error));
      }, []);*/
    return (
        <>
            <Header />
            <SideBar item='project' />
            <Container>
                <Row>
                    <Col lg={12} xd={12}><h1>我的成品</h1></Col>
                </Row>
                <Row>

                    <Col>
                    </Col>
                </Row>

            </Container>

        </>
    );
}

export default MyProject;
