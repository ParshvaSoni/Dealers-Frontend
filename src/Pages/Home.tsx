import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../Context/AuthContext'
import { useDealersData } from '../Context/DealersContext';
const Home = () => {
  const {User} = useAuth();
  const {dealer} = useDealersData();
  return (
    <HomeContainer>
      <div className='Home__Content'>
        <h1>{dealer.DealersData?.shopname || "Welcome"}</h1>
        <h3>{dealer.DealersData?.tagline || "Lets Begin"}</h3>
      </div>
    </HomeContainer>
  )
}

export default Home;

const HomeContainer = styled.div`
  display:flex;
  flex-direction:column;
  height:100%;
  align-items:center;

  .Home__Content{
    text-align:center;
    margin:auto auto;
  }
`;