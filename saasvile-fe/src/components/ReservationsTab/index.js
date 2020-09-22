import React from 'react';
import { 
  Button, 
  Header, 
  Icon, 
  Item, 
  Label, 
  Segment 
} from 'semantic-ui-react'

import { ReservationsContainr } from './ReservationsTab.styles'


export default class ResrvationsTab extends React.PureComponent {
    render() {
        const reservations = this.props.reservations.map(reservation => {
          const bookName = this.props.books.find(
            book => book.id === reservation.book_id
          ).name

          const cancelReservation = () => {
            this.props.deleteReservation(reservation.id)
          }

          return (
            <Item>
              <Item.Content>
                <Item.Header as='a'>{bookName}</Item.Header>
                <Item.Meta>
                  <span className='cinema'>
                    {`Reserved by ${reservation.reserved_by}`}
                  </span>
                </Item.Meta>
                <Item.Extra>
                  <Button 
                    basic 
                    compact 
                    negative 
                    floated='right'
                    onClick={cancelReservation}
                  >
                    Cancel Reservation
                    <Icon name='right cancel' />
                  </Button>
                  <Label>{reservation.created_at.split('T')[0]}</Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        })
        
        const content = reservations.length ? (
          <Item.Group divided>
            {reservations}
          </Item.Group>
        ) : (
          <Segment placeholder>
            <Header icon>
              <Icon name='book' />
              Reservations will show up here once you create them
            </Header>
          </Segment>
        )

        return (
          <ReservationsContainr>
            {content}
          </ReservationsContainr>
        )
    }
}