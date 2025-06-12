import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    axios.get('http://localhost:3000/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  };

  const fetchCategories = async () => {
    // Fetch categories from the API'
    axios.get('http://localhost:3000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }

  const filterArticlesByCategory = async (categoryId) => {
    axios.get(`http://localhost:3000/articles?categoryId=${categoryId}`)
      .then(response => {
        setArticles(response.data.articles);
        console.log(`Articles for category ${categoryId}:`, response.data);
      })
      .catch(error => {
        console.error('Error filtering articles by category:', error);
      });
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >

          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            filterArticlesByCategory(selectedCategory);
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            fetchArticles();
          }}
        >Reset Filters</button>
      </div>
      
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}