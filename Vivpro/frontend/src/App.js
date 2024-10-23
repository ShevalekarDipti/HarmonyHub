import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './App.css';
import Rating from '@mui/material/Rating';

function App() {
  
  const [data, setData] = useState({ rows: [], columns: [] });
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });


  const fetchAllSongs = async () => {
    setLoading(true);

    try {
      //was facing issue to get all iteams and get the items with reuired page num so to adjust the corrrect page num has to write the +1
      const response = await fetch(`http://127.0.0.1:5000/api/songs?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}`);
      const result = await response.json();

      if (result.songs && result.songs.length > 0) {
        //formatiting the data to show in the table
        const formattedData = {
          //The overall purpose of this line is to transform each song object in the result songs array into a new object that has the same properties as the original song object but also explicitly includes the id property at the top level
          rows: result.songs.map((song) => ({
            id: song.id,
            ...song,
          })),
          columns: Object.keys(result.songs[0]).map((key) => ({
            field: key,
            headerName: key, //.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '), //to fetch correct headers 
            width: 150,
          })),
          totalitems: result.total_items,
        };

        if (!formattedData.columns.find(col => col.field === 'rating')) {
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
        }

        setData(formattedData);
      } else {
        // If no songs found the data will be removed
        setData({ rows: [], columns: [] });
      }
    } catch (error) {
      console.error('Could not fetch any songs', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleRatingChange = async (id, newValue) => {
    setData((prevData) => ({
      ...prevData,
      rows: prevData.rows.map((row) =>
        row.id === id ? { ...row, rating: newValue } : row
      ),
    }));
  

    try {
      //put method to append the ratings given by the user to the exisiting json data which was set tot 0 in the backend normalizarion
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
      console.log("Ratings worked");
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const searchSongsByTitle = async () => {
    setLoading(true); 
    try {
      const encodedSearchTitle = encodeURIComponent(searchTitle.trim());
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
          totalitems: result.length,
        };

        if (!formattedData.columns.find(col => col.field === 'rating')) {
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
        }

        setData(formattedData);
      } else {
     
        setData({ rows: [], columns: [], totalitems: 0 });
      }
    } catch (error) {
      console.error('Error searching songs by title:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleSearch = () => {
    if (searchTitle.trim()) {
      searchSongsByTitle();
    } else {
      fetchAllSongs(); 
    }
  };

const convertToCSV = (data) => {
  const header = data.columns.map((col) => col.headerName).join(',')
  const rows = data.rows.map((row) => {
    return data.columns.map((col) => {
      //faced issue when the string didnt have any values such as rating was 0
      const cellValue = row[col.field] !== undefined && row[col.field] !== null 
        ? row[col.field].toString().replace(/"/g, '""') 
        : ''; // that is why i returned empty string if value is undefined or null
      return `"${cellValue}"`
    }).join(',');
  });

  return [header, ...rows].join('\n')
};
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
  useEffect(() => {
    fetchAllSongs();
  }, []); 

  // Fetching  songs when pagination changes i.e 10-20 to 20-30
  useEffect(() => {
    fetchAllSongs();
  }, [paginationModel]); //will start running when pagination changes

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)} 
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
          rowCount={data.totalitems} 
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
