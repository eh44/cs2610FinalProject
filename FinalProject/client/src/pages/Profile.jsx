import { useEffect, useState } from "react";
import './Profile.css'



export function Profile() {
    const [profile, setProfile] = useState(null);
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [bestScore, setBestScore] = useState(0);
    async function getProfile() {
    
          const results1 = await fetch(`/api/get_profile`, {
            credentials: 'same-origin'
          });
          console.log(results1);
          try{
         const {profile} = await results1.json();
         setProfile(profile);
         setIsLoading1(false);
          }
          catch(error){
            window.location = "/registration/sign_in/";
          }
         
          
        
          const results2 = await fetch(`/api/best_score`, {
             credentials: 'same-origin'
            });
            const {score} = await results2.json();
            console.log(score);
            setBestScore(score);
            setIsLoading2(false);
        }
      
useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className="profile-container">
      {!isLoading1 && profile !== null && (
        <div className="profile-info">
          <h2>User Profile</h2>
          <p>Your Best Score: {profile.score}</p>
          <p>Best Score Ever: {bestScore}</p>
        </div>
      )}
      {(isLoading1 || isLoading2) && <p className="loading-text">Loading...</p>}
    </div>
  );
}