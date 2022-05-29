import Header from './components/navbar';
import { Row, Col, Container, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SideBar from './components/sidebar';

function AssessmentList(props) {
    const [project, setProject] = useState([{ title: '', id: '' }])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/addProject?projectId=', props.config).then((res) => {
            setProject(res['data'][0]);
        }).catch((error) => console.log(error));

        console.log(typeof (project));
    }, []);

    return (
        <>
            <Header />
            <SideBar item='' />
            <Container>
                <Row>
                    <Col><h1>互評題目</h1></Col>
                </Row>
                <Row>

                    <Col>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>標題</th>
                                </tr>
                            </thead>
                            <tbody>
                                {typeof project === 'string' ? ""
                                    : project.map((work) => <>
                                        <tr>
                                            <td><a href={'/projectStudentList?projectId=' + work.id + '&title=' + work.title}>{work.title}</a></td>
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

export default AssessmentList;
