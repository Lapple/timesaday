var React = require('react');
var D = React.DOM;

module.exports = React.createClass({
    _increment: function() {
        var count = this.props.card.get('count');

        this.props.onSave(
            this.props.card.set('count', count + 1));
    },
    render: function() {
        return D.div({ className: 'card', onMouseDown: this._increment },
            D.div({ className: 'card__title' },
                this.props.card.get('title')),
            D.div({ className: 'card__value' },
                this.props.card.get('count')));
    }
});
