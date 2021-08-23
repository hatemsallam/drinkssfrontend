import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button, Modal, Form } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';

class FavDrinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favDrinks: [],
            index: -1,
            drinkName: '',
            showModal: false,
            drinkObj: {}

        }
    }

    componentDidMount() {
        const { user } = this.props.auth0
        axios
            .get('http://localhost:3010/favDrinks', { params: { userEmail: user.email } })
            .then(result => {
                this.setState({
                    favDrinks: result.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    deleteDrink = (idx) => {
        const { user } = this.props.auth0;
        console.log('hi')
        
        axios
            .delete(`http://localhost:3010/deleteDrink/${idx}`, { params: { userEmail: user.email } })
            .then(result => {
                this.setState({
                    favDrinks: result.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateDrink = (drink, idx) => {
        console.log('update')
        this.setState({
            index: idx,
            drinkName: drink.drinkName,
            showModal: true,
            drinkObj: drink
        });

    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }


    submitHandler = (event) => {
        event.preventDefault();
        this.closeModal()
        console.log('submit')
        const newName = event.target.drinkName.value
        const newDrinkObj = {
            drinkName: newName,
            drinkImg: this.state.drinkObj.drinkImg
        }
        const { user } = this.props.auth0
        const params = {
            userEmail: user.email,
            drinkObj: newDrinkObj
        }
        axios
            .put(`http://localhost:3010/updateDrink/${this.state.index}`, params)
            .then(result => {
                this.setState({
                    favDrinks: result.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }








    render() {
        return (
            <>
                {this.state.favDrinks.length && this.state.favDrinks.map((drink, idx) => {
                    return (
                        <>
                            <Card style={{ width: '18rem', display: 'inline-block' }}>
                                <Card.Img variant="top" src={drink.drinkImg} />
                                <Card.Body>
                                    <Card.Title>{drink.drinkName}</Card.Title>
                                    <Button onClick={() => { this.deleteDrink(idx) }} variant="primary">Delete</Button>
                                    <Button onClick={() => { this.updateDrink(drink, idx) }} variant="primary">Update</Button>
                                </Card.Body>
                            </Card>
                            {this.state.showModal &&
                                <Modal show={this.state.showModal} onHide={this.closeModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Form</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body><Form onSubmit={this.submitHandler}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Drink Name</Form.Label>
                                            <Form.Control type="text" name='drinkName' defaultValue={this.state.drinkName} />
                                            
                                        </Form.Group>
                                        <Button variant="primary" type='submit'>
                                            Update
                                        </Button>
                                    </Form></Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.closeModal}>
                                            Close
                                        </Button>
                                     
                                    </Modal.Footer>
                                </Modal>
                            }
                        </>
                    )
                })

                }
            </>
        )
    }
}

export default withAuth0(FavDrinks);