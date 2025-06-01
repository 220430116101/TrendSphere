import React, { Component, useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

import PropTypes from 'prop-types';

const News = (props) => {

const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);
const [page, setPage] = useState(1);
const [totalResults, setTotalResults] = useState(0);
// document.title = `${category.charAt(0).toUpperCase()}${category.slice(1)} - TrendSphere`

// here async function apni body me kuch promice resolve hone tak ka wait kar shakta he

useEffect(() => {
    document.title = `${props.category.charAt(0).toUpperCase()}${props.category.slice(1)} - TrendSphere`;
    fetchData(); // Fetch data on initial load
    // eslint-disable-next-line
  }, [page]); // Empty dependency array means this runs once on mount

  useEffect(() => {
    fetchData();
  }, [page]);

  // fetchData function replaces componentDidMount logic
  const fetchData = async () => {
    console.log("Fetching data...");
    props.setProgress(15); // replaces `this.props.setProgress`
    setLoading(true);       // Replaces `this.setState({ loading: true })`

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9871f501a79148e1b853385d644b7f57&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  // Handle Previous Page Button
  const handlePrevious = async () => {
    setPage(page - 1);
    await fetchData();
  };

  // Handle Next Page Button
  const handleNext = async () => {
    const totalPages = Math.ceil(totalResults / props.pageSize);
    if (page + 1 <= totalPages) {
      setPage(page + 1);
      await fetchData();
    }
  };

  
    console.log("render");
    const totalpages = Math.ceil(totalResults / props.pageSize);                         //  calculate totalPages.

    return (
        <div className="container my-4">
          <h1 className="text-center" style={{margin:'30px 0px', marginTop:"80px"}}>TrendSphere - Top {props.category.charAt(0).toUpperCase()}{props.category.slice(1)} Headline </h1>
         {loading && <Spinner/>}

        
         <div className="row">
       {!loading && Array.isArray(articles) && articles.map((element) =>  (
          <div className="col-md-4" key={element.url}>
            <NewsItem
              title={element.title ? element.title.slice(0, 45) : ""}
              description={element.description ? element.description.slice(0, 88) : ""}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              publishedAt={element.publishedAt}
            />
            <br />
          </div>
        ))}
      </div>

        <div className='container d-flex justify-content-between'>
          <button disabled={page<=1} type="button" className="btn btn-dark " onClick={handlePrevious}> &larr; Previous</button>
          <button  disabled={page + 1 > totalpages } type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>       {/* line 59*/}
        </div>
      </div>

    );
  }




News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: "general"        // deafult catagory is general. and it is at the emd side instaed of upside(in class based component)
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired
};

export default News;
