import React from 'react';
import './Modal.css';


function Modal({ onClose, article }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{article.title}</h2>
        <p>{article.abstract}</p>
        <p>{article.byline}</p>
        <p className="date">Updated: {new Date(article.updated_date).toLocaleString()}</p>
        <div className='image-container'>
        <img src={article?.multimedia[0].url} alt="Article" className='image-css' />
        </div>
        <p className="date">Published: {new Date(article.published_date).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default Modal;
