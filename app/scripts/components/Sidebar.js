/** @jsx React.DOM */

var React = window.React = require('react'),
    Github = require('github-api');

var Sidebar = React.createClass({
  displayName: 'Sidebar',

  propTypes: {

  },

  mixins: [],

  getInitialState: function() {
    return {}
  },

  getDefaultProps: function() {

  },

  componentWillMount: function() {
  },

  componentDidMount: function() {

  },

  componentWillUnmount: function() {

  },

  authWithGithub: function() {
    // https://developer.github.com/v3/oauth/#scopes
    var ref = new Firebase("https://flickering-inferno-8924.firebaseio.com");
      ref.authWithOAuthPopup("github", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          window.github = new Github({
            token: authData.github.accessToken,
            auth: "oauth"
          });
          window.user = github.getUser();
          user.repos(function(err, repos) {
            console.log(repos);
          });
          console.log("Authenticated successfully with payload:", authData);
        }
      }, {
        sessionOnly: true,
        scope: "user,repo,read:org"
      });
  },

  render: function() {
    return(
      <ul className="sidebar-nav">
          <li className="sidebar-brand">
              <a href="#">
                  Watson
              </a>
          </li>
          <li>
              <a href="#">Dashboard</a>
          </li>
          <li>
              <a href="#" onClick={this.authWithGithub}>Auth With Github</a>
          </li>
      </ul>
    );
  }
});

module.exports = Sidebar;