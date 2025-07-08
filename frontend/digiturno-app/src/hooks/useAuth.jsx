import { useContext } from 'react';
import { AuthContext } from '../auths/AuthProvider';

export const useAuth = () => useContext(AuthContext);