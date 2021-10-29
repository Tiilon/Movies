import React, { Component } from 'react'
import TableHead from './tableHead'
import TableBody from './tableBody'

class Table extends Component {
    render() { 

        const {data,sortColumn, onSort} = this.props

        return ( 
            <table className="table table-bordered small">
                <thead>
                    <tr>
                       <TableHead columns={this.props.columns} onSort={onSort} sortColumn={sortColumn}/>  
                    </tr>
                   
                </thead>
                  <TableBody data={data} columns={this.props.columns}/>  
            </table>
         );
    }
}
 
export default Table;