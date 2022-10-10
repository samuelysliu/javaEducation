import Header from '../components/navbar';
import { Row, Col, Container, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SideBar from '../components/sidebar';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

function ProjectList({ apiPath, config }) {
    const className = useSelector((state) => state.userProfile.value["class"])
    const [project, setProject] = useState([{ title: '', id: '' }])

    useEffect(() => {
        axios.get(apiPath + '/api/project?class=' + className, config).then((res) => {
            setProject(res['data']["result"]);
        }).catch((error) => console.log(error));
    }, [className, config]);

    return (
        <>
            <Header hasLogin={true} />
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
                                        <td><Link to={'/writeCode?projectId=' + work.id}>{work.title}</Link></td>
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
