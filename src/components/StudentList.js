import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const StudentList = () => {
  const host = "http://localhost:9000";
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleParse = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const parsedData = jsonData.slice(1).map(row => ({
        student: row[0],
        net_id: row[1]
      }));
      
      setData(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    axios.post(`'${host}/upload-student-data`, data)
      .then(response => {
        console.log('Data successfully sent to backend:', response.data);
      })
      .catch(error => {
        console.error('There was an error sending the data!', error);
      });
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleParse} disabled={!file}>Parse</button>
      {data.length > 0 && (
        <div>
          <h3>Parsed Data</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default StudentList;
