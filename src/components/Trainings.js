import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';
import Button from '@material-ui/core/Button';

class Trainings extends Component {
    constructor(props) {
        super(props);
        this.state={trainings:[],open: false,message:''};
    }

    componentDidMount(){
        this.loadTrainings();
    }

    loadTrainings=()=>{
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response=>response.json())
        .then(jsondata=>this.setState({trainings: jsondata}))
        .catch(err=>console.error(err));
    }

    saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(training)   
        })
        .then(res=>this.loadTrainings())
        .then(res=>this.setState({open:true,message:'New training added!'}))
        .catch(err=>console.error(err));
    };

    deleteTraining=trainingLink=>{
        const Link= 'https://customerrest.herokuapp.com/api/trainings/'+trainingLink;
        if(window.confirm("Are you sure?")){
        fetch(Link,{method:'DELETE'})
        .then(res=>this.loadTrainings())
        .then(res=>this.setState({open:true,message:'Training deleted'}))
        .catch(err=>console.error(err));
        }
    };

    handleClose=()=> {
        this.setState({open: false})
    };
    
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
            },
            { Header:'Firstname',
                accessor:'customer.firstname'
            },
            { Header:'Lastname',
                accessor:'customer.lastname'
            },
            {
                Header:'',
                filterable:false,
                sortable: false,
                width: 100,
                accessor:'id',
                Cell: ({value}) => (<Button color="secondary" onClick={()=>this.deleteTraining(value)}>Delete</Button>)
            }
        ];
        return (
            <div>
                <Typography variant="display3" style={{padding:"15px"}}>Trainings</Typography>
                <AddTraining saveTraining={this.saveTraining}/>
                <ReactTable 
                filterable={true}
                defaultPageSize={10}
                data={this.state.trainings} 
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

export default Trainings;