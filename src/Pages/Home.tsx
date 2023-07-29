import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../Context/AuthContext'
const Home = () => {
  const {User} = useAuth();
  return (
    <HomeContainer>
      <div className='Home__Content'>
        <h1>{User.userData.shopname}</h1>
        <h3>{User.userData.tagline || "Lets Begin"}</h3>
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