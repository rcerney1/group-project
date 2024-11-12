import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ProductDetailsPage from '../components/ProductDetailsPage';
import Layout from './Layout';
import UpdateProductForm from '../components/UpdateProductForm/UpdateProductForm';
// import OpenModalButton from '../components/OpenModalButton/OpenModalButton.jsx'
// import CreateReviewModal from '../components/CreateReviewModal/CreateReviewModal.jsx';

// //! dummy for testing
// const user = { id: 1, name: "Test User" }; 
// //!

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
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
        path: "/products/:productid",
        element: <ProductDetailsPage />,
      },
      {
        path: "/products/:productId/edit",
        element: <UpdateProductForm />,
      },
      {
        path: "*",
        element: <h1>Page Does Not Exist</h1>,
      },
    ],
  },
]);