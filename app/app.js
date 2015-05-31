import {render, createFactory} from 'react';
import Dashboard from './components/dashboard';

let dashboard = createFactory(Dashboard);

document.addEventListener('DOMContentLoaded', function() {
    render(
        dashboard(),
        document.getElementById('dashboard'));
});
