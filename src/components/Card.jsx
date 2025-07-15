import React from "react";
import "./Card.css";

const Card = ({ data }) => {
  const filteredData = Array.isArray(data)
    ? data.filter(
        (news) =>
          typeof news.image === "string" &&
          news.image.trim().startsWith("http")
      )
    : [];

  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center" }}>No News Available</p>;
  }

  if (filteredData.length === 0) {
    return <p style={{ textAlign: "center" }}>No News with Images Available</p>;
  }

  return (
    <div className="card-container">
      {filteredData.map((currElem) => (
        <div className="card" key={currElem.url}>
          <img src={currElem.image} alt="News" />
          <div className="cardContent">
            <a className="title">{currElem.title}</a>
            <p>{currElem.description}</p>
            <a
              href={currElem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="readMoreBtn"
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
