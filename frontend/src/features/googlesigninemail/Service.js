import { auth, provider } from "../../googlesignin/config";
import { signInWithPopup } from "firebase/auth";

export const simulateSignIn = () => {
    return new Promise((resolve, reject) => {
      // Simulate a successful sign-in with a user email
      const data = {
        email: 'user@example.com',
      };
      resolve(data);
  
      // Simulate an error with reject(error) in case of failure
      reject(new Error('Simulated sign-in error'));
    });
  };