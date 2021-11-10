import React from "react";

const InstitutionList = ({institutions}) => {
  return (
    <div class="table-responsive">
        <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">View</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((mentor, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{mentor.name}</td>
              <td>{mentor.institutionCode}</td>
              <td>update</td>
              <td className="text-danger">delete</td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  )
}

export default InstitutionList;