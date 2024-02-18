// pages/index.js
import React from 'react';

const TransferButton = async () => {
  try {
    const response = await fetch('/api/transfer', {
      method: 'POST',
    });

    const data = await response.json();
    console.log(data);

    // Handle the response and reference as needed
  } catch (error) {
    console.error(error);
  }
};

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <button onClick={TransferButton}>Initiate Transfer</button>
    </div>
  );
};

export default HomePage;
