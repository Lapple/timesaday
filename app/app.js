import {render, createFactory} from 'react';
import App from './components/app';

let app = createFactory(App);

document.addEventListener('DOMContentLoaded', function() {
    let data = JSON.parse(
        document.getElementById('cards').innerHTML.trim()
    );

    let storedData = JSON.parse(
        localStorage.getItem('timesaday_cards')
    );

    let mostRecentData = (
        (storedData && storedData.timestamp > data.timestamp) ?
            storedData :
            data
    );

    render(
        app({
            cards: mostRecentData.cards,
            onUpdate: (cards) => {
                localStorage.setItem(
                    'timesaday_cards',
                    JSON.stringify({
                        timestamp: Date.now(),
                        cards: cards
                    })
                );
            }
        }),
        document.getElementById('dashboard')
    );
});
