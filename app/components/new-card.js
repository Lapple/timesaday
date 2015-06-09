import {Component, DOM as D} from 'react';
import {fromJS} from 'immutable';

class NewCard extends Component {
    constructor(props) {
        super(props);
        this.state = this._getInitialState();

        this.save = this.save.bind(this);
        this._onTitleChange = this._onTitleChange.bind(this);
    }
    _getInitialState() {
        return {
            title: ''
        };
    }
    save(e) {
        this.props.onSave(
            fromJS({
                title: this.state.title.trim(),
                type: 'count',
                value: 0
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
        return (
            D.form({ className: 'card card_new', onSubmit: this.save },
                D.div({ className: 'card__title' },
                    'Add new card'
                ),
                D.div({ className: 'card__controls' },
                    D.input({
                        className: 'card__control card__control_title',
                        type: 'text',
                        onChange: this._onTitleChange,
                        value: this.state.title,
                        placeholder: 'Title'
                    }),
                    D.button({ className: 'card__control card__control_submit', type: 'submit',  },
                        'Add'
                    )
                )
            )
        );
    }
}

export default NewCard;
