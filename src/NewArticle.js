// NewsArticle.js
import React from 'react';
import './NewsArticle.css';

function NewsArticle({ article, onClicks }) {

    const handleClick = () => {
        onClicks(article);
    };

    return (
        <div className="article-container" onClick={handleClick} >
            <h3 className="title">{article.title}</h3>
            <div className="image">
                {article?.multimedia && <img src={article?.multimedia[0]?.url} alt={article.title} />}
            </div>
        </div>
    );
}

export default NewsArticle;
