import React, { useState, useEffect } from 'react';
import ArticlesList from '../Components/ArticlesList';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';
import NotFoundPage from '../pages/NotFoundPage';
import articleContent from './article-content';


const ArticlePage = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(`http://localhost:8000/api/articles/${name}`);
        const body = await result.json();
        setArticleInfo(body);
      }
      fetchData();
    }, [name]);

    if (!article) return <NotFoundPage />

    const otherArticles = articleContent.filter(article => article.name !== name);

    return (

    <>
        <h1>{article.title}</h1>
        <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
        {article.content.map((paragraph, key) => (
            <p key={key}>{paragraph}</p>
        ))}
        <CommentsList comments={articleInfo.comments} />
        <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
            <h2>Other Articles:</h2>
            <ArticlesList articles={otherArticles} />
        </>
    )
}

export default ArticlePage;
