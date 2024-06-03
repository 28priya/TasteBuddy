import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ExplorePage.css';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';

const ExplorePage = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    { label: 'Veg', value: 'vegetarian' },
    { label: 'Non-Veg', value: 'chicken' },
    { label: 'Dessert', value: 'dessert' },
    { label: 'Appetizer', value: 'appetizer' },
    { label: 'Main Course', value: 'main course' },
  ];

  const fetchRecipes = async (query) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=49b48cd4&app_key=9ccbf4b0d697d25d780bf842616b6ad0`
      );
      setRecipes(response.data.hits);
    } catch (error) {
      setError('Error fetching recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(''); // Fetch random recipes on page load
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(query);
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    fetchRecipes(category);
  };

  return (
    <Container className="explore-page my-5 p-4 bg-light rounded text-center">
      <h1 className="my-4">Explore Recipes</h1>
      <Form className="d-flex justify-content-center mb-4" onSubmit={handleSearch}>
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a dish..."
          className="large-search-bar"
        />
        <Button type="submit" disabled={loading} variant="primary" className="large-search-button">
          Search
        </Button>
      </Form>
      <div className="d-flex justify-content-center mb-3 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant="outline-primary"
            className="mx-1 large-category-button"
            onClick={() => handleCategoryClick(cat.value)}
          >
            {cat.label}
          </Button>
        ))}
      </div>
      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      <Row className="justify-content-center">
        {recipes.map((recipe, index) => (
          <Col key={index} md={8} className="mb-4">
            <Card className="recipe-card">
              <Row className="no-gutters">
                <Col md={4}>
                  <Card.Img variant="top" src={recipe.recipe.image} alt={recipe.recipe.label} className="recipe-image"/>
                </Col>
                <Col md={8}>
                  <Card.Body className="recipe-card-body">
                    <Card.Title className="recipe-card-title">{recipe.recipe.label}</Card.Title>
                    <Card.Text className="recipe-card-text">
                      {recipe.recipe.ingredientLines.join(', ')}
                    </Card.Text>
                    <Button variant="primary" href={recipe.recipe.url} target="_blank">
                      View Recipe
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExplorePage;
