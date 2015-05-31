var React = require('react');

var Dashboard = require('./components/dashboard');
var dashboard = React.createFactory(Dashboard);

document.addEventListener('DOMContentLoaded', function() {
    React.render(
        dashboard(),
        document.getElementById('dashboard'));
});
