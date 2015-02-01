var WatsonDispatcher = require('../dispatchers/WatsonDispatcher');
var EventEmitter = require('events').EventEmitter;
var WatsonConstants = require('../constants/WatsonConstants');
var _ = require('lodash');

// Define initial data points
var _issues = [], _openIssues = true;

function loadIssueData(data) {
  _issues = data;
}

// Extend Cart Store with EventEmitter to add eventing capabilities
var IssueStore = _.extend({}, EventEmitter.prototype, {

  // Return cart items
  getIssues: function() {
    return _issues;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
WatsonDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {

    // Respond to CART_ADD action
    case WatsonConstants.RECEIVE_ISSUES:
      loadIssueData(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  IssueStore.emitChange();

  return true;

});

module.exports = IssueStore;
