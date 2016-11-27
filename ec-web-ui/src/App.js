import React, {Component} from "react";
import logo from "./jjug_logo@2x.png";
import duke from "./duke.png";
import {
    Container,
    Form,
    FormField,
    FormInput,
    FormNote,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Pill,
    Glyph
} from "elemental";
import customerClient from "./CustomerClient";

class App extends Component {

    constructor(props) {
        super(props);
        let initForm = {
            name: {value: '', valid: true},
            email: {value: '', valid: true}
        };
        this.state = {
            form: JSON.parse(JSON.stringify(initForm)) /* copy */,
            initForm: initForm,
            isLoading: false,
            modalIsOpen: false,
            createdCustomer: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    render() {
        return (
            <Container>
                <img src={logo} alt="JJUG"/>
                <h2>Welcome to JJUG Shop</h2>
                <fieldset>
                    <legend><Pill label="Signup" type="success-inverted"/></legend>
                    <Form type="inline" onSubmit={this.handleSubmit}>
                        <FormField label="Name" htmlFor="inline-form-input-name">
                            <FormInput type="text" placeholder="Full Name" id="name" name="name"
                                       value={this.state.form.name.value}
                                       required
                                       onChange={this.handleChange}/>
                            {this.state.form.name.valid || (<FormNote type="danger">Name is required.</FormNote>)}
                        </FormField>
                        <FormField label="Email address" htmlFor="inline-form-input-email">
                            <FormInput type="email" placeholder="Email" id="email" name="email"
                                       value={this.state.form.email.value}
                                       required
                                       onChange={this.handleChange}/>
                            {this.state.form.email.valid || (<FormNote type="danger">Email is required.</FormNote>)}
                        </FormField>
                        <FormField>
                            <Button submit onClick={this.handleSubmit} disabled={this.state.isLoading}><Glyph
                                icon="plus"/> Submit</Button>
                        </FormField>
                    </Form>
                </fieldset>
                <Modal isOpen={this.state.modalIsOpen} onCancel={this.toggleModal} backdropClosesModal>
                    <ModalHeader text="Welcome to JJUG Shop!!" showCloseButton
                                 onClose={this.toggleModal}/>
                    {this.state.createdCustomer && (
                        <ModalBody>
                            Hello {this.state.createdCustomer.name}!!<br />
                            <img src={duke} alt="Duke"/>
                            <br />
                            See <a
                            href={this.state.createdCustomer._links.self.href}>{this.state.createdCustomer._links.self.href}</a>
                        </ModalBody>
                    )}
                    <ModalFooter>
                        <Button type="primary" onClick={this.toggleModal}>Close modal</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }

    handleChange(event) {
        let propertyName = event.target.id;
        let newForm = this.state.form;
        newForm[propertyName] = {value: event.target.value, valid: true};
        this.setState({form: newForm});
    }

    handleSubmit(event) {
        event.preventDefault();
        let newForm = this.state.form;
        let valid = true;
        if (!this.state.form.name.value) {
            newForm.name.valid = false;
            valid = false;
        }
        if (!this.state.form.email.value) {
            newForm.email.valid = false;
            valid = false;
        }
        if (!valid) {
            this.setState({form: newForm});
            return;
        }

        let customer = {};
        for (let key in this.state.form) {
            if (this.state.form.hasOwnProperty(key)) {
                customer[key] = this.state.form[key].value;
            }
        }
        this.setState({isLoading: true});
        customerClient.create(customer).then(x => {
            this.setState({
                isLoading: false,
                form: JSON.parse(JSON.stringify(this.state.initForm)) /* copy */,
                createdCustomer: x
            });
            this.toggleModal();
        });

    }

    toggleModal() {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }
}

export default App;
