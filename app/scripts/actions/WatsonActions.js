var WatsonConstants = require('../constants/WatsonConstants.js');
var WatsonDispatcher = require('../dispatchers/WatsonDispatcher.js');

var WatsonActions = {
  // Receive inital product data
  receiveIssues: function(data) {
    WatsonDispatcher.handleAction({
      actionType: WatsonConstants.RECEIVE_ISSUES,
      data: data
    })
  },

  addIssue:function(issue){
    WatsonDispatcher.handleViewAction({
      actionType: WatsonConstants.ADD_ISSUE,
      issue: issue
    })
  },
  removeIssue:function(index){
    WatsonDispatcher.handleViewAction({
      actionType: WatsonConstants.REMOVE_ISSUE,
      index: index
    })
  }
}

module.exports = WatsonActions;