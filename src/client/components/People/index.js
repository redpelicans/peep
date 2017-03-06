import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAlert } from '../../actions/message';

const App = ({ addAlert }) => {
  const sendAlert = () => addAlert({ type: 'success', message: 'test', description: 'this is a test.' });
  return (
    <div>
      <div> People </div>
      <a onClick={sendAlert}>Send Alert</a>
    </div>
  );
};

App.propTypes = {
  addAlert: React.PropTypes.func.isRequired,
};

const people = [
  {
    prefix: 'Mrs',
    firstName: 'Julie',
    lastName: 'SANCHEZ',
    tags: ['test', 'test2'],
    companyName: 'redPelicans',
    avatar: { color: '#4285f4', type: 'color' },
  },
  {
    prefix: 'Mrs',
    firstName: 'Loucas',
    lastName: 'RODRIGUAIZ',
    tags: ['test'],
    companyName: 'redPelicans',
    avatar: { color: '#4285f4', type: 'color' },
  },
  {
    prefix: 'Mrs',
    firstName: 'So',
    lastName: 'Zidane',
    tags: ['test', 'test2'],
    companyName: 'redPelicans',
    avatar: { color: '#4285f4', type: 'color' },
  },
];

export class People extends Component {
  // componentWillMount() {
  //   const { loadPeople } = this.props;
  //   loadPeople();
  // }
  render() {
    // const { people } = this.props;
    return (
      <div>
        <List people={people} />
      </div>
    );
  }
}

// People.propTypes = {
//   people: PropTypes.object.isRequired,
// };

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  addAlert: bindActionCreators(addAlert, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
