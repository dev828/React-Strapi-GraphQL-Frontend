import React from 'react';
import { Table, Nav, NavItem, NavLink, Col, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import Query from './../../components/Query';
import Header from './../../components/Header';
import { PAGES_QUERY } from './../../graphql/Pages';

const Pages = (props) => {
    return (
        <div>   
            <Header />
            <h1>Pages</h1>
            <Query query={PAGES_QUERY} id={null}>
                {({ data: { pages } }) => {
                    return (
                        <div>
                            <Table responsive>
                                <thead>
                                    <tr>
                                    <th>Sr#</th>
                                    <th>Date</th>
                                    <th>URL</th>
                                    <th>in Cache</th>
                                    <th>Status</th>
                                    <th>Time</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.map((page, i) => {
                                        return (
                                            <tr>
                                            <th scope="row">1</th>
                                            <td>{page.datetry}</td>
                                            <td>{page.URL}</td>
                                            <td>{page.incache}</td>
                                            <td>{page.status}</td>
                                            <td>{page.timeduration}</td>
                                            <td>
                                                <Button color="primary" outline >Purge Cache</Button>
                                            </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    );
                }}
            </Query>
        </div>
    );
};

export default Pages;
