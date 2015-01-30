/** @jsx React.DOM */

var React = window.React = require('react'),
    Griddle = require('griddle-react'),
    Timer = require("./ui/Timer"),
    mountNode = document.getElementById("watson-app");


// get issues and github events from firebase
var firebaseIssues = new Firebase('flickering-inferno-8924.firebaseIO.com/issues');
var githubEvents = new Firebase('flickering-inferno-8924.firebaseIO.com/github-events');

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

var Watson = React.createClass({
  displayName: 'Watson',

  propTypes: {

  },
  
  mixins: [],
  
  getInitialState: function() {
    return {
      issueList: []
    }
  },

  getDefaultProps: function() {

  },
  
  componentWillMount: function() {

  },

  componentDidMount: function() {
    var that = this;
    var issueList = []
    firebaseIssues.once("value", function(snapshot) {
      _.forEach(snapshot.val(), function(issue){
        issueList.push({
          "Repo": issue.repo,
          "Number": issue.number,
          "Title": issue.title,
          "Status": issue.state,
          "URL": issue.html_url,
          "Labels": issue.labels
        });
      });
      that.setState({issueList: issueList});
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    this.initializeEvents();
  },
  
  componentWillUnmount: function() {

  },

  initializeEvents: function() {
    var that = this;
    // grab all items from the issues table on firebase and add them to a list
    // when new github events are added, add the new item to the github event list created on page load
    firebaseIssues.on("child_added", function(snapshot) {
      var issue = snapshot.val();
      that.state.issueList.push({
          "Repo": issue.repo,
          "Number": issue.number,
          "Title": issue.title,
          "Status": issue.state,
          "URL": issue.html_url,
          "Labels": issue.labels
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
