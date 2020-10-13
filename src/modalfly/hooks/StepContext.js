import { createContext } from 'react';

const StepContext = createContext({
    store: {},
    dispatch: () => {}
});
export default StepContext;