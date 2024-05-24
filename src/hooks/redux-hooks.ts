import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// custom hooks in order to be able to use Typescript instead of Javascript and typed param for state. This to replace useDispatch and useSelector

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
