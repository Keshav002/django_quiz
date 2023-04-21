import React, { useEffect, useState } from 'react';
import { Background } from 'victory';

function Result() {
  var token = localStorage.getItem('token');
  const [result, setResult] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const sortData = () => {
    const sortedResult = [...result].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.marks - b.marks;
      } else {
        return b.marks - a.marks;
      }
    });
    setResult(sortedResult);
  };
  const fetchResultData = async () => {
    const response = await fetch("/results", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setResult(data);
  }
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    sortData();
  }, [sortOrder]);

  useEffect(() => {
    fetchResultData();
  }, []);

  return (
    <>
      <div style={{ height: '20rem', width: '81rem', overflow: 'auto', background: "pink", border: "2px solid grey" }}>
        <table style={{ width: '100%' }} className="table table-hover">
          <thead>
            <tr>
              <th style={{ textAlign: 'center', backgroundColor: '#f8f9fa', borderTop: 'none', fontWeight: '600', position: "sticky", top: "0" }}>Email</th>
              <th style={{ textAlign: 'center', backgroundColor: '#f8f9fa', borderTop: 'none', fontWeight: "600", position: "sticky", top: "0" }}>
               Subject
              </th>
              <th style={{ textAlign: 'center', backgroundColor: '#f8f9fa', borderTop: 'none', fontWeight: "600", position: "sticky", top: "0", cursor: "pointer" }} onClick={toggleSortOrder}>
                Marks {sortOrder === "asc" ? <>&uarr;</> : <>&darr;</>}
              </th>
              <th style={{ textAlign: 'center', backgroundColor: '#f8f9fa', borderTop: 'none', fontWeight: "600", position: "sticky", top: "0" }}>Attempted On</th>
            </tr>
          </thead>
          <tbody>
            {result && result.map((res, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: 'center', borderTop: 'none' }}>{res.email_name}</td>
                  <td style={{ textAlign: 'center', borderTop: 'none' }}>{res.subject_name}</td>
                  <td style={{ textAlign: 'center', borderTop: 'none' }}>{res.marks}</td>
                  <td style={{ textAlign: 'center', borderTop: 'none' }}>{res.attempted_on.slice(0, 10).split("-").reverse().join("-")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style>
        {`
          ::-webkit-scrollbar {
            width: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 5px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #aaa;
          }
        `}
      </style>
    </>
  )
}

export default Result;
