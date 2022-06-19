import React, { useEffect, useState, useRef } from "react";
import TableRow from "../TableRow/index";
import axios from "axios";
import "./DataTable.css";

function DataTable() {
  const [totalData, setTotalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [noOfPages, setNoOfPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [paginationPages, setPaginationPages] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [showTable, setShowTable] = useState(false);
  const [query, setQuery] = useState("https://json-server-madan.herokuapp.com/contacts");
  const [showError, setShowError] = useState(false);

  const ref = useRef();

  useEffect(() => {
    axios.get(query).then((response) => {
      if (response.data.length > 0) {
        setTotalData(response.data);
        setTableData(response.data.slice(0, dataPerPage));
        setNoOfPages(Math.ceil(response.data.length / dataPerPage));
      }
    });
  }, [dataPerPage, query]);

  useEffect(() => {
    if (noOfPages < 7) {
      let tArr = [];
      for (let i = 1; i <= noOfPages; i++) {
        tArr.push(i);
      }
      setPaginationPages(tArr);
    } else {
      if (activePage > 3 && activePage <= noOfPages - 3) {
        let tempArr = [];
        for (let i = activePage - 3; i <= activePage + 3; i++) {
          tempArr.push(i);
        }
        setPaginationPages([]);
        setPaginationPages(tempArr);
      } else {
        if (activePage <= 3) {
          setPaginationPages([1, 2, 3, 4, 5, 6, 7]);
        } else {
          let tArr = [];
          for (let i = noOfPages - 7; i <= noOfPages; i++) {
            tArr.push(i);
          }
          setPaginationPages(tArr);
        }
      }
    }
  }, [activePage, noOfPages]);

  const handlePageLimit = (e) => {
    setDataPerPage(e.target.value);
    changePage(1);
  };

  const changePage = (page) => {
    setActivePage(page);
    if (page > 1) {
      setTableData(
        totalData.slice(dataPerPage * (page - 1), dataPerPage * page)
      );
    } else {
      setTableData(totalData.slice(0, dataPerPage));
    }
  };

  const handleExecute = () => {
    if (ref.current.value.length > 0) {
      setShowTable(true);
      setShowError(false);
    } else {
      setShowError(true);
      setShowTable(false);
    }
  };

  const handleQueryChange = (e) => {
    setShowTable(false);
    ref.current.value = e.target.value;
    setQuery(queryMapper[e.target.value]);
    setActivePage(1);
  };

  const queryMapper = {
    "Display all customer": "https://json-server-madan.herokuapp.com/contacts",
    "Display first 100 records": "https://json-server-madan.herokuapp.com/contacts?_limit=100",
    "Display all customer sort by customer name":
      "https://json-server-madan.herokuapp.com/contacts?_sort=CustomerName&_order=asc",
    "Display all customer which state is Illinois":
      "https://json-server-madan.herokuapp.com/contacts?State=Illinois",
  };

  return (
    <div>
      <div className="query-section">
        <select
          className="pre-select-query"
          onChange={(e) => handleQueryChange(e)}
        >
          <option value="">Select Query</option>
          <option value="Display all customer">Display all customer</option>
          <option value="Display first 100 records">
            Display first 100 records
          </option>
          <option value="Display all customer sort by customer name">
            Display all customer sort by customer name
          </option>
          <option value="Display all customer which state is Illinois">
            Display all customer which state is Illinois
          </option>
        </select>
        <textarea
          className="query-input"
          placeholder="Enter sql query here..."
          id="query"
          ref={ref}
        ></textarea>
        <button className="execute-button" onClick={handleExecute}>
          Execute
        </button>
        <br />
        {showError ? (
          <span className="error-message">Please enter query to execute</span>
        ) : null}
      </div>
      {showTable ? (
        <div className="result-section">
          <div className="table-wrapper">
            <table id="myTable">
              <thead>
                <tr>
                  <th>CustomerID</th>
                  <th>CustomerName</th>
                  <th>Age</th>
                  <th>Qualification</th>
                  <th>Income</th>
                  <th>WorkExp</th>
                  <th>NumofHousehold</th>
                  <th>Region</th>
                  <th>State</th>
                  <th>AccountBalance</th>
                  <th>RelationShipTenure</th>
                  <th>NumberofAccounts</th>
                  <th>TypeofAccount</th>
                  <th>EmploymentStatus</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <TableRow
                    key={`${row.CustomerName}+${i}`}
                    data={row}
                  ></TableRow>
                ))}
              </tbody>
            </table>
          </div>
          <div className="page-limit-selector">
            <select onChange={(e) => handlePageLimit(e)} value={noOfPages}>
              <option value="10">Show 10</option>
              <option value="30">Show 30</option>
              <option value="50">Show 50</option>
              <option value="100">Show 100</option>
            </select>
          </div>
          <div className="pagination">
            <input type="button" onClick={() => changePage(1)} value="First" />
            {paginationPages.map((page, i) => {
              return (
                <span
                  className={`page-number ${
                    activePage === page ? "active" : ""
                  }`}
                  onClick={() => changePage(page)}
                  key={i}
                >
                  {page}
                </span>
              );
            })}
            <input
              type="button"
              onClick={() => changePage(noOfPages)}
              value="Last"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default DataTable;
