import {render, createFactory} from 'react';
import App from './components/app';

let app = createFactory(App);

document.addEventListener('DOMContentLoaded', function() {
    let cards = JSON.parse(
        document.getElementById('cards').innerHTML.trim()
    );

    render(
        app({ cards: cards }),
        document.getElementById('dashboard')
    );
});
