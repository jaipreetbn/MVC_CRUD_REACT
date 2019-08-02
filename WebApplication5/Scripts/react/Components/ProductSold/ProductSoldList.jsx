import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from 'semantic-ui-react';
import ProductSoldDelete from './ProductSoldDelete.jsx';
import ProductSoldCreate from './ProductSoldCreate.jsx';
import ProductSoldUpdate from './ProductSoldUpdate.jsx';
const style = {
    top: 20 + '%',
    bottom: 'auto',
    position: 'absolute',
    zIndex: 9000,
    left: 30 + '%',
}


export default class ProductSold extends Component {
	constructor(props) {
		super(props);

		this.handleNewSaleClick = this.handleNewSaleClick.bind(this);
		this.toggleCreateSaleModal = this.toggleCreateSaleModal.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.toggleDeleteSaleModal = this.toggleDeleteSaleModal.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.toggleEditSaleModal = this.toggleEditSaleModal.bind(this);
		this.dateConverter = this.dateConverter.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleUpdateSaleClick = this.handleUpdateSaleClick.bind(this);
		this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);


	//	this.showUpdateModel = this.showUpdateModel.bind(this);
	//	this.closeUpdateModel = this.closeUpdateModel.bind(this);
	//	this.onUpdateSubmit = this.onUpdateSubmit.bind(this);

		this.state = {
			SaleList: [], //initially SaleList array is empty
			loading: true,
			isAddSaleModal: false,
			isDeleteSaleModal: false,
			isEditSaleModal: false,
			CustomerId: '',
			ProductId: '',
			StoreId: '',
			DateSold: '',
			deleteId: 0,
			updateId: 0,
			currentEditSale: {},
			errors: {}
		};
	}

	componentDidMount() {
		this.loadSaleData();
	}

	//Get Sales
	loadSaleData() {
		$.ajax({
			url: "/ProductSolds/GetSales",
			type: "GET",
			success: function (data) {
				this.setState({ SaleList: data, loading: false })
			}.bind(this)
		});
	}

	// New Sale button click
	handleNewSaleClick() {
		this.setState({ isAddSaleModal: true });
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	// Toggle Create Sale Modal
	toggleCreateSaleModal() {
		this.setState({ isAddSaleModal: !this.state.isAddSaleModal });
	}

	// Delete button click
	handleDeleteClick(id) {
		this.setState({
			isDeleteSaleModal: true,
			deleteId: id
		});
	}

	// Toggle Delete Sale Modal
	toggleDeleteSaleModal() {
		this.setState({ isDeleteSaleModal: !this.state.isDeleteSaleModal });
	}

	// Toggle Edit Sale Modal
	toggleEditSaleModal() {
		this.setState({ isEditSaleModal: !this.state.isEditSaleModal });
	}

	// Date Format
	dateFormat(tempdate) {
		var converted = parseInt((tempdate.replace("/Date(", "").replace(")/", "")));
		var temp = new Date(converted);
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const d = new Date(converted);
		var date = (temp.getDate() + " " + monthNames[d.getMonth()] + ", " + temp.getFullYear());
		return date;
	}

	// Date Converter to show date in edit modal
	dateConverter(tempdate) {
		var converted = parseInt((tempdate.replace("/Date(", "").replace(")/", "")));
		var temp = new Date(converted);
		var date = (temp.getDate() + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear()).toString();
		return date;
	}

	// Edit button click
	handleEditClick(sale) {
		this.setState({
			isEditSaleModal: true,
			currentEditSale: sale,
			updateId: sale.Id,
			CustomerId: sale.CustomerId,
			ProductId: sale.ProductId,
			StoreId: sale.StoreId,
			DateSold: this.dateConverter(sale.DateSold)
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

	// POST request to update Sale
	handleUpdateSaleClick() {
		if (this.validateForm()) {
			let data = {
				'Id': this.state.updateId,
				'CustomerId': this.state.CustomerId,
				'ProductId': this.state.ProductId,
				'StoreId': this.state.StoreId,
				'DateSold': this.state.DateSold
			};
			$.ajax({
				url: "/ProductSolds/UpdateSale",
				type: "POST",
				data: data,
				success: function () {
					this.setState({ Success:data});
					//this.toggleEditSaleModal()
					window.location.reload()
						Console.log(data);
				}.bind(this)
			});
		}
	}

	// Delete Sale
	handleDeleteSubmit(id) {
		$.ajax({
			url: "/ProductSolds/DeleteSale",
			type: "POST",
			data: { 'id': id }
		});
			window.location.reload();
			}

	renderSaleTable(saleList) {
		return <Table striped celled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Customer</Table.HeaderCell>
					<Table.HeaderCell>Product</Table.HeaderCell>
					<Table.HeaderCell>Store</Table.HeaderCell>
					<Table.HeaderCell>Date Sold</Table.HeaderCell>
					<Table.HeaderCell>Action</Table.HeaderCell>
					<Table.HeaderCell>Action</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{saleList.map(sale =>
					<Table.Row key={sale.Id}>
						<Table.Cell>{sale.CustomerName}</Table.Cell>
						<Table.Cell>{sale.ProductName}</Table.Cell>
						<Table.Cell>{sale.StoreName}</Table.Cell>
						<Table.Cell>{this.dateFormat(sale.DateSold)}</Table.Cell>
						<Table.Cell>
							<Button color='yellow' onClick={this.handleEditClick.bind(this, sale)}>
								<i className="edit icon"></i>EDIT</Button>
						</Table.Cell>
						<Table.Cell>
							<Button color='red' onClick={this.handleDeleteClick.bind(this, sale.Id)}>
								<i className="trash icon"></i>DELETE</Button>
						</Table.Cell>
					</Table.Row>)
				}
			</Table.Body>
		</Table>
	}

	render() {
		const saleList = this.state.SaleList;
		let contents = this.state.loading
			? <div style={{ paddingLeft: 35 + 'em' }}><em>Loading...</em></div>
			: this.renderSaleTable(saleList);

		return (
			<React.Fragment>
				<div>
					<Button style={{ margin: 1 + 'em' }} primary onClick={this.handleNewSaleClick}>New Sale</Button>
					<ProductSoldCreate show={this.state.isAddSaleModal} onClose={this.toggleCreateSaleModal} />
				</div>
				<div>
					<ProductSoldDelete show={this.state.isDeleteSaleModal} onClose={this.toggleDeleteSaleModal} deleteId={this.state.deleteId} delete={this.handleDeleteSubmit} />
					<ProductSoldUpdate show={this.state.isEditSaleModal} onClose={this.toggleEditSaleModal} currentSale={this.state.currentEditSale}
						DateSold={this.state.DateSold} errors={this.state.errors} submit={this.handleUpdateSaleClick} handleChange={this.handleChange} />
					{contents}
				</div>
			</React.Fragment>
		)
	}
}