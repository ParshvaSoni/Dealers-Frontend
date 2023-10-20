import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
const AccountLayout = () => {
  return (
    <Account__Layout__Container>
      <h1 style={{ textAlign: "center" }}>Account Update</h1>
      <Outlet />
    </Account__Layout__Container>
  )
}

export default AccountLayout;

const Account__Layout__Container = styled.div`
  padding:0.5rem;
  width:100%;
  height:100%;
`;