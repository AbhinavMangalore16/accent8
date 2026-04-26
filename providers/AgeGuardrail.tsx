"use client";

import { createContext, useContext, useEffect, useState } from "react";

type PendingAction = (() => void) | null;

type AgeGateContextType = {
  requestAccess: (action: () => void) => void;
  isAdult: boolean | null;
};

const AgeGateContext = createContext<AgeGateContextType | null>(null);

export function AgeGateProvider({ children }: { children: React.ReactNode }) {
  const [isAdult, setIsAdult] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("isAdult");
    if (stored) setIsAdult(stored === "true");
  }, []);

  const requestAccess = (action: () => void) => {
    if (isAdult === true) {
      action();
      return;
    }

    setPendingAction(() => action);
    setShowModal(true);
  };

  const confirm = (value: boolean) => {
    localStorage.setItem("isAdult", String(value));
    setIsAdult(value);
    setShowModal(false);

    if (value && pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  return (
    <AgeGateContext.Provider value={{ requestAccess, isAdult }}>
      {children}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl p-6 max-w-md w-full text-center shadow-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">
              🔞 Age Restricted
            </h2>
            <p className="text-white/70 mb-6">
              This content may contain explicit/profane audio. Are you 18 or older?
            </p>

            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                onClick={() => confirm(false)}
              >
                No
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                onClick={() => confirm(true)}
              >
                Yes, I’m 18+
              </button>
            </div>
          </div>
        </div>
      )}
    </AgeGateContext.Provider>
  );
}

export function useAgeGate() {
  const ctx = useContext(AgeGateContext);
  if (!ctx) throw new Error("useAgeGate must be used inside AgeGateProvider");
  return ctx;
}