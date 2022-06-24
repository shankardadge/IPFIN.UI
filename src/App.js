import logo from './logo.svg';
import './App.css';
import Autocomplete from 'react-autocomplete'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import PostcodeDetails from './PostcodeDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [value, setValue] = useState('');
    const [postcodes, setPostcodes] = useState([])
    const [postcodeDeail, setPostcodeDetail] = useState([])
    function handleChange(e) {
        const loadUsers = async () => {
            const response = await axios.get(process.env.REACT_APP_POSTCODES_API_URL+'autocomplete?postcode=' + e.target.value);
            if (response.data.result === null) {
                setPostcodes(['']);
            }
            else {
                setPostcodes(response.data.result);
            }
        }
        loadUsers()
        setValue(e.target.value)
    }

    function handleSelect(value) {
        setValue(value);
        const loadUsers = async () => {
            if (value !== null) {
                const response = await axios.get(process.env.REACT_APP_POSTCODES_API_URL+value);
                console.log(response.data.result)
                const tableData = [];
                tableData.push(response.data.result);
                setPostcodeDetail(tableData);
            }
        }
        loadUsers()
    }

  return (
      <div className="App">
          <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center'
          }}>
              <div>
                  {/* Inline css*/}
                  <h4 style={{
                      padding: '15px',
                      border: '13px solid #b4f0b4',
                      color: 'rgb(11, 167, 11)'
                  }}>
                 Postcode details.
                  </h4>
              </div>
              <div>
                  <Autocomplete

                      // Items is the list of suggestions 
                      // displayed while the user type
                      items={postcodes}

                      // To handle the case that when
                      // the user type, suggested 
                      // values should be independent
                      // of upper or lower case 
                      shouldItemRender={(item, value
                      ) => item.toLowerCase()
                          .indexOf(value.toLowerCase()) > -1}
                      getItemValue={item => item}
                      renderItem={(item, isHighlighted) =>
                          // Styling to highlight selected item
                          <div style={{
                              background: isHighlighted ?
                                  '#bcf5bc' : 'white'
                          }}
                              key={item.id}>
                              {item}
                          </div>
                      }
                      value={value}

                      // The onChange event watches for
                      // changes in an input field
                      onChange={handleChange}
                      // To set the state variable to value
                      // selected from dropdown
                      onSelect={handleSelect}



                      // Added style in Autocomplete component
                      inputProps={{
                          style: {
                              width: '300px', height: '20px',
                              background: '#e4f3f7',
                              border: '2px outset lightgray'
                              
                          },
                          placeholder: 'Search postcode'
                      }}
                  />
              </div>
          </div>
          <PostcodeDetails postcodeDeail={postcodeDeail} />
      </div>
     
  );
}

export default App;
