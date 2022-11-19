import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
    const Cmp = props.Cmp

  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  const token = localStorage.getItem("token");
//   console.log("token : ", token);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  
  return (
    <>
        <Cmp />
    </>
  );
}
