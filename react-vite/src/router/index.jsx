import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import OpenModalButton from '../components/OpenModalButton/OpenModalButton.jsx'
import CreateReviewModal from '../components/CreateReviewModal/CreateReviewModal.jsx';
import DeleteReviewModal from '../components/DeleteReviewModal/DeleteReviewModal.jsx';


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
        path: "/test-review",
        element: (
            <div>
                <h1>Test the Review Modal</h1>
                <OpenModalButton
                    modalComponent={<CreateReviewModal productId={1} />}
                    buttonText="Open Review Modal"
                />
                <OpenModalButton
                  modalComponent={<DeleteReviewModal reviewId={4}/>} 
                  buttonText="delete"
                />
            </div>
        ),
      }
    ],
  },
]);