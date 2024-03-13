import { jwtDecode } from 'jwt-decode';
import { signOutUser } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut } from '../redux/auth/authSlice';

const handleToken = (dispatch, message, token) => {
  try {
    const decodedToken = jwtDecode(token); 

    if (decodedToken.exp * 1000 < Date.now()) {
      notifyUser(message);
      dispatch(signOut());
      dispatch(signOutUser());
    }
  } catch (error) {
    console.error('Error decoding token:', error.message);
  }
};

const notifyUser = (message) => {
  toast.error(message);
  console.log(message);
};

export default handleToken
