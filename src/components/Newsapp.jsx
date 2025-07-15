import React from 'react'
import { useState, useEffect } from "react";
import "./Newsapp.css";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
const API_KEY = "dd3c6836bee53bdb50b3d19fd6f3393f"; // aapki verified key
  const getData = async (keyword = search) => {
    setLoading(true);
    const query = keyword || search;
    try {
      const response = await fetch(
         `https://gnews.io/api/v4/search?q=${query}&lang=en&apikey=${API_KEY}`
      );
      const jsonData = await response.json();
      setNewsData(jsonData.articles);
      setSearch(query);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <nav>
        <div>
          <h1>Trendy News</h1>
        </div>
        <ul>
          <a>All News</a>
          <a>Trending</a>
        </ul>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getData();
              }
            }}
          />
          <button onClick={getData}>Search</button>
        </div>
      </nav>
      <div>
        <p className="head">Stay Updated with TrendyNews</p>
      </div>
      <div className="categoryBtn">
        <button onClick={() => getData("sports")}>Sports</button>
        <button onClick={() => getData("politics")}>Politics</button>
        <button onClick={() => getData("fitness")}>Fitness</button>
        <button onClick={() => getData("health")}>Health</button>
      </div>
      <div>
        {loading && <p className="loading-text">Loading...</p>}
        {newsData ? <Card data={newsData} /> : null}
      </div>
    </div>
  );
};

export default Newsapp;
