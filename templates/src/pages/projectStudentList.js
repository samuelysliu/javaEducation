import Header from '../components/navbar';
import { Row, Col, Container, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SideBar from '../components/sidebar';
import { useSearchParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function ProjectStudentList({apiPath, config}) {
    const [params, setParams] = useSearchParams();
    const [studentList, setStudentList] = useState([{ projectId: '', owener: '', filePath: '' }])

    useEffect(() => {
        axios.get(apiPath+'/api/projectStudent?projectId=' + params.get('projectId'), config).then((res) => {
            console.log(res["data"]["result"])
            setStudentList(res["data"]["result"]);
        }).catch((error) => console.log(error));

    }, []);

    return (
        <>
            <Header hasLogin={true} />
            <SideBar item='' />
            <Container>
                <Row>
                    <Col><h1>{params.get('title')}</h1></Col>
                </Row>
                <Row>

                    <Col>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>作答學生</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.map((student) => <>
                                    <tr>
                                    <td><Link to={'/assessment?projectId=' + student.projectId + '&owner=' + student.account}>{student.account}</Link></td>
                                    </tr>
                                </>)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Container>

        </>
    );
}

export default ProjectStudentList;
