import {Component, DOM as D} from 'react';
import formatDuration from 'hhmmss';

class TimeCard extends Component {
    constructor(props) {
        super(props);
        this.state = this._getInitialState();
        this._tick = this._tick.bind(this);
    }
    componentDidMount() {
        this._timer = setInterval(this._tick, 500);
    }
    componentWillUnmount() {
        clearInterval(this._tick);
    }
    _getInitialState() {
        return {
            startTime: null,
            now: null
        };
    }
    toggle() {
        if (this.isRunning()) {
            this.props.onSave(
                this.props.card.set(
                    'time',
                    this.getTime()));

            this.setState(
                this._getInitialState());
        } else {
            this.setState({
                startTime: Date.now()
            });
        }
    }
    getTime() {
        let time = this.props.card.get('time');

        if (this.isRunning()) {
            let delta = this.state.now - this.state.startTime;

            return time + Math.max(0, delta);
        } else {
            return time;
        }
    }
    _tick() {
        this.setState({
            now: Date.now()
        });
    }
    isRunning() {
        return typeof this.state.startTime === 'number';
    }
    render() {
        return (
            D.div({ className: 'card', onClick: this.toggle.bind(this) },
                D.div({ className: 'card__title' },
                    this.props.card.get('title')
                ),
                D.div({ className: 'card__value' },
                    formatDuration(
                        Math.floor(this.getTime() / 1000))
                )
            )
        );
    }
};

export default TimeCard;
