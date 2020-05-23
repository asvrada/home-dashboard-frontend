import React, {ChangeEvent, FormEvent} from "react";
import {DEFAULT_TRANSACTION, ITransaction} from "../../helpers/graphql";

type Props = {
    transaction: ITransaction | undefined
}

class BillForm extends React.Component<Props> {
    state = DEFAULT_TRANSACTION;
    isCreate = true;

    constructor(props: Props) {
        super(props);

        this.isCreate = props.transaction === undefined;

        if (props.transaction) {
            this.state.amount = props.transaction.amount;
            this.state.category = props.transaction.category;
            this.state.card = props.transaction.card;
            this.state.company = props.transaction.company;
            this.state.note = props.transaction.note;
            this.state.timeCreated = props.transaction.timeCreated;
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        console.log(this.isCreate);

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
                           onChange={(event) => this.handleChange("amount", event)}
                    />

                    <br/>
                    <label>Note</label>
                    <input type="text" value={this.state.note} onChange={e => this.handleChange('note', e)}
                    />

                    <br/>
                    <label>Time Created</label>
                    <input type="text" value={this.state.timeCreated}
                           onChange={e => this.handleChange('timeCreated', e)}
                    />

                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </>
        );
    }
}

export default BillForm;