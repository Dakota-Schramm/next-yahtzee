import { createContext, useState } from 'react';

export const SoundContext = createContext(false);

export const SoundProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <SoundContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </SoundContext.Provider>
  );
}

