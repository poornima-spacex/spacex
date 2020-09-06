import React from 'react';
import './lauch.scss'
import '../../App.css'
import axios from 'axios';

class LaunchView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            launchYears : [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            successfulLaunchValues : [1, 0],
            successfulLandingValues : [1, 0],
            filterValues:[],
            activeLaunch:'',
            activeLanding:'',
            activeYear:'',
            searchURL:'https://api.spaceXdata.com/v3/launches?limit=100'
        };
      }

      componentWillMount(){
          this.loadData(this.state.searchURL);
      }
       

      loadData(url){
            axios.get(url).
            then(response => {
                this.setState({filterValues:response.data});
            }).catch((error) => {    
                console.log("error", error)
            })     
        }

        filterData(e){
            debugger
            let val = e.target.value;
            switch (e.target.name) {
                case 'year':
                    this.setState({activeYear:val, activeLaunch: true, activeLanding: true});
                    this.loadData('https://api.spaceXdata.com/v3/launches?limit=100&launch_success='+this.state.activeLaunch+'&land_success='+this.state.activeLanding+'&launch_year='+val);
                    break;
                    case 'successlaunch':
                    this.setState({activeLaunch:val == 0 ? false : true});
                    var bool = val === 0 ? false : true
                    this.loadData('https://api.spaceXdata.com/v3/launches?limit=100&launch_success='+bool+'&land_success='+this.state.activeLanding+'&launch_year='+this.state.activeYear);
                    break;
                    case 'landingsuccess':
                    this.setState({activeLanding:val == 0 ? false : true});
                    var bool = val === 0 ? false : true
                    this.loadData('https://api.spaceXdata.com/v3/launches?limit=100&launch_success='+this.state.activeLaunch+'&land_success='+bool+'&launch_year='+this.state.activeYear);
                    break;
                    default:
                    this.loadData(this.state.searchURL);
            }
        }

    render(){
       return(
       <div> 
        <div className="c1">
            <strong>SpaceX Launch Programs</strong>
        </div>
        <div className="c2">    
            <div className="c4 c2 c5">
               <div>
                <div>Filters</div>
                <div>Launch Year</div>
                { this.state.launchYears.map((year, index) => 
                     <button type="button" className={year == this.state.activeYear ? "active_button" : "button"} name ="year" id ={year} value={year} onClick={(e)=>this.filterData(e)} id = {index}>{year}</button>
                )}
                <p>Successful Launch</p>
                    { this.state.successfulLaunchValues.map((launch, index) => 
                        <button type="button" className={launch == this.state.activeLaunch ? "active_button" : "button"} name="successlaunch" value={launch} id={launch} onClick={(e)=>this.filterData(e)} id = {index}>{ launch === 1 ? 'True' : 'False' }</button>
                    )}
               <p>Successful Landing</p>
                { this.state.successfulLaunchValues.map((launch, index) => 
                    <button type="button" className={launch == this.state.activeLanding ? "active_button" : "button"} name="landingsuccess" value ={launch} id={launch} onClick={(e)=>this.filterData(e)} id = {index}>{ launch === 1 ? 'True' : 'False' }</button>
                )}
            </div>
        </div>
        <div className="view">
           {this.state.filterValues &&  this.state.filterValues.map((val, index) => 
                <div className="c7">
                   <img src= {val.links.mission_patch_small} className="img" alt ="name"/>
                    <strong className="flight_name">{val.mission_name} # {val.flight_number}</strong>
                    <div> 
                       <strong>Mission Id's :</strong>
                        { val && val.mission_id && val.mission_id.map((missionid, index) =>
                           <li la>
                               {missionid}
                            </li>
                        )} 
                    </div>
                    <div> 
                        <span className="fl"><strong> Launch Year :</strong> </span> <span className="flight_name"> {val.launch_year}</span>
                    </div>
                    <div> 
                        <span className="fl"> <strong> Successful Launch :</strong></span><span className="flight_name">{val.launch_success ? 'True' : 'False'}</span>
                    </div>
                </div>
             )}
        </div>
        </div>
        <div className="c3">
            <b>Developed by : Poornima Iytla</b>
        </div>
        </div>
      )
    }
}


export default LaunchView;