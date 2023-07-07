import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import Loading from "react-loading";
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState([]);
  console.log(account);
  useEffect(() => {
    setTimeout(() => {
      fetchData("https://jsonplaceholder.typicode.com/users", handleData);
    }, 2000);
  }, []);

  const fetchData = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        cb(JSON.parse(xhr.responseText));
      }
    };
    xhr.open("GET", url);
    xhr.send();
  };

  const handleData = (data) => {
    setAccount(data);
    setIsLoading(false)
  };

  return (
    <div>
      <p>HALLO</p>
      {isLoading ? (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Loading type="spin" color="green" height={20} width={20} />
          <h5 style={{ color: "green" }}>Loading....</h5>
        </div>
      ) : (
        <div>

        <h4>List Of Users</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th> Name</th>
              <th>Username</th>
              <th> Email</th>
              <th> Address</th>
              <th> Company</th>
            </tr>
          </thead>
          {account.map((i, x) => {
            return (
              <tbody key={x}>
                <tr>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td>{i.username}</td>
                  <td>{i.email}</td>
                  <td>
                    {i.address.street}
                    {i.address.suite}
                    {i.address.city}
                  </td>
                  <td>{i.company.name}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
      )}
    </div>
  );
}
