import React from 'react';
import { Switch, Route } from "react-router-dom";
import Cookie from 'universal-cookie';
import Home from './Home';
import Plan from './Plan';
import Sitemaps from './SiteMaps';
import Pages from './Pages';


const Layout = (props) => {    
    React.useEffect(() => {
        const cookies = new Cookie();
        const token = cookies.get('token');

        if (!token) {
            props.history.push('/login');
        }
    }, [props])

    return (
        <Switch>
            <Route path="/plans" component={Plan} />
            <Route path="/pages" component={Pages} />
            <Route path="/sitemaps" component={Sitemaps} />
            <Route path="/" component={Home} />
        </Switch>
    )
};

export default Layout;