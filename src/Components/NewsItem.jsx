// import PropTypes from 'prop-types'
// import React, { Component } from 'react'

// export class NewsItem extends Component {

//   static propTypes = {}

//   render() {

//     let { title, description, imageUrl, newsUrl, author, publishedAt } = this.props;                // write all propertty which are need for further uses.

//     return (
//       <div className='my-2'>
//         <div className="card" style={{ borderColor: "Highlight" }}>
//           <img src={imageUrl} className="card-img-top" alt="..." />
//           <div className="card-body">
//             <h5 className="card-title">{title} ...</h5>
//             <p className="card-text">{description} ...</p>
//             <p className="card-text"><small className="text-body-secondary">By {!author ? 'unknown' : author} on {new Date(publishedAt).toGMTString()}</small></p>
//             <a href={newsUrl} target='_blank' className="btn btn-sm  btn-primary my-2">Read More</a>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// export default NewsItem



import PropTypes from 'prop-types'
import React, { Component } from 'react'

const NewsItem = (props) => {

  let { title, description, imageUrl, newsUrl, author, publishedAt } = props;                // write all propertty which are need for further uses.

  // Default values
  const defaultImageUrl = "https://meditechnologylk.com/assets/images/products/allProducts/unknownimage.jpg"; // Default placeholder image
  return (
    <div className='my-2'>



      <div className="card" style={{ borderColor: "Highlight" }}>
        {/* <img src={imageUrl || defaultImageUrl} className="card-img-top" alt="..." /> */}

        <img
          src={imageUrl || defaultImageUrl}
          className="card-img-top"
          alt="News"
          style={{
            height: "280px", // Fixed height for image
            objectFit: "cover" // Prevents stretching and keeps aspect ratio
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{title} ...</h5>
          <p className="card-text">{description} ...</p>
          <p className="card-text"><small className="text-body-secondary">By {!author ? 'unknown' : author} on {new Date(publishedAt).toGMTString()}</small></p>
          <a href={newsUrl} target='_blank' className="btn btn-sm  btn-primary my-2">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
