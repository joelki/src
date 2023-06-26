import React, { useEffect, useState } from 'react';
import customerData from './customers.json';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then(responseData => {
        setData(responseData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const fetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(customerData);
      }, 2000); // Simulated delay of 2 seconds
    });
  };

  const calculateRewards = monthData => {
    return monthData.reduce((total, amount) => {
      if (amount > 100) {
        return total + (amount - 100) * 2 + 50;
      } else if (amount > 50 && amount <= 100) {
        return total + (amount - 50);
      } else {
        return total;
      }
    }, 0);
  };
  
  const totalAccruedRewards = customerData => {
    let totalPoints = 0;
    for (let i = 0; i < customerData.length; i++){
      const customer = customerData[i];
      totalPoints += calculateRewards(customer.month1);
      totalPoints += calculateRewards(customer.month2);
      totalPoints += calculateRewards(customer.month3);
    }
    return totalPoints
  }

  return (
    <div className="App">
      <header className="App-header">
        {data ? (                                                      
          data.customer.map((customer, index) => (
            <div key={index}>
              <h2>Name: {customer.name}</h2>
              <p className="Customer-data">Month 1: ${customer.month1.join(', $')}</p>
              <p className="Monthly-total">Month 1 Total Points: {calculateRewards(customer.month1)}</p>
              <p className="Customer-data">Month 2: ${customer.month2.join(', $')}</p>
              <p className="Monthly-total">Month 2 Total Points: {calculateRewards(customer.month2)}</p>
              <p className="Customer-data">Month 3: ${customer.month3.join(', $')}</p>
              <p className="Monthly-total">Month 3 Total Points: {calculateRewards(customer.month3)}</p>
              <p className="Total-points">Total Accrued Reward Points for {customer.name}:  {totalAccruedRewards([customer])}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;