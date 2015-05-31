var React = require('react');
var Immutable = require('immutable');

var D = React.DOM;

var cards = require('../../cards');

var CountCard = require('./count-card');
var TimeCard = require('./time-card');
var countCard = React.createFactory(CountCard);
var timeCard = React.createFactory(TimeCard);

module.exports = React.createClass({
    getInitialState: function() {
        return {
            cards: Immutable.fromJS(cards)
        };
    },
    _save: function(index, value) {
        this.setState({
            cards: this.state.cards.set(index, value)
        });
    },
    render: function() {
        return D.div({ className: 'dashboard' },
            this.state.cards.map(this.renderCard));
    },
    renderCard: function(c, index) {
        if (isTimeCard(c)) {
            return timeCard({
                card: c,
                onSave: this._save.bind(this, index),
                key: index
            });
        } else {
            return countCard({
                card: c,
                onSave: this._save.bind(this, index),
                key: index
            });
        }
    }
});

function isTimeCard(c) {
    return typeof c.get('time') === 'number';
}
