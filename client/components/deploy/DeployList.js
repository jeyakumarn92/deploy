import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
import { Table } from 'react-bootstrap';



const DeployList = props => {

    const deleteDeploy = async id => {
    try {
      await axios.delete(`/api/delete/${id}`); 
    } catch(error) {
      console.error(error);
    }
  }
 

  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Template Name</th>
        <th>Version</th>
        <th>URL</th>
        <th>Deployed At</th>
          </tr>
        </thead>
        <tbody>        
        {props.deploys.length > 0 ? (
        props.deploys.map(deploy => (
          <tr key={deploy._id}>            
            <td>{deploy.templateName}</td>
            <td>{deploy.version}</td>
            <td>{deploy.url}</td>
            <td>{deploy.deployedAt}
            </td>
            <td>
              <button
                onClick={() => deleteDeploy(deploy._id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No Data</td>
        </tr>
      )}
        </tbody>
      </Table>
    </div>
  )     
}

export default DeployList;