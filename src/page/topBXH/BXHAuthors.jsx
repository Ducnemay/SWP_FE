import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
  } from "@mui/material";
  import React, { useState } from "react";
  import { Link } from 'react-router-dom';
  import "./Manager.css";
  
  const initialData = [
    { stt: 1, authors: "Phan", post: "100" },
    { stt: 2, authors: "Kang", post: "90" },
    { stt: 3, authors: "Min", post: "50" },
    { stt: 4, authors: "Vvjh", post: "20" },
  ];
  
  const Manager = () => {
    const [data, setData] = useState(initialData);
    const [newItem, setNewItem] = useState({ authors: "", post: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchFound, setSearchFound] = useState(true);
  
    const SideBar = ({ children }) => {
      return (
        <div className="sidebar">
          {children}
        </div>
      );
    };
  
    const handleSearch = () => {
      const results = data.filter(
        (item) =>
          item.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.post.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setSearchResults(results);
      setSearchFound(results.length > 0);
    };
  
    return (
      <div className="container">
        {/* <h2>Manager Account</h2> */}
        <div className="sideba">
          <SideBar>
          <i class="fa-solid fa-crown"></i>
            <h1>TOP BXH</h1>
            <div className="line-top"></div>
            <Link to="/top-authors"><p>Top Authors</p></Link>
            <Link to="/top-like"><p>Top Like</p></Link>
            <p className="foot-sidebar">Copyright &copy; 2024 AtWorks</p>
          </SideBar>
        </div>
        <div>
        <div className="search-top-container">
          <TextField
            label="Search..."
            style={{ width:"800px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            style={{fontSize:"12px"}}
            variant="contained" color="primary" onClick={handleSearch}>
              Search
          </Button>
        </div>
  
        <TableContainer component={Paper}>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>AUTHORS</TableCell>
                <TableCell>POSTS</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            {searchFound ? (
              <TableBody>
                {(searchTerm ? searchResults : data).map((item) => (
                  <TableRow key={item.stt}>
                    <TableCell>{item.stt}</TableCell>
                    <TableCell>{item.authors}</TableCell>
                    <TableCell>{item.post}</TableCell>
                    <TableCell className="actions">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(item.stt)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Not Found
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>x
        </div>
      </div>
    );
  };
  
  export default Manager;