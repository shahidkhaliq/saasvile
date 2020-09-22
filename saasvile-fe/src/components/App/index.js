import React from 'react';
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import { AppContainer } from './App.styles'
import BooksTab from 'components/BooksTab'
import ReservationsTab from 'components/ReservationsTab'
import {
  fetchBooks,
  fetchReservations,
  createReservation,
  deleteReservation,
} from 'store/actions'

class UnconnectedApp extends React.Component {
  componentDidMount() {
      this.props.fetchBooks()
      this.props.fetchReservations()
  }

  getPanes = () => {
    return [
      { 
        menuItem: 'Books', 
        render: () => <BooksTab {...this.props}/> 
      },
      { 
        menuItem: 'Current Reservations', 
        render: () => <ReservationsTab {...this.props}/> 
      },
    ]
  }

  render() { 
    return (
      <AppContainer>
        <Tab panes={this.getPanes()} />
      </AppContainer>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    books,
    reservations,
    isFetchingBooks,
    isFetchingReservations
  } = state

  return {
    books, 
    reservations, 
    isFetchingBooks, 
    isFetchingReservations,
  }
}

const mapDispatchToProps = {
  fetchBooks,
  fetchReservations,
  createReservation,
  deleteReservation,
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedApp)

