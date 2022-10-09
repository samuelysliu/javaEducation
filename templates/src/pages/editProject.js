import Header from '../components/navbar';
import { Row, Col, Container, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SideBar from '../components/sidebar';
import { Link } from "react-router-dom";

function EditProject({apiPath, config}) {
    const [project, setProject] = useState([{ "title": "", "class": "", "content": "", "step1": "",
    "step2": "", "step3": "", "totalStep": "" }])

    useEffect(() => {
        axios.get(apiPath + '/api/project', config).then((res) => {
            setProject(res["data"]["result"]);
        }).catch((error) => console.log(error));

    }, []);

    return (
        <>
            <Header hasLogin={true}/>
            <SideBar item='editProject' />
            <Container>
                <Row>
                    <Col><h1 style={{ fontWeight: "800" }}>題目</h1></Col>
                </Row>
                <Row>

                    <Col>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>標題</th>
                                </tr>
                            </thead>
                            <tbody>
                                {project.map((work, index) => <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td><Link to={'/editProjectContent?projectId=' + work.id + ''}>{work.title}</Link></td>
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

export default EditProject;
