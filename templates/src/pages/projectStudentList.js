import Header from '../components/navbar';
import { Row, Col, Container, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SideBar from '../components/sidebar';
import { useSearchParams } from 'react-router-dom';

function ProjectStudentList(props) {
    const apiPath = 'http://localhost:8000'
    const [params, setParams] = useSearchParams();
    const [studentList, setStudentList] = useState([{ projectId: '', owener: '', filePath: '' }])

    useEffect(() => {
        axios.get(apiPath+'/api/projectStudentList?projectId=' + params.get('projectId'), props.config).then((res) => {
            setStudentList(res['data']);
        }).catch((error) => console.log(error));

    }, []);

    return (
        <>
            <Header />
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
                                    <td><a href={'/assessment?projectId=' + student.projectId + '&owner=' + student.owner}>{student.owner}</a></td>
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
