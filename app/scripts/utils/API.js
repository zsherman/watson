var WatsonActions = require('../actions/WatsonActions');

module.exports = {

  getIssueData: function() {
    // get issues and github events from firebase
    var firebaseIssues = new Firebase('flickering-inferno-8924.firebaseIO.com/issues');
    var issues = [];
    firebaseIssues.once("value", function(snapshot) {
      _.forEach(snapshot.val(), function(issue){
        issues.push({
          "Repo": issue.repo,
          "Number": issue.number,
          "Title": issue.title,
          "Status": issue.state,
          "URL": issue.html_url,
          "Labels": issue.labels !== undefined ? issue.labels : []
        });
      });
      WatsonActions.receiveIssues(issues);
      console.log("Issue Data");
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },

  getUserData: function() {
    console.log("User Data");
  },

  getRepoData: function() {
    console.log("Repo Data");
  }

};