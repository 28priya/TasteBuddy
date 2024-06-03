import React from 'react';
import { useParams } from 'react-router-dom';
import { dietData } from '../data/dietData';

const DietDetail = () => {
  const { dietName } = useParams();
  const diet = dietData.find(d => d.name === dietName);

  if (!diet) {
    return <div>Diet not found</div>;
  }

  return (
    <div className="diet-detail-container">
      <h1 className="text-4xl font-bold mb-4">{diet.name}</h1>
      <p className="text-lg mb-4">{diet.description}</p>
      <h2 className="text-2xl font-semibold mb-2">Recipes:</h2>
      <ul className="recipe-list">
        {diet.recipes.map((recipe, index) => (
          <li key={index} className="recipe-item mb-2">
            <h3 className="text-xl font-semibold">{recipe.name}</h3>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DietDetail;
