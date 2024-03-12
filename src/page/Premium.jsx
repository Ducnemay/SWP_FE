import React, { useState, useEffect } from 'react';
import "./Premium.css";
import useAuth from '../hooks/useAuth';
import api from '../components/utils/requestAPI';
import { useNavigate } from 'react-router-dom';

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [premiumData, setPremiumData] = useState([]);
  const [loadingPremium, setLoadingPremium] = useState(true);
  const [errorPremium, setErrorPremium] = useState(null);
  const [approved, setApproved] = useState(false);
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const createPremiumPayment = async () => {
    try {

      // const PremiumResponse = await api.get(`https://localhost:7227/api/Premium/get-all`);
      //       const  PremiumResponseData = PremiumResponse.data;
      const premiumData = {
        userID: auth.user.userId,
  premiumId: "PremiumID",
  createDate: new Date().toISOString()
  
      };
    
      const response = await api.post(`https://localhost:7227/api/OrderPremium/add-new-order-premeium`, premiumData);
      const orderPremiumId = response.data.orderPremiumId; // Return the paymentId from the response

      const PremiumLogResponse = await api.post(`https://localhost:7227/api/OrderPremiumLog/create-new-Premium-log?id=${orderPremiumId}`);
      
      setApproved(true);
        navigate(`/orderprumium-info/${orderPremiumId}`);
    } catch (error) {
      console.error('Error creating payment Premium:', error);
      // console.log(auth.user.userId,new Date().toISOString());
    }
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
        <button className="payment-link" onClick={createPremiumPayment}>
          Confirm feel free to post Artwork
        </button>
      </p>
    </div>
  );
};

export default Premium;
