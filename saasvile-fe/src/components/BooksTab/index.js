import React from 'react';
import { Input } from 'semantic-ui-react'
import { Card, Button, Form, Header, Icon, Modal } from 'semantic-ui-react'
import {
    BooksTabContainer,
    CardGroup,
    SearchContainer,
 } from './BooksTab.styles'


export default class BooksTab extends React.PureComponent {
    state = {
        selectedForReservation: null,
    }

    selectForReservation = (book) => {
        this.setState({
            selectedForReservation: {
                id: book.id,
                name: book.name,
            }
        })
    }

    reserveBook = () => {
        this.props.createReservation(
            this.state.selectedForReservation.id,
            this.state.selectedForReservation.member,
        )
        this.setState({selectedForReservation: null})
    }

    renderBooks = () => {
        const books = this.props.books.map(book => {
            const reserved = this.props.reservations.filter(reservation => {
                return reservation.book_id === book.id
            }).length
            const remaining = book.quantity - reserved

            const description = reserved ? 
                `${remaining} out of ${book.quantity} left in stock` :
                `${book.quantity} copies in stock`

            return (
                <Card>
                    <Card.Content>
                        <Card.Header>{book.name}</Card.Header>
                        <Card.Meta>{`by ${book.author}`}</Card.Meta>
                        <Card.Description> {description} </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button 
                                disabled={!remaining} 
                                onClick={() => this.selectForReservation(book)}
                            >
                                Reserve
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            )
        })
        return (
            <React.Fragment>
                {books}
            </React.Fragment>
        )
    }

    renderReservationModal = () => {
        const name = this.state.selectedForReservation.name
        const labelText = `Who would you like to reserve "${name}" for?`

        return (
            <Modal
                open={this.state.selectedForReservation}
                onClose={() => {}}
                size='small'
            >
                <Header icon>
                <Icon name='book' />
                Reserve Book
                </Header>
                <Modal.Content>
                <Form>
                    <Form.Field>
                    <label>{labelText}</label>
                    <Input 
                        onChange={e => {
                            this.setState({
                                selectedForReservation: {
                                    ...this.state.selectedForReservation,
                                    member: e.currentTarget.value
                                }
                            })
                        }}
                        placeholder="Member's name..." 
                    />
                    </Form.Field>
                </Form>
                </Modal.Content>
                <Modal.Actions>
                <Button onClick={() => {this.setState({selectedForReservation: null})}}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button 
                    color='blue' 
                    disabled={!this.state.selectedForReservation.member}
                    onClick={this.reserveBook}
                >
                    <Icon name='checkmark' /> Reserve
                </Button>
                </Modal.Actions>
            </Modal>
        )
    }
    
    render() {
        return (  
            <BooksTabContainer>
                <SearchContainer>
                    <Input 
                        icon={<Icon name='search' inverted circular />}
                        loading={this.props.isFetchingBooks} 
                        onChange={e => this.props.fetchBooks(e.currentTarget.value)}
                        placeholder='Search...' 
                    />
                </SearchContainer>
                <CardGroup>
                    {this.renderBooks()}
                </CardGroup>
                {this.state.selectedForReservation && this.renderReservationModal()}
            </BooksTabContainer>
        )
    }
}