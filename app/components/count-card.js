import {Component, DOM as D} from 'react';

class CountCard extends Component {
    increment() {
        let count = this.props.card.get('count');

        this.props.onSave(
            this.props.card.set('count', count + 1));
    }
    render() {
        return (
            D.div({ className: 'card', onClick: this.increment.bind(this) },
                D.div({ className: 'card__title' },
                    this.props.card.get('title')
                ),
                D.div({ className: 'card__value' },
                    this.props.card.get('count')
                )
            )
        );
    }
}

export default CountCard;
