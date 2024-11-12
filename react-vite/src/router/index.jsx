import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import CartPage from '../components/Cart';
import PurchasePage from '../components/PurchaseConfirm';

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
      // {
      //   path: "/test-review",
      //   element: (
      //       <div>
      //           <h1>Test the Review Modal</h1>
      //           <OpenModalButton
      //               modalComponent={<CreateReviewModal productId={1} user={user} />}
      //               buttonText="Open Review Modal"
      //           />
      //       </div>
      //   ),
      // }
      {
        path:"cart",
        element:<CartPage />
      },
      {
        path:"checkout",
        element:<PurchasePage />
      }
    ],
  },
]);