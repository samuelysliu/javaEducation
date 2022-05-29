import Header from './components/navbar';
import { Row, Col, Container, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SideBar from './components/sidebar';

function ProjectList(props) {
    const [project, setProject] = useState([{ title: '', id: ''}])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/addProject?projectId=', props.config).then((res) => {
            setProject(res['data'][0]);
        }).catch((error) => console.log(error));

    }, []);

    return (
        <>
            <Header />
            <SideBar item='' />
            <Container>
                <Row>
                    <Col><h1>題目</h1></Col>
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
                                {project.map((work) => <>
                                    <tr>
                                    <td><a href={'/writeCode?projectId=' + work.id + ''}>{work.title}</a></td>
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

export default ProjectList;
