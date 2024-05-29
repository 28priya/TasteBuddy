import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('pasta');
    const [diet, setDiet] = useState('vegetarian');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes?query=${query}&diet=${diet}`);
                setRecipes(response.data.results);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [query, diet]);

    return (
        <div>
            <h1>Recipe List</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
