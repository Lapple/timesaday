import {Component, createFactory, DOM as D} from 'react';

import CountCard from './count-card';
import TimeCard from './time-card';
import NewCard from './new-card';

let countCard = createFactory(CountCard);
let timeCard = createFactory(TimeCard);
let newCard = createFactory(NewCard);

class Dashboard extends Component {
    save(index, value) {
        this.props.onChange(
            this.props.cards.set(index, value)
        );
    }
    delete(index) {
        this.props.onChange(
            this.props.cards.delete(index)
        );
    }
    render() {
        return (
            D.div({ className: 'dashboard' },
                this.props.cards.map(this.renderCard, this),
                D.div({ className: 'dashboard__item' },
                    newCard({
                        onSave: this.save.bind(this, this.props.cards.size)
                    })
                )
            )
        );
    }
    renderCard(c, index) {
        return D.div({ className: 'dashboard__item', key: index },
            (
                isTimeCard(c) ?
                    timeCard({
                        card: c,
                        onSave: this.save.bind(this, index)
                    }) :
                    countCard({
                        card: c,
                        onSave: this.save.bind(this, index)
                    })
            ),
            D.div(
                {
                    className: 'dashboard__delete',
                    onClick: this.delete.bind(this, index)
                }
            )
        );
    }
};

function isTimeCard(c) {
    return typeof c.get('time') === 'number';
}

export default Dashboard;
