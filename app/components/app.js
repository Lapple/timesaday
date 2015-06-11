import {Component, createFactory} from 'react';
import {fromJS} from 'immutable';

import Dashboard from './dashboard';

let dashboard = createFactory(Dashboard);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: fromJS(this.getCards())
        };

        this.save = this.save.bind(this);
    }
    getCards() {
        let storedData = JSON.parse(
            localStorage.getItem('timesaday_cards')
        );

        if (storedData && storedData.timestamp > this.props.data.timestamp) {
            return storedData.cards;
        } else {
            return this.props.data.cards;
        }
    }
    save(cards) {
        this.setState({
            cards: cards
        });

        localStorage.setItem(
            'timesaday_cards',
            JSON.stringify({
                timestamp: Date.now(),
                cards: cards.toJS()
            })
        );
    }
    render() {
        return dashboard({
            cards: this.state.cards,
            onChange: this.save
        });
    }
}

export default App;

