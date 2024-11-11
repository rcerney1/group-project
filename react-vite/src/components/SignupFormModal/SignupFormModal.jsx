import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name,setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    //check if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setErrors({ 
        email: 
        "Please enter a valid email address." 
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        first_name,
        last_name,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup_form_container">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name <span className="required">*</span>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className={errors.firstName ? "error" : ""}
            required
          />
        </label>
        {errors.firstName && <p className="error">{errors.firstName}</p>}
    
        <label>
          Last Name <span className="required">*</span>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className={errors.lastName ? "error" : ""}
            required
          />
        </label>
        {errors.lastName && <p className="error">{errors.lastName}</p>}
    
        <label>
          Email <span className="required">*</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "error" : ""}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Username <span className="required">*</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={errors.username ? "error" : ""}
            required
          />
        </label>
        {errors.username && <p className="error">{errors.username}</p>}
        <label>
          Password <span className="required">*</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "error" : ""}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <label>
          Confirm Password <span className="required">*</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? "error" : ""}
            required
          />
        </label>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
