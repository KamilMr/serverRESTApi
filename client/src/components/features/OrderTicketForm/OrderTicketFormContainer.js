import { connect } from 'react-redux';
import { addSeatRequest, getRequests } from '../../../redux/seatsRedux';
import OrderTicketForm from './OrderTicketForm';
import { loadSeats } from '../../../redux/seatsRedux';

const mapStateToProps = state => ({
  requests: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  addSeat: (seat) => dispatch(addSeatRequest(seat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTicketForm);