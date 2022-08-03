import { configureStore} from '@reduxjs/toolkit';
import userSliceReduer from './features/userAuth/userSlice';
const newStore = configureStore({
    reducer: userSliceReduer
})