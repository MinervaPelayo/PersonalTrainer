import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state={customers:[],open: false,message:''};
    }

    componentDidMount(){
        this.loadCustomers();
    }

    loadCustomers=()=>{
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response=>response.json())
        .then(jsondata=>this.setState({customers: jsondata.content}))
        .catch(err=>console.error(err));
    };

    saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(customer)   
        })
        .then(res=>this.loadCustomers())
        .then(res=>this.setState({open:true,message:'New customer added!'}))
        .catch(err=>console.error(err));
    };

    updateCustomer = (link, updatedCustomer) => {
        fetch(link,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedCustomer)   
        })
        .then(res=>this.loadCustomers())
        .then(res=>this.setState({open:true,message:'Changes saved'}))
        .catch(err=>console.error(err));
    }

    deleteCustomer=customerLink=>{
        if(window.confirm("Are you sure?")){
        fetch(customerLink,{method:'DELETE'})
        .then(res=>this.loadCustomers())
        .then(res=>this.setState({open:true,message:'Customer deleted'}))
        .catch(err=>console.error(err));
        }
    };

    handleClose=()=> {
        this.setState({open: false})
    };
    
    render() {
        const columns=[
            { Header:'Fistname',
             accessor:'firstname'
            },
            { Header:'Lastname',
                accessor:'lastname'
            },
            { Header:'Street Address',
                accessor:'streetaddress'
            },
            { Header:'Postcode',
                accessor:'postcode'
            },
            { Header:'City',
                accessor:'city'
            },   
            { Header:'Email',
                accessor:'email'
            },   
            { Header:'Phone',
                accessor:'phone'
            },
            {
                Header:'',
                filterable:false,
                sortable: false,
                width: 100,
                accessor:'links.0.href',
                Cell: ({value, row}) => (<EditCustomer updateCustomer={this.updateCustomer} link={value} customer={row} />)
            },
            {
                Header:'',
                filterable:false,
                sortable: false,
                width: 100,
                accessor:'links.0.href',
                Cell: ({value}) => (<Button color="secondary" onClick={()=>this.deleteCustomer(value)}>Delete</Button>)
            }
        ];

        return (
            <div>
                <Typography variant="display3" style={{padding:"5px"}}>Customers</Typography>
                <AddCustomer saveCustomer={this.saveCustomer}/>
                <ReactTable 
                filterable={true}
                defaultPageSize={10}
                data={this.state.customers} 
                columns={columns}/>
                <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
                message={this.state.message}
                />
            </div>
        );
    }
}

export default Customers;