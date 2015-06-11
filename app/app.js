import {render, createFactory} from 'react';
import App from './components/app';

let app = createFactory(App);

document.addEventListener('DOMContentLoaded', function() {
    let data = JSON.parse(
        document.getElementById('cards').innerHTML.trim()
    );

    render(
        app({ data: data }),
        document.getElementById('dashboard')
    );
});
