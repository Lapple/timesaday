var React = require('react');
var D = React.DOM;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            startTime: null,
            now: null
        };
    },
    componentDidMount: function() {
        this._timer = setInterval(this._tick, 500);
    },
    componentWillUnmount: function() {
        clearInterval(this._tick);
    },
    _toggle: function() {
        if (this._isRunning()) {
            this.props.onSave(
                this.props.card.set(
                    'time',
                    this._getTotalTime()));

            this.setState(
                this.getInitialState());
        } else {
            this.setState({
                startTime: Date.now()
            });
        }
    },
    _getTotalTime: function() {
        var time = this.props.card.get('time');

        if (this._isRunning()) {
            var delta = this.state.now - this.state.startTime;
            return time + Math.max(0, delta);
        } else {
            return time;
        }
    },
    _tick: function() {
        this.setState({
            now: Date.now()
        });
    },
    _isRunning: function() {
        return typeof this.state.startTime === 'number';
    },
    render: function() {
        return D.div({ className: 'card', onMouseDown: this._toggle },
            D.div({ className: 'card__title' },
                this.props.card.get('title')),
            D.div({ className: 'card__value' },
                this._getTotalTime()));
    }
});
