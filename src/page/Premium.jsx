import React, { useState, useEffect } from 'react';
import "./Premium.css";

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [premiumData, setPremiumData] = useState([]);
  const [loadingPremium, setLoadingPremium] = useState(true);
  const [errorPremium, setErrorPremium] = useState(null);

  useEffect(() => {
    const fetchPremiumData = async () => {
      try {
        const response = await fetch('https://localhost:7227/api/Premium/get-all');
        if (response.ok) {
          const data = await response.json();
          console.log('Premium Data:', data);
          setPremiumData(data.$values); // Assuming $values contains the array of premium plans
        } else {
          setErrorPremium('Failed to fetch premium data');
        }
      } catch (error) {
        setErrorPremium('Error fetching premium data');
      } finally {
        setLoadingPremium(false);
      }
    };

    fetchPremiumData();
  }, []);

  const selectedPremium = Array.isArray(premiumData) && premiumData.length > 0
    ? premiumData.find((premiumItem) => premiumItem.name === selectedPlan)
    : null;

  const planPrice = selectedPremium ? `$${selectedPremium.price} USD/${selectedPremium.dayExpire} days` : '';

  const handlePostArtwork = () => {
    console.log("Posting artwork:", {
      plan: selectedPremium,
    });
  };

  return (
    <div className="premium">
      <h1>Premium</h1>
      <p>Showcase your artwork with premium features. Start sharing your creativity!</p>
      <h2>Pay frequency after the first trial</h2>
      <div className='form-label'>
        {loadingPremium && <p>Loading premium plans...</p>}
        {errorPremium && <p>{errorPremium}</p>}
        {Array.isArray(premiumData) && premiumData.length > 0 && !loadingPremium && !errorPremium && (
          premiumData.map((premiumItem) => (
            <div key={premiumItem.$id} >
              
              {premiumItem.name} - ${premiumItem.price} USD/ 30 days
            </div>
          ))
        )}
      </div>
      <p>
        <strong>{selectedPremium ? `${selectedPremium.name} - ${planPrice}` : ''}</strong>
      </p>
      <p>
        <button className="payment-link" onClick={handlePostArtwork}>
          Confirm feel free to post Artwork
        </button>
      </p>
    </div>
  );
};

export default Premium;
