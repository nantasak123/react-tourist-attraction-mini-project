import "./App.css";
import axios from "axios";
import { useState,useEffect } from "react";
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
</style>

function App() {
  let [textSearch,setTextSearch] = useState("")
  let [touristkData,setTouristData] = useState([])

  useEffect(() => {
    getData(textSearch)
    console.log(touristkData)
  },[])
  let getData = async(text) =>{
    try {
    let result = await axios.get(`http://localhost:4001/trips?keywords=${text}`)
     setTouristData(result.data.data)
    }catch(error){
      console.log(error)
      console.log("error")
    }
  }

  useEffect(() => {
    getBookData(textSearch)
    console.log(touristkData)
  },[textSearch])

 let getBookData = async(text) => {
    try {
      let result = await axios.get(`http://localhost:4001/trips?keywords=${text}`)
       setTouristData(result.data.data)
      }catch(error){
        console.log(error)
        console.log("error")
      }
    }

  return (
    <div className="App" >
      <h1>เที่ยวไหนดี</h1>
      <div className="search-book">
        <input type="search" placeholder="ค้นหาที่เที่ยว" onChange={(e) => setTextSearch(e.target.value)} />
        <h5>หาที่เที่ยวแล้วไปกัน...</h5>
        <hr />
      </div>
      {
        touristkData.map((item,index) =>{
          return (
            <div className="tourist-box">
              <div className="tourist-image">
                <img src={item.photos[0]} alt="#" />
              </div>
              <div className="tourist-data">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <a href={item.url} target="_blank">อ่านต่อ</a>
                <div className="tourist-tag">
                  หมวด 
                  {(item.tags).map((items,index) => {
                      return (
                      <a href="">{items}</a>
                    )
                  })}
                </div>
                <div className="tourist-image-list">
                  {
                    (item.photos).map((item,index) => {
                      if(index > 0 && index < 4){
                        return (
                      <a href={item} target="_blank">
                        <img src={item} alt="#" />
                      </a>
                      )
                      }
                    })
                  }
                </div>
              </div>
            </div>
          )
        })
      }
    
    </div>
)
}

export default App;
