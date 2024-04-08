import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { Box, Grid } from "@mui/material";
import Dashboard from "./components/Dashboard";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    
  router.push("/dashboard")

  }, [])
  
  return (
    <>
      <Box>
        <Dashboard />
  
      </Box>
    </>
  );
}
