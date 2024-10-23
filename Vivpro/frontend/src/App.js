import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'; // Ensure this library is installed
import './App.css';
import Rating from '@mui/material/Rating';


function App() {
  // State to hold the song data
  const [data, setData] = useState({ rows: [], columns: [] });
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });


  // Function to fetch all songs
  const fetchAllSongs = async () => {
    setLoading(true); // Start loading
    try {
      
      const response = await fetch(`http://127.0.0.1:5000/api/songs?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}`); // Adjusted for 1-based index
      const result = await response.json();

      if (result.songs && result.songs.length > 0) {
        const formattedData = {
          rows: result.songs.map((song) => ({
            id: song.id,
            ...song,
          })),
          columns: Object.keys(result.songs[0]).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
            width: 150,
          })),
          totalitems: result.total_items,
        };
        formattedData.columns.push({
          field: 'rating',
          headerName: 'Rating',
          width: 150,
          renderCell: (params) => (
            <Rating
              name={`rating-${params.id}`}
              precision={1}
              value={params.row.rating}
              onChange={(event, newValue) => handleRatingChange(params.id, newValue)}
            />
          ),
        });

        setData(formattedData);
      } else {
        // If no songs found, clear data
        setData({ rows: [], columns: [] });
      }
    } catch (error) {
      console.error('Error fetching all songs:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };



  // Function to handle rating change
  const handleRatingChange = async (id, newValue) => {
    setData((prevData) => ({
      ...prevData,
      rows: prevData.rows.map((row) =>
        row.id === id ? { ...row, rating: newValue } : row
      ),
    }));
  
    // Send the updated rating to the backend using string id
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/songs/rate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: newValue }),

      });
      const result = await response.json();
      if (!result.success) {
        console.error('Failed to update rating:', result.error);
      }
    console.log("Ratings worked")} catch (error) {
      console.error('Error updating rating:', error);
    }
  };
  


  // Function to search songs by title
  // Function to search songs by title
  const searchSongsByTitle = async () => {
    setLoading(true); // Start loading
    try {

      
      const encodedSearchTitle = encodeURIComponent(searchTitle.trim());
  
      // Pass the search title as a query parameter instead of a path parameter
      const response = await fetch(`http://127.0.0.1:5000/api/songs/search?title=${encodedSearchTitle}&page=1&per_page=${paginationModel.pageSize}`);

      const result = await response.json();
  
      if (result && result.length > 0) {
        const formattedData = {
          rows: result.map((song) => ({
            id: song.id,
            ...song,
          })),
          columns: Object.keys(result[0]).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
            width: 150,
          })),
          totalitems: result.total_items || result.length,  // Ensure total_items is passed
        };
        formattedData.columns.push({
          field: 'rating',
          headerName: 'Rating',
          width: 150,
          renderCell: (params) => (
            <Rating
              name={`rating-${params.id}`}
              precision={1}
              value={params.row.rating || 0} // keeping the val as 0 when no ratings
              onChange={(event, newValue) => handleRatingChange(params.id, newValue)}
            />
          ),
        });

        setData(formattedData);
      } else {
        // If no songs found, clear data
        setData({ rows: [], columns: [], totalitems: 0 });
      }
    } catch (error) {
      console.error('Error searching songs by title:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  // Inside the return statement, make sure you have this:
  <DataGrid
    rows={data.rows}
    columns={data.columns}
    rowCount={data.totalitems || 0} // Ensure rowCount is passed, default to 0 if undefined
    pagination
    paginationModel={paginationModel}
    paginationMode='server'
    onPaginationModelChange={(newModel) => {
      setPaginationModel(newModel);
    }}
    pageSizeOptions={[10]}
  />
  
  const handleSearch = () => {
    if (searchTitle.trim()) {
      searchSongsByTitle(); // Call search function if there's a search term
    } else {
      fetchAllSongs(); // Call fetch all function if search term is empty
    }
  };
  

  // Function to convert JSON data to CSV
  const convertToCSV = (data) => {
    const header = data.columns.map((col) => col.headerName).join(','); // Get header names
    const rows = data.rows.map((row) => {
      return data.columns.map((col) => {
        // Escape quotes and commas
        const cell = row[col.field].toString().replace(/"/g, '""');
        return `"${cell}"`;
      }).join(',');
    });

    return [header, ...rows].join('\n'); // Combine header and rows
  };

  // Function to trigger CSV download
  const downloadCSV = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'songs.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Use effect to fetch data on component mount
  useEffect(() => {
    fetchAllSongs(); // Fetch data initially
  }, []); // Empty dependency array to run only once when component mounts

  // Fetch songs when pagination changes
  useEffect(() => {
    fetchAllSongs();
  }, [paginationModel]); // Runs when pagination model changes

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)} // Update search input
          placeholder="Search by title..."
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSearch}>Get Songs</button>
        <button onClick={downloadCSV} style={{ marginLeft: '10px' }}>Download CSV</button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data.rows}
          columns={data.columns}
          rowCount={data.totalitems} // Adjust this as per total number of items
          pagination
          paginationModel={paginationModel}
          paginationMode='server'
          onPaginationModelChange={(newModel) => {
            setPaginationModel(newModel);
          }}
          pageSizeOptions={[10]}
        />
      </div>
    </div>
  );
}

export default App;
