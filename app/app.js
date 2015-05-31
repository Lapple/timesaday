import {render, createFactory} from 'react';
import Dashboard from './components/dashboard';

let dashboard = createFactory(Dashboard);

document.addEventListener('DOMContentLoaded', function() {
    var cards = JSON.parse(
        document.getElementById('cards').innerHTML.trim());

    render(
        dashboard({ cards: cards }),
        document.getElementById('dashboard'));
});
