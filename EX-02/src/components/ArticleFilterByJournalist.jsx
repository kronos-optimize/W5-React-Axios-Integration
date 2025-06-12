import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
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

  const filterArticlesByJournalist = async (journalistId) => {
    axios.get(`http://localhost:3000/articles?journalistId=${journalistId}`)
      .then(response => {
        setArticles(response.data);
        console.log(`Articles for journalist ${journalistId}:`, response.data);
      })
      .catch(error => {
        console.error('Error filtering articles by journalist:', error);
      });
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter"
          value={selectedJournalist}
          onChange={(e) => {
            setSelectedJournalist(e.target.value);
        }}>
          <option value="">All Journalists</option>
          {/* Options for journalists */
          journalists.map(journalist => (
            <option key={journalist.id} value={journalist.id}>
              {journalist.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            filterArticlesByJournalist(selectedJournalist);
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