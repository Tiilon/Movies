import React, { Component } from 'react'

class Like extends Component {
    state = {  }
    render() { 
        let classes = "fa fa-heart"
        if (!this.props.isLiked) classes += "-o"
        return ( 
            <i className={classes} onClick={this.props.onClick} aria-hidden='true'></i>
         );
    }
}
 
export default Like;