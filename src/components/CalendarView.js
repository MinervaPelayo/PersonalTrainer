import React, { Component } from 'react';
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

class CalendarView extends Component {
    constructor(props) {
        super(props);
        this.state={trainings:[]};
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

    render() {
        return (
            <div>
            <BigCalendar
            localizer={localizer}
            events={this.state.trainings}
            startAccessor={(event) => { return moment(event.date) }}
            endAccessor={(event) => { return moment(event.date).add(event.duration, 'minutes') }}
            titleAccessor={(event) => { return (event.activity) }}
            defaultDate={new Date()}
            defaultView="month"
            style={{ height: "90vh" }}
            />
            </div>
        );
    }
}

export default CalendarView;