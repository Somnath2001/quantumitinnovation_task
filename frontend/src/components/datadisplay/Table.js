import React, { useEffect, useState } from "react";
import "./Table.css";
import { Table } from "react-bootstrap";
import { DataCaller, isAuthenticated, signout } from "../../apis/helper";
import { useNavigate } from "react-router-dom";

const DatatablePage = () => {
  const navigate = useNavigate();

  const { token } = isAuthenticated();

  const [record, setRecord] = useState([]);

  useEffect(() => {
    DataCaller(token)
      .then((data) => {
        setRecord(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(record);

  return (
    <div className="main_Layout">
      <div className="head_text">
        <h2>Records</h2>
        <p
          onClick={() => {
            navigate("/");
            signout();
          }}
        >
          Logout
        </p>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Sr no</th>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {record.map((data, id) => {
            return (
              <tr key={id}>
                <th scope="row">{id + 1}</th>
                <td>{data.name}</td>
                <td>{data.birthDate}</td>
                <td>{data.email}</td>
                <td>{data.encrypted_password}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default DatatablePage;
