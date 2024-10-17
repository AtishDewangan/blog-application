"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import makeStore from "@/lib/store/store";
import { add } from "@/lib/store/features/comment/comment-slice";
const storeProvider = ({ children }) => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = makeStore(); // Create store
    // storeRef.current.dispatch(add({ id: 1, comment: "test" }));
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};
export default storeProvider;
