import {Component, createFactory, DOM as D} from 'react';
import {fromJS} from 'immutable';

import cards from '../../cards';

import CountCard from './count-card';
import TimeCard from './time-card';

let countCard = createFactory(CountCard);
let timeCard = createFactory(TimeCard);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: fromJS(cards)
        };
    }
    save(index, value) {
        this.setState({
            cards: this.state.cards.set(index, value)
        });
    }
    render() {
        return D.div({ className: 'dashboard' },
            this.state.cards.map(this.renderCard, this));
    }
    renderCard(c, index) {
        if (isTimeCard(c)) {
            return D.div({ className: 'dashboard__item', key: index },
                timeCard({
                    card: c,
                    onSave: this.save.bind(this, index)
                })
            );
        } else {
            return D.div({ className: 'dashboard__item', key: index },
                countCard({
                    card: c,
                    onSave: this.save.bind(this, index)
                })
            );
        }
    }
};

function isTimeCard(c) {
    return typeof c.get('time') === 'number';
}

export default Dashboard;
