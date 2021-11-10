import React from "react";

const MentorsList = ({mentors}) => {
  return (
    <div className="table-responsive">
        <table className="table table-striped table-sm">
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
          {mentors.map((mentor, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{mentor.name}</td>
              <td>{mentor.code}</td>
              <td  className="text-info">update</td>
              <td className="text-danger">delete</td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>     
  )
}

export default MentorsList;