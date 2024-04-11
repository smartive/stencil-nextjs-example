'use client';

import React, { FC, Fragment, PropsWithChildren, ReactNode, useEffect, useState } from 'react';

export const WithSSR: FC<PropsWithChildren<{ fallback: ReactNode }>> = ({ fallback, children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return React.createElement(Fragment, null, isClient ? children : fallback);
};
