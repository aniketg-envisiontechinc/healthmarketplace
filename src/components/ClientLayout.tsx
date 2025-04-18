"use client";

import { useEffect, useState } from "react";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(true);

  return <>{isReady ? children : <div>Loading...</div>}</>;
};
