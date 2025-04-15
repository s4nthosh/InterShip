import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { base_url } from '../Constant/ApiUrl';


export const LoggedInDetails = () => {
    return useQuery({
        queryKey: ['loggedInUser'],
        queryFn: async () => {
          const response = await axios.get(`${base_url}/AdminLogin.php`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, // needed if session is stored via cookie
          });
    
          if (!response.data.success) {
            throw new Error(response.data.message || 'User not logged in');
          }
    
          return response.data.user;
        },
        retry: false, // don't retry if failed
      });
}

