import React, {ChangeEvent, FormEvent} from "react";
import {ITransaction} from "../../helpers/type";
import Button from "react-bootstrap/Button";


class BillForm extends React.Component {
    transaction: ITransaction;
    state: ITransaction;

    constructor(props: { transaction: any; }) {
        super(props);

        // save the original object just in case
        // eslint-disable-next-line react/prop-types
        this.transaction = props.transaction;

        // state of this component
        this.state = {...this.transaction};
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    handleChange(field: string, event: ChangeEvent<HTMLInputElement>) {
        const newVal = event.target.value;
        switch (field) {
            case 'amount':
                this.handleAmount(parseFloat(newVal));
                break;
            case 'note':
                this.handleNote(newVal);
                break;
            case 'timeCreated':
                this.handleTimeCreated(newVal);
                break;
            default:
                break;
        }
    }

    handleAmount(newVal: number) {
        this.setState({
            amount: newVal,
        });
    }

    handleNote(newVal: string) {
        this.setState({
            note: newVal
        });
    }

    handleTimeCreated(newVal: string) {
        // this.setState({
        //     timeCreated: newVal
        // });
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>Amount</label>
                    <input type="number" value={this.state.amount}
                           onChange={(event) => this.handleChange("amount", event)}/>
                    <br/>
                    <label>Note</label>
                    <input type="text" value={this.state.note} onChange={e => this.handleChange('note', e)}/>

                    <br/>
                    <label>Time Created</label>
                    <input type="text" value={this.state.timeCreated}
                           onChange={e => this.handleChange('timeCreated', e)}/>
                </form>
            </>
        );
    }
}

export default BillForm;