import React from 'react';
import { Col, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import { withApollo } from 'react-apollo';
import Cookie from 'universal-cookie';
import { GET_UPSTACKUSER } from './../../graphql/Auth';

const Login = (props) => {
    const [email, setEmail] = React.useState(String);
    const [password, setPass] = React.useState(String);
    const [validate, setValidate] = React.useState(Object);
    const cookies = new Cookie();

    const validateEmail = (e) => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        };
        setValidate(validate);
    }

    const handleChange = async (event) => {
        const element = event.target;
        const value = element.value;
        
        if (element.id === 'exampleEmail') {
            setEmail(value);
        };

        if (element.id === 'examplePassword') {
            setPass(value);  
        };
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.client.query({query: GET_UPSTACKUSER, variables: {where: {
            email: email,
            password: password
        }}}).then(res => {
            if (res.data.uptrackusers.length > 0) {
                cookies.set('token', res.data.uptrackusers.id);
                props.history.push('/');
            } else {
                return false;
            }
        });
    }

    return (
        <div className="Login">
            <h2>Sign In</h2>
            <Form className="form" onSubmit={(e) => submitForm(e)}>
                <Col>
                    <FormGroup>
                        <Label>UserEmail</Label>
                        <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="myemail@email.com"
                            defaultValue={email}
                            valid={validate.emailState === 'has-success'}
                            invalid={validate.emailState === 'has-danger'}
                            onChange={(e) => {
                                validateEmail(e)
                                handleChange(e)
                            }}
                        />
                        <FormFeedback valid>
                            That's a tasty looking email you've got there.
                        </FormFeedback>
                        <FormFeedback>
                            Uh oh! Looks like there is an issue with your email. Please input a correct email.
                        </FormFeedback>
                        <FormText>Your email is most likely your email.</FormText>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="********"
                            defaultValue={password}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormGroup>
                </Col>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <FormGroup>
                        <Button color="primary" size="lg" block type = "submit">Login</Button>
                    </FormGroup>
                </div>
            </Form>
        </div>
    );
}

export default (withApollo(Login));
