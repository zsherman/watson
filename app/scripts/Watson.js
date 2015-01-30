/** @jsx React.DOM */
var React = require('react');

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

module.exports = Watson;