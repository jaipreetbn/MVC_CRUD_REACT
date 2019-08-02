﻿import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
const style = {
	top: 20 + '%',
	bottom: 'auto',
	position: 'absolute',
	zIndex: 9000,
	left: 30 + '%'
}
export default class CustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onDeleteSubmit(id) {
        $.ajax({
			url: "/Customers/DeleteCustomer",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ success: data })
                window.location.reload()
            }.bind(this)
        });
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    render() {
        return (
            <React.Fragment>
				<Modal open={this.props.showDeleteModal} onClose={this.props.onClose} size='tiny' style={style}>
					<Modal.Header>Delete Customer</Modal.Header>
                    <Modal.Content>
                        <h4>
                            Are you sure?
                        </h4>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >Cancel
                            </Button>
                        <Button onClick={() => this.onDeleteSubmit(this.props.delete)} className="ui red button">Delete
                            <i className="x icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}