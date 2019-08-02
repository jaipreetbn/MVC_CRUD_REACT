import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';
const style = {
	top: 20 + '%',
	bottom: 'auto',
	position: 'absolute',
	zIndex: 9000,
	left: 30 + '%'
}

export default class ProductSoldUpdate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			SaleList: [],
			CustomerDropdownList: [],
			ProductDropdownList: [],
			StoreDropdownList: [],
			CustomerId: '',
			ProductId: '',
			StoreId: ''
		};
	}

	componentDidMount() {
		//GET: Customers
		$.ajax({
			url: "/ProductSolds/GetCustomers",
			type: "GET",
			success: function (data) {
				this.setState({ CustomerDropdownList: data })
			}.bind(this)
		});
		//GET: Products
		$.ajax({
			url: "/ProductSolds/GetProducts",
			type: "GET",
			success: function (data) {
				this.setState({ ProductDropdownList: data })
			}.bind(this)
		});
		//GET: Stores
		$.ajax({
			url: "/ProductSolds/GetStores",
			type: "GET",
			success: function (data) {
				this.setState({ StoreDropdownList: data })
			}.bind(this)
		});
	}

	render() {
		let custList = [].concat(this.state.CustomerDropdownList);
		let proList = [].concat(this.state.ProductDropdownList);
		let storeList = [].concat(this.state.StoreDropdownList);

		let customerOption = custList.map((c) => <option key={c.Id} value={c.Id} label={c.CustomerName}>{c.CustomerName}</option>);
		let productOption = proList.map((p) => <option key={p.Id} value={p.Id} label={p.ProductName}>{p.ProductName}</option>);
		let storeOption = storeList.map((s) => <option key={s.Id} value={s.Id} label={s.StoreName}>{s.StoreName}</option>);

		return (
			<React.Fragment>
				<Modal size={'tiny'} open={this.props.show} closeOnDimmerClick={false} style={style}>
					<Modal.Header> Edit Sale </Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Field>
								<label>Date Sold</label>
								<input type='text' name='DateSold' defaultValue={this.props.DateSold} onChange={this.props.handleChange} />
								<div style={{ color: 'red' }}>{this.props.errors.DateSold}</div>
							</Form.Field>
							<Form.Field>
								<label>Customer</label>
								<select name='CustomerId' defaultValue={this.props.currentSale.CustomerId} onChange={this.props.handleChange}>
									{customerOption}
								</select>
								<div style={{ color: 'red' }}>{this.props.errors.CustomerId}</div>
							</Form.Field>
							<Form.Field>
								<label>Product</label>
								<select name='ProductId' defaultValue={this.props.currentSale.ProductId} onChange={this.props.handleChange}>
									{productOption}
								</select>
								<div style={{ color: 'red' }}>{this.props.errors.ProductId}</div>
							</Form.Field>
							<Form.Field>
								<label>Store</label>
								<select name='StoreId' defaultValue={this.props.currentSale.StoreId} onChange={this.props.handleChange}>
									{storeOption}
								</select>
								<div style={{ color: 'red' }}>{this.props.errors.StoreId}</div>
							</Form.Field>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.props.onClose} secondary>Cancel</Button>
						<Button positive
							icon='checkmark'
							labelPosition='right'
							content="Update"
							onClick={this.props.submit}
						/>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		)
	}
}