import {Component, createFactory} from 'react';
import {fromJS} from 'immutable';

import Dashboard from './dashboard';

let dashboard = createFactory(Dashboard);

class App extends Component {
    constructor(props) {
        super(props);

        let storedCards = JSON.parse(
            localStorage.getItem('timesaday_cards')
        );

        this.state = {
            cards: fromJS(storedCards || props.cards)
        };

        this.save = this.save.bind(this);
    }
    save(cards) {
        this.setState({
            cards: cards
        });

        localStorage.setItem(
            'timesaday_cards',
            JSON.stringify(cards.toJS())
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

