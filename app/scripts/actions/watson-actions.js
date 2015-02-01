var WatsonConstants = require('../constants/watson-constants.js');
var WatsonDispatcher = require('../dispatchers/watson-dispatcher.js');

var WatsonActions = {
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