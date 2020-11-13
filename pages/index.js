import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from '../styles/Home.module.css';
import Menu from './Menu';
import View from './View';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from '../redux/reducer/index';

const store = createStore(reducer);

function LandingPage() {
  const [hasError, setErrors] = useState('');
  const [apidata, setData] = useState([]);
  const [years, setYear] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    let theSet = new Set();
    apidata.forEach((val) => theSet.add(val.launch_year));
    setYear([...theSet]);
  }, [apidata]);

  useEffect(() => {
    if(hasError.length!==0)
    {
      alert('Error while fetching data');
    }
  }, [hasError]);


  useEffect(() => {
    setLoading(true);
    const url = 'https://api.spaceXdata.com/v3/launches?limit=100';
    async function fetchData() {
      const res = await fetch(url);
      res.json()
        .then(res => {
          console.log('res', res);
          setData(res);
          setLoading(false);
          dispatch({ type: "API_DATA", payload: res });
          dispatch({ type: "FILTERED_DATA", payload: res });
        })
        .catch(err => setErrors(err));
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (<h4 style={{ textAlign: 'center',margin:'25%' }}>Loading... </h4>)
  }
  else {
    return (
      <div className={styles.main}>
        <h4 className="col-12">
        <b>  SpaceX Launch Programs</b>
        </h4>
        <hr />
        <div className="row" style={{ width: '97%', margin: '0 auto' }}>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <Menu years={years} />
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12">
            <View />
          </div>
        </div>
        <footer className={styles.footer}>
          Developed By : Mohit Kapoor
        </footer>
      </div>
    )
  }

}

export default function Home() {
  return (<Provider store={store}>
    <LandingPage />
  </Provider>)
}