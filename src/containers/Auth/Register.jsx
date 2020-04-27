import React from 'react';
import { 
    Col, Form, FormGroup, Label, Input, Button, 
    FormText, FormFeedback, UncontrolledDropdown, 
    DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';
import { withApollo } from 'react-apollo';
import Cookie from 'universal-cookie';
import { INSERT_UPSTACKUSER } from './../../graphql/Auth';

const Register = (props) => {
    const [fullname, setName] = React.useState(String);
    const [email, setEmail] = React.useState(String);
    const [password, setPass] = React.useState(String);
    const [confirm, setConfirm] = React.useState(String);
    const [number, setNumber] = React.useState(String);
    const [plan, setPlan] = React.useState(String);
    const [history, setHistory] = React.useState(String);
    const [validate, setValidate] = React.useState(Object);

    const validateEmail = (e) => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
             validate.emailState = 'has-danger'
        }
        setValidate(validate);
    };

    const handleChange = async (event) => {
        const element = event.target;
        const value = event.target.value;

        if (element.id === 'fullname') {
            setName(value);
        };

        if (element.id === 'email') {
            setEmail(value);
        };
        
        if (element.id === 'Password') {
            setPass(value);
        };

        if (element.id === 'ConfirmPassword') {
            setConfirm(value);
        };

        if (element.id === 'phonenumber') {
            setNumber(value);
        };
    };

    const submitForm = (e) =>{
        e.preventDefault();
        props.client.mutate({
            mutation: INSERT_UPSTACKUSER,
            variables: {
                name: fullname,
                email: email,
                pass: password,
                confirm: true,
                number: number
            }
        }).then(res => {
            const id = res.data.createUptrackuser.uptrackuser.id;
            const cookies = new Cookie();
            cookies.set('token', id);
            props.history.push('/');
        });
    };
    return (
        <div className="Login">
            <h2>Register to UpTrack.io</h2>
            <Form className="form" onSubmit={(e) => submitForm(e)}>
                <Col>
                    <FormGroup>
                    <Label>FULL NAME</Label>
                    <Input
                        type="text"
                        name="fullname"
                        id="fullname"
                        placeholder="input full name"
                        defaultValue={ fullname }
                        onChange={(e) => handleChange(e)}
                    />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <Label>EMAIL ADDRESS</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="youremail@mail.com"
                        defaultValue={ email }
                        valid={ validate.emailState === 'has-success' }
                        invalid={ validate.emailState === 'has-danger' }
                        onChange={(e) => handleChange(e)}
                    />
                    <FormFeedback valid>
                        That's a tasty looking email you've got there.
                    </FormFeedback>
                    <FormFeedback>
                        Uh oh! Looks like there is an issue with your email. Please input a correct email.
                    </FormFeedback>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <Label for="Password">PASSWORD</Label>
                    <Input
                        type="password"
                        name="password"
                        id="Password"
                        placeholder="********"
                        defaultValue={ password }
                        onChange={(e) => handleChange(e)}
                    />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <Label for="ConfirmPassword">CONFIRM PASSWORD</Label>
                    <Input
                        type="password"
                        name="confirmpassword"
                        id="confirmpassword"
                        placeholder="********"
                        defaultValue={ confirm }
                        onChange={(e) => handleChange(e)}
                    />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <Label for="PhoneNumber">PHONE NUMBER</Label>
                    <Input
                        type="text"
                        name="phonenumber"
                        id="phonenumber"
                        placeholder=""
                        defaultValue={ number }
                        onChange={(e) => handleChange(e)}
                    />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <UncontrolledDropdown>
                        <DropdownToggle caret>
                            CHOOSE YOUR PLAN
                        </DropdownToggle>
                        <DropdownMenu name = "plan">
                            <DropdownItem>1 MONTH PLAN</DropdownItem>
                            <DropdownItem>15 MONTHS PLAN</DropdownItem>
                            <DropdownItem>6 MONTHS PLAN</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </FormGroup>
                </Col>
                <Col>
                    <div style = {{display: 'flex', justifyContent: 'center'}}>
                        <FormGroup>
                            <Button color="primary" size="lg" block type = "submit">START YOUR TRIAL</Button>
                        </FormGroup>
                    </div>
                </Col>
                
            </Form>
        </div>
    );
}

export default (withApollo(Register));
