import React from 'react';
import { withApollo } from 'react-apollo';
import { 
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Col, Form, FormGroup, Label, Input, Table, Nav, NavItem, NavLink
} from 'reactstrap';
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import SiteMapsProgress from '../../components/SiteMapsProgress';
import Query from '../../components/Query';
import Header from '../../components/Header'
import { SITEMAPS_QUERY, SITEMAPS_INSERT, SITEMAPS_UPDATE, SITEMAPS_DELETE } from '../../graphql/Sitemaps'

const SiteMaps = (props) => {
    const [flag, setFlag] = React.useState(true);
    const [mysitemaps, setSitemaps] = React.useState(Array);
    const [id, setID] = React.useState(0);
    const [name, setName] = React.useState(String);
    const [url, setUrl] = React.useState(String);
    const [content, setContent] = React.useState(Object);
    const [modal, setModal] = React.useState(false);
    const [validate, setValidate] = React.useState(Object);
    const [show, setShow] = React.useState(false);
    const [showID, setShowID] = React.useState(0);

    React.useEffect(() => {
        props.client.query({query: SITEMAPS_QUERY}).then(res => {
            const data = res.data;
            if (data.sitemaps.length > 0)
                setSitemaps(data.sitemaps);
        });
    }, [props])

    const onToggle = () => {
        setModal(!modal);
    };

    const validateInputSite = (event) => {
        var val;
        if (event.target.value === '') {
            val.inputState = 'has-danger'
        } else {
            val.inputState = 'has-success'
        }
        setValidate(val)
    };

    const handleChange = (event) => {
        const field = event.target.id;
        if (field === 'name') {
            setName(event.target.value);
        } else {
            setUrl(event.target.value);
        }
    };

    const onShow = (sitemap) => {
        setShow(!show);
        if (show) {
            setShowID(sitemap.id);
            setName(sitemap.name);
            setUrl(sitemap.URL);
        } else {
            setShowID(0);
        }
    };

    const onUpdate = (sitemap) => {
        setContent(sitemap);
        onToggle();
        setFlag(false);
        setID(sitemap.id);
        setName(sitemap.name);
        setUrl(sitemap.URL);
    };

    const onDelete = (index) => {
        props.client.mutate({
            mutation: SITEMAPS_DELETE,
            variables: {
                index: index
            }
        }).then(res => {
            if (res.data.deleteSitemap.sitemap) {
                const data = res.data.deleteSitemap.sitemap;
                const newSitemaps = mysitemaps.filter(sitemap => sitemap.id !== data.id);
                setSitemaps(newSitemaps);
            }
        });
    };

    const onProcess = (sitemap) => {
        const url = "https://uptrackio.herokuapp.com/collect";
        console.log(sitemap, url);
    }

    const handleInsert = () => {
        props.client.mutate({
            mutation: SITEMAPS_INSERT,
            variables: {
                name: name,
                URL: url
            }
        }).then(res => {
            if (res.data.createSitemap.sitemap) {
                const data = res.data.createSitemap.sitemap;
                setSitemaps([...mysitemaps, data]);
                onToggle();
            }
        });
    };

    const handleUpdate = () => {
        props.client.mutate({
            mutation: SITEMAPS_UPDATE,
            variables: {
                index: id,
                name: name,
                url: url
            }
        }).then(res => {
            if (res.data.updateSitemap.sitemap) {
                const data = res.data.updateSitemap.sitemap;
                const newSitemaps = mysitemaps.map(sitemap => sitemap.id === data.id ? data : sitemap);
                setSitemaps(newSitemaps);
                onToggle();
                setContent({
                    name: '',
                    URL: ''
                })
            }
            
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
        if (flag) {
            handleInsert();
        } else {
            handleUpdate();
        }
    }

    const closeBtn = <button className="close" onClick={onToggle}>&times;</button>;

    return (
        <div className='SiteMaps'>
            <Header />
            <Query query={SITEMAPS_QUERY} id={null}>
                {({ data: { sitemaps } }) => {
                    return (
                        <div>
                            <Nav horizontal>
                                <NavItem>
                                    <NavLink href="/">HOME</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/sitemaps">SITE MAPS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/plans">PLANS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/pages">PAGES</NavLink>
                                </NavItem>
                            </Nav>
                            <Modal isOpen={modal} toggle={onToggle}>
                                <ModalHeader toggle={onToggle} close={closeBtn}>Site Map</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <Col>
                                            <FormGroup>
                                                <Label for="Name">Name:</Label>
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="site map name"
                                                    defaultValue={content.name}                                                    
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="Name">URL:</Label>
                                                <Input
                                                    type="text"
                                                    name="url"
                                                    id="url"
                                                    placeholder="https://"
                                                    defaultValue={content.URL}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={handleSubmit}>Save</Button>{' '}
                                    <Button color="secondary" onClick={onToggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <div className="sitemapTopbar">
                                <h2> Site Maps</h2>
                                <Button color="primary" size="lg" outline onClick={onToggle}>Add New</Button>
                            </div>
                            <Table responsive>
                                <thead>
                                    <tr dark>
                                        <th>Sr#</th>
                                        <th>Name</th>
                                        <th>URL</th>
                                        <th>Process</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mysitemaps.map((sitemap, index) => 
                                        <tr key = { index }>
                                            <th scope="row">{index + 1}</th>
                                            <td>{sitemap.name}</td>
                                            <td>{sitemap.URL}</td>
                                            <td>
                                                <Button color="primary" onClick={() => onProcess(sitemap)}>Process</Button>
                                            </td>
                                            <td>
                                                <Button color="primary" outline onClick={() => onShow(sitemap)}> <AiOutlineEye /></Button>
                                                <Button color="primary" outline onClick={() => onUpdate(sitemap)}><AiOutlineEdit /></Button>
                                                <Button color="primary" outline onClick={() => onDelete(sitemap.id)}><AiOutlineDelete /> </Button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            {(show &&
                                <SiteMapsProgress name = {name} URL = {url} percent = {(showID+1)*10}/>
                            )}
                        </div>
                    );
                }}
            </Query>
        </div>
    );    
}

export default (withApollo(SiteMaps));