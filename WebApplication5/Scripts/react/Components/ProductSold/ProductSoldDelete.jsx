import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
const style = {
	top: 20 + '%',
	bottom: 'auto',
	position: 'absolute',
	zIndex: 9000,
	left: 30 + '%'
}
export default class ProductSoldDelete extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				<Modal open={this.props.show} size='mini' style={style}>
					<Modal.Header>Delete Sale</Modal.Header>
					<Modal.Content>
						<p>
							Do you really want to delete this sale?
                        </p>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.props.onClose} secondary >Cancel</Button>
						<Button className='ui red button'
							icon='x'
							labelPosition='right'
							content='Delete'
							onClick={() => this.props.delete(this.props.deleteId)}
						/>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		)
	}
}