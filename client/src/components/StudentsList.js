import React from "react";

const StudentsList = ({students}) => {
  return (
    <div class="table-responsive">
        <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">View</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>update</td>
              <td className="text-danger">delete</td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  )
}

export default StudentsList;