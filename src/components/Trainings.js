import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';

class Trainings extends Component {
    constructor(props) {
        super(props);
        this.state={trainings:[]};
    }

    componentDidMount(){
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response=>response.json())
        .then(jsondata=>this.setState({trainings: jsondata.content}))
        .catch(err=>console.error(err));
    }
    
    render() {
        const columns=[
            { Header:'Date',
             accessor:'date',
             Cell: ({value}) =>(<Moment format="ddd DD/MM/YYYY">{value}</Moment>)
            },
            { Header:'Duration',
                accessor:'duration'
            },
            { Header:'Activity',
                accessor:'activity'
            }
        ];
        return (
            <div>
                <Typography variant="display3" style={{padding:"15px"}}>Trainings</Typography>
                <ReactTable 
                filterable={true}
                defaultPageSize={10}
                data={this.state.trainings} 
                columns={columns}/>
            </div>
        );
    }
}

export default Trainings;