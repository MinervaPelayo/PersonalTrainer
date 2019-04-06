import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state={customers:[]};
    }

    componentDidMount(){
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response=>response.json())
        .then(jsondata=>this.setState({customers: jsondata.content}))
        .catch(err=>console.error(err));
    }
    
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
            }
        ];
        return (
            <div>
                <Typography variant="display3" style={{padding:"15px"}}>Customers</Typography>
                <ReactTable 
                filterable={true}
                defaultPageSize={10}
                data={this.state.customers} 
                columns={columns}/>
            </div>
        );
    }
}

export default Customers;