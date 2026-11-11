import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserContextType = {
  name: string;
  setName: (name: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  targetBand?: string;
  setTargetBand?: (band: string) => void;
  dailyGoal?: string | null;
  setDailyGoal?: (goal: string | null) => void;
  starter?: string | null;
  setStarter?: (starter: string | null) => void;
  restDays?: string[];
  setRestDays?: (days: string[]) => void;
  resetUserData?: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [name, setNameState] = useState<string>("");
  const [targetBand, setTargetBand] = useState<string>("");
  const [dailyGoal, setDailyGoal] = useState<string | null>(null);
  const [starter, setStarter] = useState<string | null>(null);
  const [restDays, setRestDays] = useState<string[]>([]);

  const setName = (newName: string) => {
    setNameState(newName);
  };

  const resetUserData = () => {
    setNameState("");
    setTargetBand("");
    setDailyGoal(null);
    setStarter(null);
    setRestDays([]);
  };

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        userName: name,
        setUserName: setName,
        targetBand,
        setTargetBand,
        dailyGoal,
        setDailyGoal,
        starter,
        setStarter,
        restDays,
        setRestDays,
        resetUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

