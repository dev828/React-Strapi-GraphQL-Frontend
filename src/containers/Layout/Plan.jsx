import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Header from './../../components/Header';
import Query from './../../components/Query';
import { PLANS_QUERY } from './../../graphql/Plan';
import './../../assets/card.css';

const Plan = (props) => {
    return (
        <div>    
            <Header />    
            <Query query={PLANS_QUERY} id={null}>
                {({ data: { plans } }) => {
                    return (
                        <div>
                            {plans.map((plan, i) => {
                                return (
                                    <div className="columns">
                                        <ul className="price">
                                            {i === '0' && (<li className="header1" >{plan.title}</li>)}
                                            {i === '1' && (<li className="header2" >{plan.title}</li>)}
                                            {i === '2' && (<li className="header3" >{plan.title}</li>)}
                                            <li className="grey">${plan.price}</li>
                                            <li >per month</li>
                                            {i === '1' && (<li >MOST POPULAR</li>)}
                                            <li>{plan.description}</li>
                                            <li class="grey"><a href="#" className="button">Sign Up</a></li>
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }}
            </Query>
        </div>
    );
};

export default Plan;