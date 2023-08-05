import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface TabContextValue {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  handlePageClick: (tab: number, path: string) => void;
}

const defaultContextValue: TabContextValue = {
  activeTab: 0,
  setActiveTab: () => {},
  handlePageClick: () => {},
};

const TabContext = createContext<TabContextValue>(defaultContextValue);

export function TabProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    // Try to read the activeTab state from session storage
    const savedActiveTab = sessionStorage.getItem("activeTab");
    return savedActiveTab !== null ? Number(savedActiveTab) : 0;
  });

  // ensures correct tab is highlighted on page refresh
  useEffect(() => {
    // Whenever activeTab changes, save it to session storage
    sessionStorage.setItem("activeTab", String(activeTab));
  }, [activeTab]);

  const handlePageClick = useCallback(
    (tab: number, path: string) => {
      setActiveTab(tab);
      navigate(path);
    },
    [navigate]
  );

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, handlePageClick }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabs() {
  return useContext(TabContext);
}
