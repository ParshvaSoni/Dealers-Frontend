import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Layout from './Components/Layout';
import PageNotFound from './Pages/PageNotFound';
import { Login } from './Pages/Login';
import RequireAuth from './Hooks/RequireAuth';
import Test from './Pages/Test';
import Home from './Pages/Home';
import Settings from './Pages/Settings';
import BakiBillLayout from './Pages/BakiBill/BakiBillLayout';
import BakiBillForm from './Pages/BakiBill/CreateBakiBill';

function App() {
  return (
    <div className="App">
      <Routes>

        {/* Un-Protected Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/test' element={<Test />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Layout />} >

            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />

            {/* <Route path='Offer' element={<OffersLayout />} >
                <Route path='all' element={<p>Offer Listing</p>}/>
                <Route path='create' element={<CreateOffer />}/>
                <Route path='update/:id' element={<UpdateOffer/>}/>
                <Route path='delete' element={<p>Delete Offer</p>}/>
            </Route>

            <Route path='product' element={<ProductLayout />} >
                <Route path='all' element={<p>ALL Product</p>}/>
                <Route path='create' element={<p>Create Product</p>}/>
                <Route path='update' element={<p>Update Product</p>}/>
                <Route path='delete' element={<p>Delete Product</p>}/>
            </Route>
            
            <Route path='category' element={<CategoryLayout />} >
                <Route path='all' element={< CategoryListing/>}/>
                <Route path='create' element={<p>Create Category</p>}/>
                <Route path='update' element={<p>Update Category</p>}/>
                <Route path='delete' element={<p>Delete Category</p>}/>
            </Route>
            
            <Route path='Occasion' element={<OccasionLayout />} >
                <Route path='all' element={<OccasionListing />}/>
                <Route path='create' element={<p>Create Occasions</p>}/>
                <Route path='update' element={<p>Update Occasions</p>}/>
                <Route path='delete' element={<p>Delete Occasions</p>}/>
            </Route>

            <Route path='Class' element={<ClassLayout />} >
                <Route path='all' element={<ClassListing />}/>
                <Route path='create' element={<p>Create Occasions</p>}/>
                <Route path='update' element={<p>Update Occasions</p>}/>
                <Route path='delete' element={<p>Delete Occasions</p>}/>
            </Route> 
            
            */}
            <Route path='BakiBill' element={<BakiBillLayout />} >
              {/* <Route path='all' element={< />}/> */}
              <Route path='create' element={<BakiBillForm />} />
              <Route path='update' element={<p>Update Occasions</p>} />
              <Route path='delete' element={<p>Delete Occasions</p>} />
            </Route>
          </Route>
        </Route>

        {/* No route Found */}
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </div>
  );
}

export default App;
