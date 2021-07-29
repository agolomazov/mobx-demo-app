import { createContext } from 'react';
import RootStore from '../root-store';

export const StoreContext = createContext<RootStore>({} as RootStore);
StoreContext.displayName = 'StoreContext';

export const StoreProvider = StoreContext.Provider; 