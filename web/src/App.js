import React, { useState, useEffect } from 'react';
import './App.css';

const SearchPage = (props) => {

  // Get input from user 
  const [input, setInput] = useState('');

  // Collect data from api 
  const [placeList, setplaceList] = useState();

  // Function call api from gateway 
  const fetchData = async (input) => {

    // return data from api and combine url with user input send to gateway
    return await fetch('http://localhost:8000/trips?keyword=' + input)
      .then(response => response.json())
      .then(data => {
        // Set data to usestate
        setplaceList(data)

        // Clear input from user
        setInput(input)
      });
  }

  // Function update realtime user input
  const updateInput = async (input) => {
    // Set data 
    setInput(input);
  }

  // Update api data
  useEffect(() => { fetchData(input) }, []);

  // This fuction call for show data from api
  const ShowData = ({ placeList = [] }) => {
    return (
      <>
        {/*Loop data to show user*/}
        {placeList.map((data, index) => {
          if (data) {
            return (
              <div class="grid-container">
                
                {/*Box 1 photo left side*/}
                <div>
                  <img src={data.photos[0]} class="responsive"></img>
                </div>

                {/*Box 2 contain text information*/}
                <div>
                  <div class="text-container">

                    {/*Show title to display*/}
                    <div class="des">
                      <a href={data.url} class="title">{data.title}</a>
                      
                      {/*Show description to display*/}
                      <div class="mytext">
                        <a >{data.description}</a>
                      </div>
                    </div>
                    <br></br>
                    
                    {/*Show continue read to display*/}
                    <a href={data.url} class="link" >อ่านต่อ</a>
                    <br /><br />
                    <a>หมวด : </a>
                    
                    {/*Show description to display*/}
                    {data.tags.map(function (data, index) {
                      return (
                        <div class="divKeyword">
                          <a href="#" class="keyword" key={index} onClick={() => { fetchData(data) }}>{data}</a>
                          <a> </a>
                        </div>
                      );
                    })}
                  </div>
                  {/*Box 3 contain photo lower*/}
                  <div>
                    <img src={data.photos[1]} class="responsive2"></img>
                    <img src={data.photos[2]} class="responsive2"></img>
                    <img src={data.photos[3]} class="responsive2"></img>
                  </div>
                </div>
              </div>
            )
          }
          // if data not exist return noting
          return null
        })}
      </>
    );
  }

  return (
    <>
      <h1 class="topic">เที่ยวไหนดี</h1>

      {/*Show search bar get input from user prepare to send for api */}
      <input
        style={BarStyling}
        key="random1"
        value={input}
        placeholder={"หาที่เที่ยวเเล้วไปกัน"}
        onChange={(e) => updateInput(e.target.value)}
      />
      {/*Send input from user to api gateway */}
      <button type="button" class="button" onClick={() => { fetchData(input) }}>ค้นหา</button>

      {/*Call component for show data*/}
      {ShowData({ placeList })}
    </>
  );
}

export default SearchPage

// Sytle for search bar
const BarStyling =
{
  width: "20rem",
  background: "#F2F1F9",
  border: "none",
  padding: "0.5rem"
};



