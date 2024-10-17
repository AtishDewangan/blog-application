"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    redirect("/blogs");
  });

  return null;
}

//store =>globalized state
//action =>encrement
//reducer =>reducer
//dispatch =>store
