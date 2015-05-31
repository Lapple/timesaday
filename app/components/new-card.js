import {Component, DOM as D} from 'react';
import {fromJS} from 'immutable';

class NewCard extends Component {
    constructor(props) {
        super(props);
        this.state = this._getInitialState();

        this.activate = this.activate.bind(this);
        this.save = this.save.bind(this);
        this._onTitleChange = this._onTitleChange.bind(this);
    }
    _getInitialState() {
        return {
            activated: false,
            title: ''
        };
    }
    activate() {
        this.setState({
            activated: true
        });
    }
    save(e) {
        this.props.onSave(
            fromJS({
                title: this.state.title.trim(),
                count: 0
            }));

        this.setState(
            this._getInitialState());

        e.preventDefault();
    }
    _onTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }
    render() {
        if (this.state.activated) {
            return (
                D.form({ className: 'card card_form', onSubmit: this.save },
                    D.div({ className: 'card__title' },
                        'Give a title'
                    ),
                    D.div({ className: 'card__controls' },
                        D.input({
                            className: 'card__control card__control_title',
                            type: 'text',
                            onChange: this._onTitleChange,
                            value: this.state.title
                        }),
                        D.button({ className: 'card__control card__control_submit', type: 'submit',  },
                            'Add'
                        )
                    )
                )
            );
        } else {
            return (
                D.div({ className: 'card', onMouseDown: this.activate },
                    D.div({ className: 'card__title' },
                        'Add'
                    ),
                    D.div({ className: 'card__value' },
                        '+'
                    )
                )
            );
        }
    }
}

export default NewCard;
