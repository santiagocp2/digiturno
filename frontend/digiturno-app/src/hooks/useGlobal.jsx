import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

export const useGlobal = () => useContext(GlobalContext);
