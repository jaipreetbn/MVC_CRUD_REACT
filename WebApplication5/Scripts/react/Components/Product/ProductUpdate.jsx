import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';
const style = {
    top: 20 + '%',
    bottom: 'auto',
    position: 'absolute',
    zIndex: 9000,
    left: 30 + '%',
}

export default class ProductUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showUpdateModel} onClose={this.props.onClose} size='small' style={style}>
                    <Modal.Header> Edit Product </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="ProductName" placeholder='Name' defaultValue={this.props.Name} onChange={this.props.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.ProductName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type="text" name="ProductPrice" placeholder='Price' defaultValue={this.props.Price} onChange={this.props.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.props.errors.ProductPrice}
                                </div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >Cancel
                        </Button>
						<Button onClick={this.props.onUpdateSubmit} className="ui green button"
							icon='checkmark'
							labelPosition='right'
							content="EDIT"className="ui green button">
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}