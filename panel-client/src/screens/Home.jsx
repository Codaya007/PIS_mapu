import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button/Button";
import { fetchCampus } from "../store/actions/campusActions";

const Home = () => {
  const campus = useSelector((state) => state.campusReducer?.campus);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Bienvenido a Mapu</h2>
      <Button
        onClick={() => {
          dispatch(fetchCampus());
        }}
      >
        Pedir campus
      </Button>
      <h4>Hay {campus?.length} productos</h4>
    </div>
  );
};

export default Home;
