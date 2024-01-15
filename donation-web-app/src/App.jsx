import { useState } from 'react';
import './App.css';
import Form from './Form';
import DonationList from './DonationList';

// app is built with React and Bootstrap to quickly get this app built
// I normally use a linter so the code is more organized

function App() {
  // states used to track money, food, and clothing donations (normally saved in database)
  // could also combine all 3 types into one array
  const [moneyData, setMoneyData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [clothingData, setClothingData] = useState([]);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-2 gap-5">
      <Form
        moneyData={moneyData}
        foodData={foodData}
        clothingData={clothingData}
        setMoneyData={setMoneyData}
        setFoodData={setFoodData}
        setClothingData={setClothingData}
      />
      <DonationList
        moneyData={moneyData}
        foodData={foodData}
        clothingData={clothingData}
        setMoneyData={setMoneyData}
        setFoodData={setFoodData}
        setClothingData={setClothingData}
      />
    </div>
  )
}

export default App
