/** @jsx React.DOM */

var Watson = React.createClass({
  displayName: 'Watson',

  propTypes: {

  },
  
  mixins: [],
  
  getInitialState: function() {
    return {
      fakeData: {}
    }
  },
  
  componentWillMount: function() {

  },

  componentDidMount: function() {

  },
  
  componentWillUnmount: function() {

  },
  
  render: function() {

    return (
      <Griddle results={this.props.fakeData}/>
    );
  }

});