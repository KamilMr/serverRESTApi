import React from 'react';
import { Button, Progress, Alert } from 'reactstrap';
import io from 'socket.io-client';
import './SeatChooser.scss';

const ENDPOINT = 'http://localhost:8000';

class SeatChooser extends React.Component {

  componentDidMount() {
    const { loadSeats, loadSeatsData } = this.props;
    console.log(ENDPOINT);
    this.socket = io(ENDPOINT);
    this.socket.on('connection', () => console.log('working'));
    this.socket.on('seatsUpdated', (seats) => loadSeatsData(seats));
    loadSeats();
  }

  componentWillUnmount() {
    clearInterval();
  }

  countFreeSeats = () => {
    const { chosenDay, seats } = this.props;
    const freeSeats = document.getElementById('freeSeats')

    let availableSeats = 50;

    if (seats != '') {
      seats.map((seat) => {
        if (seat.day === chosenDay) {
          availableSeats = availableSeats - 1;
          freeSeats.innerHTML = '<div> <h5>Available Spots</h5><h6> day  ' + chosenDay + ': ' + availableSeats + '/50</h6></div>'
        }else if(seat.day !== chosenDay) {
          freeSeats.innerHTML = '<div> <h5>Available Spots</h5><h6> day  ' + chosenDay + ': ' + availableSeats + '/50</h6></div>'
        }
      })
    }
  }

  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;

    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if (seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if (isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  render() {

    const { prepareSeat } = this;
    const { requests, seats } = this.props;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i + 1))}</div>}
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} />}
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert>}
        <div id="freeSeats">{this.countFreeSeats()}</div>
      </div>
    )
  };
}

export default SeatChooser;