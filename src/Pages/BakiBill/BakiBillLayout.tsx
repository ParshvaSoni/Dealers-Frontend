import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
const BakiBillLayout = () => {
  return (
    <Baki_Bill_Layout_Container>
      <h1 style={{ textAlign: "center" }}>Baki Bill</h1>
      <Outlet />
    </Baki_Bill_Layout_Container>
  )
}

export default BakiBillLayout;

const Baki_Bill_Layout_Container = styled.div`
  padding:0.5rem;
  width:100%;
  height:100%;
`;