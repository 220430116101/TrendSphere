import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    country:'us',
    pageSize:8,
    category:"general"        // deafult catagory is general.
  };

  static PropTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
    setProgress: PropTypes.func.isRequired
  };

// copied from sampleout.json
//  articles = [ // yaha per paste karnni padti thi]

  constructor(props){                                                      // jab bhi ishh class(NewsItem) ka koi object banata hain tab constructer ka use hota he.
    super(props);                                                          // super class ke object ko call karo.
    console.log("This is a constructer from News component.");

    // now understand this:  // state ka part banane ke liye.
    this.state={   
      // articles: this.articles,
      articles : [],
      loading: true,
      page: 1,
    }
    document.title = `${this.props.category.charAt(0).toUpperCase()}${this.props.category.slice(1)} - TrendSphere`

  }


// here async function apni body me kuch promice resolve hone tak ka wait kar shakta he
async componentDidMount(){      
  console.log("cdm");         // componentDidMount() is run before render method.
  // this.props.setProgress(0);
  this.props.setProgress(15);
  this.setState({ loading: true }); 
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9871f501a79148e1b853385d644b7f57&page=1&pageSize=${this.props.pageSize}`

  let data = await fetch(url);            // fetch api url leti hain and promice return karti he. 
  this.props.setProgress(30);
  let parsedData = await data.json();
  this.props.setProgress(70);
  console.log(parsedData);
  this.setState({
    articles: parsedData.articles,
    totalResult:parsedData.totalResults,
    loading: false
  });
  this.props.setProgress(100);
}

  handlePrevious = async() => {
    console.log("Previous");
    
    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9871f501a79148e1b853385d644b7f57&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);            // fetch api url leti hain and promice return karti he.
    let parsedData = await data.json();
    console.log(parsedData);
    // this.setState({articles: parsedData.articles})                                                   remove this and paste below as a same setState({})
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  
  }






  handleNext = async () => {
    console.log("Next");
const totalpages = Math.ceil(this.state.totalResult / this.props.pageSize);
    if (this.state.page + 1 > totalpages) {                                                     //  Math.ceil(this.state.totalResult / 12 : find total number of pages.
          // also  we disable next button when there are not any news.(so write line no.107 code.)
    } else {

      this.setState({ loading: true });

      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9871f501a79148e1b853385d644b7f57&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`      // Here passing props through New.jsx
      let data = await fetch(url);            // fetch api url leti hain and promice return karti he.
      let parsedData = await data.json();
      console.log(parsedData);
      // this.setState({articles: parsedData.articles})                                                   remove this and paste below as a same setState({})
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
  }



  render() {
    console.log("render");
    const totalpages = Math.ceil(this.state.totalResult / this.props.pageSize);                         //  calculate totalPages.

    return (
        <div className="container my-4">
          <h1 className="text-center" style={{margin:'10px 0px', marginBottom:"10px"}}>TrendSphere - Top {this.props.category.charAt(0).toUpperCase()}{this.props.category.slice(1)} Headline</h1>
         {this.state.loading && <Spinner/>}

        {/* {this.state.articles.map((element) => {console.log(element)})} */}
        
          <div className="row">

          {/* {this.state.articles.map((element) => {console.log(element)})} */}

          { ! this.state.loading && this.state.articles.map((element) => 
          {
            return (
            <div className="col-md-4 " key={element.url} >
              <NewsItem 
              title={element.title? element.title.slice(0,45): ""} 
              description={element.description? element.description.slice(0,88): ""} 
              imageUrl={element.urlToImage} 
              newsUrl={element.url}
              author={element.author}
              publishedAt={element.publishedAt}
              />
              <br/>
            </div>)

            })}
        </div>

        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePrevious}> &larr; Previous</button>
          <button  disabled={this.state.page + 1 > totalpages } type="button" className="btn btn-dark" onClick={this.handleNext}>Next   &rarr;</button>       {/* line 59*/}
        </div>
      </div>

    );
  }
}

export default News;
