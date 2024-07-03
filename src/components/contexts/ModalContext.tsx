/*
MenuTypes for different modals that can be open
Only 1 state-type, the only opened modal, empty string/null is false
Provider returns active state and set state function
All modals open state = activeModal = favorites / instructions
*/

import { createContext, ReactNode, useContext, useState } from 'react';

interface Props {
  children: ReactNode;
}

type ModalTypes = '' | 'favorites' | 'instructions' | 'menu';

interface ModalContextType {
  activeModal: string;
  setActiveModal: (type: ModalTypes) => void;
}

export const ModalContext = createContext<ModalContextType>({
  activeModal: '',
  setActiveModal: () => {},
});

const ModalProvider = ({ children }: Props) => {
  const [activeModal, setActiveModal] = useState<ModalTypes>('');

  return (
    <ModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useActiveModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useActiveModal must be used within a ModalProver');
  }
  return context;
};

export default ModalProvider;
