import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form,Table } from 'semantic-ui-react';

const style = {
	top: 20 + '%',
	bottom: 'auto',
	position: 'absolute',
	zIndex: 9000,
	left: 30 + '%'
}
export default class ProductSoldCreate extends Component {
	constructor(props) {
		super(props);

		this.handleCreateSaleClick = this.handleCreateSaleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			SaleList: [],
			CustomerDropdownList: [],
			ProductDropdownList: [],
			StoreDropdownList: [],
			CustomerId: '',
			ProductId: '',
			StoreId: '',
			DateSold: '',
			errors: {}
		}
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

	// validation
	validateForm() {
		let errors = {}
		let formIsValid = true
		if (!this.state.CustomerId) {
			formIsValid = false;
			errors['CustomerId'] = '*Please select customer';
		}

		if (!this.state.ProductId) {
			formIsValid = false;
			errors['ProductId'] = '*Please select product'
		}

		if (!this.state.StoreId) {
			formIsValid = false;
			errors['StoreId'] = '*Please select store'
		}

		if (!this.state.DateSold) {
			formIsValid = false;
			errors['DateSold'] = '*Please enter the sale date'
		}

		this.setState({
			errors: errors
		});
		return formIsValid
	}

	// POST request to create new sale
	handleCreateSaleClick(event) {
		event.preventDefault();
		if (this.validateForm()) {
			let data = {
				'CustomerId': this.state.CustomerId,
				'ProductId': this.state.ProductId,
				'StoreId': this.state.StoreId,
				'DateSold': this.state.DateSold
			};

			$.ajax({
				url: "/ProductSolds/CreateSale",
				type: "POST",
				data: data,
				success: function (response) {
					this.setState({
						SaleList: [...this.state.SaleList, response]
					});
					window.location.reload()
					//this.props.onClose()                       
				}.bind(this)
			});
		}
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		let custList = [{ Id: '', CustomerName: 'Select Customer' }].concat(this.state.CustomerDropdownList);
		let proList = [{ Id: '',ProductName: 'Select Product' }].concat(this.state.ProductDropdownList);
		let storeList = [{ Id: '',StoreName: 'Select Store' }].concat(this.state.StoreDropdownList);

		let customerOption = custList.map((c) => <option key={c.Id} value={c.Id}>{c.CustomerName}</option>);
		let productOption = proList.map((p) => <option key={p.Id} value={p.Id}>{p.ProductName}</option>);
		let storeOption = storeList.map((s) => <option key={s.Id} value={s.Id}>{s.StoreName}</option>);

		return (
			<React.Fragment>
				<Modal size={'tiny'} open={this.props.show} closeOnDimmerClick={false} style={style}>
					<Modal.Header> Create Sale </Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Field>
								<label>Date Sold</label>
								<input type='text' name='DateSold' placeholder='DD/MM/YYYY' onChange={this.handleChange} />
								<div style={{ color: 'red' }}>{this.state.errors.DateSold}</div>
							</Form.Field>
							<Form.Field>
								<label>Customer</label>
								<select name='CustomerId' onChange={this.handleChange}>
									{customerOption}
								</select>
								<div style={{ color: 'red' }}>{this.state.errors.CustomerId}</div>
							</Form.Field>
							<Form.Field>
								<label>Product</label>
								<select name='ProductId' onChange={this.handleChange}>
									{productOption}
								</select>
								<div style={{ color: 'red' }}>{this.state.errors.ProductId}</div>
							</Form.Field>
							<Form.Field>
								<label>Store</label>
								<select name='StoreId' onChange={this.handleChange}>
									{storeOption}
								</select>
								<div style={{ color: 'red' }}>{this.state.errors.StoreId}</div>
							</Form.Field>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.props.onClose} secondary>Cancel</Button>
						<Button positive
							icon='checkmark'
							labelPosition='right'
							content="Create"
							onClick={this.handleCreateSaleClick}
						/>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		)
	}
}