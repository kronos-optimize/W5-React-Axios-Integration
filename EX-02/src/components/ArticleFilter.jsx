import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    axios.get('http://localhost:3000/articles')
      .then(response => {
        console.log('Fetched articles:', response.data);
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    axios.get('http://localhost:3000/journalists')
      .then(response => {
        console.log('Fetched journalists:', response.data);
        setJournalists(response.data);
      })
      .catch(error => {
        console.error('Error fetching journalists:', error);
      });
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    axios.get('http://localhost:3000/categories')
      .then(response => {
        console.log('Fetched categories:', response.data);
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }

  const fetchArticlesByCategoryAndJournalist = async (categoryId, journalistId) => {
    const articlesById = articles.filter(article => {
      return (categoryId ? article.categoryId === categoryId : true) &&
             (journalistId ? article.journalistId === journalistId : true);
      });
      setArticles(articlesById);
    }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter"
          value={selectJournalist}
          onChange={(e) => {
            setSelectJournalist(e.target.value);
          }}>
          <option value="">All Journalists</option>
          {/* Options for journalists */
          journalists.map(journalist => (
            <option key={journalist.id} value={journalist.id}>
              {journalist.id}.{journalist.name}
            </option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter"
          value={selectCategory}
          onChange={(e) => {
            setSelectCategory(e.target.value);
          }}>
          <option value="">All Categories</option>
          {/* Options for categories */
          categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.id}.{category.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            fetchArticlesByCategoryAndJournalist(selectedCategory, selectedJournalist);
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