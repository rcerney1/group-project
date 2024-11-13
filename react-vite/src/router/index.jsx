import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ProductDetailsPage from '../components/ProductDetailsPage';
import Layout from './Layout';
import UpdateProductForm from '../components/UpdateProductForm/UpdateProductForm';
import Products from '../components/Products/Products';
import Favorites from '../components/Favorites/Favorites';
import CartPage from '../components/Cart';
import PurchasePage from '../components/PurchaseConfirm';
import ManageProductsPage from '../components/ManageProductsPage/ManageProductsPage.jsx';
import CreateProductForm from '../components/CreateProductForm/CreateProductForm';




export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:"cart",
        element:<CartPage />
      },
      {
        path:"checkout",
        element:<PurchasePage />
      },
      {
        path: "favorites",  
        element: <Favorites />,  
      },
      {
        path: "/products/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "/products/:productId/edit",
        element: <UpdateProductForm />,
      },
      {
        path: "/products/manage",
        element: <ManageProductsPage/>
      },
      {
        path: "/products/new",
        element: <CreateProductForm />,
      },
      {
        path: "*",
        element: <h1>Page Does Not Exist</h1>,
      },
    ],
  },
]);