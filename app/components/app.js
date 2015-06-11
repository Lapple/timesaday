import {Component, createFactory} from 'react';
import {fromJS} from 'immutable';

import Dashboard from './dashboard';

let dashboard = createFactory(Dashboard);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: fromJS(this.props.cards)
        };

        this.save = this.save.bind(this);
    }
    save(cards) {
        this.setState({
            cards: cards
        });

        this.props.onUpdate(
            cards.toJS()
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

