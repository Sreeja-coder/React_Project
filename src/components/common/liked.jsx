import React, { Component } from 'react';

class Liked extends Component {

    render() { 
        let classes="fa fa-heart-o";
        classes= this.props.liked===true?"fa fa-heart":"fa fa-heart-o";
        
        return ( <i onClick={this.props.onClick} style={{cursor:'pointer'}} className={classes} aria-hidden="true"></i> );
    }
}
 
export default Liked;