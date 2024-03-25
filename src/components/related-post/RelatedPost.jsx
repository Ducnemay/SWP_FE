import React from 'react';
import './RelatedPost.css'

const RelatedPost = () => {
    // Dummy data for suggested articles
    const suggestedRelatedPosts = [
        {
            id: 1,
            title: 'Article 1',
            date: "October 1, 2023",
            author: "John Smith",
            url: '/blog-content',
            image: '/bocau.jpg'
        },
        {
            id: 2,
            title: 'Article 2',
            date: "October 1, 2023",
            author: "John Smith",
            url: 'https://example.com/article2',
            image: '/chaomao.png'
        },
        {
            id: 3,
            title: 'Article 3',
            date: "October 1, 2023",
            author: "John Smith",
            url: 'https://example.com/article3',
            image: '/cu.jpg'
        },
        {
            id: 4,
            title: 'Article 4',
            date: "October 1, 2023",
            author: "John Smith",
            url: 'https://example.com/article3',
            image: '/hoami.png'
        },
    ];

    return (
        <div className="related-post-section">
            <h3>Bài viết liên quan</h3>
            <div className='related-post-container'>
                {suggestedRelatedPosts.map((relatedpost, index) => (
                    <div key={index} className='related-post-item'>
                        <a href={relatedpost.url}>
                            <div className="related-post-item-img">
                                <img src={relatedpost.image} alt={relatedpost.title} />
                            </div>
                            <h4 className='related-post-title'>{relatedpost.title}</h4>
                            <p className="related-post-meta">
                                <span className="related-post-date">{relatedpost.date}</span> . <span className="related-post-author">bởi {relatedpost.author}</span>
                            </p>
                            <p className='related-post-item-link'>Xem chi tiết &raquo;</p>
                        </a>
                    </div>
                ))},
            </div>
        </div>
    );
};

export default RelatedPost;
