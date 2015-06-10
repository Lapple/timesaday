import {Component, createFactory, DOM as D} from 'react';

import CountCard from './count-card';
import TimeCard from './time-card';
import NewCard from './new-card';

let countCard = createFactory(CountCard);
let timeCard = createFactory(TimeCard);
let newCard = createFactory(NewCard);

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }
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
    resetCounters() {
        this.props.onChange(
            this.props.cards.map(c => c.set('value', 0))
        );
    }
    moveLeft(index) {
        this.props.onChange(
            swap(
                this.props.cards,
                index,
                Math.max(index - 1, 0)
            )
        );
    }
    moveRight(index) {
        let cards = this.props.cards;

        this.props.onChange(
            swap(
                cards,
                index,
                Math.min(index + 1, cards.size - 1)
            )
        )
    }
    startEditing() {
        this.setState({
            editing: true
        })
    }
    finishEditing() {
        this.setState({
            editing: false
        })
    }
    renderCard(c, index) {
        return D.div({ className: 'dashboard__item', key: c.get('title') },
            (
                c.get('type') === 'time' ?
                    timeCard({
                        card: c,
                        onSave: this.save.bind(this, index)
                    }) :
                    countCard({
                        card: c,
                        onSave: this.save.bind(this, index)
                    })
            ),
            this.renderCardActions(c, index)
        );
    }
    renderCardActions(c, index) {
        if (this.state.editing) {
            return D.div(
                null,
                D.div(
                    {
                        className: 'dashboard__delete',
                        onClick: this.delete.bind(this, index),
                        title: 'Delete card'
                    }
                ),
                D.div(
                    { className: 'dashboard__move' },
                    D.button(
                        {
                            type: 'button',
                            className: 'dashboard__move-button dashboard__move-button_left',
                            onClick: this.moveLeft.bind(this, index),
                            title: 'Move left'
                        }
                    ),
                    D.button(
                        {
                            type: 'button',
                            className: 'dashboard__move-button',
                            onClick: this.moveRight.bind(this, index),
                            title: 'Move right'
                        }
                    )
                )
            );
        }

        return null;
    }
    renderAddCard() {
        if (this.state.editing) {
            return (
                D.div({ className: 'dashboard__item' },
                    newCard({
                        onSave: this.save.bind(this, this.props.cards.size)
                    })
                )
            );
        }

        return null;
    }
    renderHeaderActions() {
        if (this.state.editing) {
            return (
                D.div(
                    { className: 'dashboard__actions' },
                    D.button(
                        {
                            type: 'button',
                            className: 'dashboard__action-button',
                            onClick: this.finishEditing.bind(this)
                        },
                        'Done editing'
                    ),
                    D.button(
                        {
                            type: 'button',
                            className: 'dashboard__action-button dashboard__action-button_danger',
                            onClick: this.resetCounters.bind(this)
                        },
                        'Reset all counters'
                    )
                )
            );
        } else {
            return (
                D.div(
                    { className: 'dashboard__actions' },
                    D.button(
                        {
                            type: 'button',
                            className: 'dashboard__action-button',
                            onClick: this.startEditing.bind(this)
                        },
                        'Edit cards'
                    )
                )
            );
        }
    }
    render() {
        return (
            D.div(
                { className: 'dashboard' },
                D.div(
                    { className: 'dashboard__header' },
                    D.span(
                        { className: 'dashboard__header-title' },
                        document.title
                    ),
                    this.renderHeaderActions()
                ),
                this.props.cards.map(this.renderCard, this),
                this.renderAddCard()
            )
        );
    }
};

function swap(list, i, j) {
    return list.map((item, index) => {
        if (index === i) {
            return list.get(j);
        } else if (index === j) {
            return list.get(i);
        } else {
            return item;
        }
    });
}

export default Dashboard;
