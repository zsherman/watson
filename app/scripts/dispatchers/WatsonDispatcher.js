var Dispatcher = require('./dispatcher');
var merge = require('react/lib/merge');

var WatsonDispatcher = merge(Dispatcher.prototype, {
  handleViewAction: function(action){
    this.dispatch({
      source: 'VIEW_ACTION',
      action:action
    })
  },
  handleAction: function(action){
    this.dispatch({
      source: 'ACTION',
      action:action
    })
  }
})

module.exports = WatsonDispatcher;