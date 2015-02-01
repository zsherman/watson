/** @jsx React.DOM */

var React = window.React = require('react'),
    IssueStore = require('./stores/IssueStore'),
    Griddle = require('griddle-react'),
    Timer = require("./ui/Timer"),
    WatsonAPI = require("./utils/API")
    mountNode = document.getElementById("watson-app");

WatsonAPI.getIssueData();

var TitleComponent = React.createClass({
  render: function(){
    var url = this.props.rowData.URL;
    return <a href={url}>{this.props.rowData.Title}</a>
  }
});

var LabelComponent = React.createClass({
  render: function(){
    var labelList;
    var hasLabels;
    var labelArr = this.props.rowData.Labels;

    hasLabels = typeof labelArr !== 'undefined' ? true : false;

    if(hasLabels) {
      labelList = labelArr.map(function(label) {
        var labelStyle = {
          color: "#fff",
          background: "#" + label.color
        }
        return <span className="label-wrapper" style={labelStyle}><a href={label.url} className="label">{label.name}</a></span>
      });
    } else {
      labelList = <span>No Labels</span>
    }

    return <span>{labelList}</span>
  }
});

var columnMeta = [
  {
    "columnName": "Title",
    "order": 2,
    "locked": false,
    "visible": true,
    "customComponent": TitleComponent
  },
  {
    "columnName": "ID",
    "order": 1,
    "visible": true,
  },
  {
    "columnName": "URL",
    "visible": false
  },
  {
    "columnName": "Labels",
    "locked": false,
    "visible": true,
    "customComponent": LabelComponent
  },
];

// Method to retrieve state from Stores
function getWatsonState() {
  return {
    issueList: IssueStore.getIssues()
  };
}

var Watson = React.createClass({
  displayName: 'Watson',

  propTypes: {

  },

  mixins: [],

  getInitialState: function() {
    return getWatsonState();
  },

  getDefaultProps: function() {

  },

  componentWillMount: function() {

  },

  componentDidMount: function() {
    this.initializeEvents();
  },

  componentWillUnmount: function() {

  },

  initializeEvents: function() {
    var that = this;
    // grab all items from the issues table on firebase and add them to a list
    // when new github events are added, add the new item to the github event list created on page load
    var firebaseIssues = new Firebase('flickering-inferno-8924.firebaseIO.com/issues');
    firebaseIssues.on("child_added", function(snapshot) {
      var issue = snapshot.val();
      // TODO WAIT FOR ONCE TO FINISH THIS IS BEING RUN EVERY TIME
      that.state.issueList.push({
          "Repo": issue.repo,
          "Number": issue.number,
          "Title": issue.title,
          "Status": issue.state,
          "URL": issue.html_url,
          "Labels": issue.labels !== undefined ? issue.labels : []
      });
      that.forceUpdate();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },

  render: function() {
    return (
      <Griddle showFilter={true}
               resultsPerPage={20}
               useGriddleStyles={false}
               tableClassName={"table table-striped table-bordered"}
               columns={["Repo", "Number", "Title", "Status", "Labels", "URL"]}
               data={this.state.issueList}
               results={this.state.issueList}
               columnMetadata={columnMeta}/>
    );
  }
});

React.render(
  Watson({
    fakeData: {}
  }),
  document.getElementById('watson-app')
);
