import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Menu from './Menu';
import View from './View';
import 'bootstrap/dist/css/bootstrap.min.css'




export default function Home() {
  const [hasError, setErrors] = useState('');
  const [apidata, setData] = useState([]);
  const [filteredData, setFilterData] = useState([]);
  const [isLoading, setLoading] = useState(true);


  const fetchFilteredData = (val) => {
  //  console.log('cal at filtere data', val);
    if(val.length > 0)
    {
      setFilterData(val);
    }
  }

  useEffect(() => {
    if (hasError.length !== 0) {
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
          setData(res);
          setFilterData(res);
          setLoading(false);
        })
        .catch(err => setErrors(err));
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (<h4 style={{ textAlign: 'center', margin: '25%' }}>Loading... </h4>)
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
            <Menu details={apidata} filteredData={fetchFilteredData} />
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12">
            <View record={filteredData} />
          </div>
        </div>
        <footer className={styles.footer}>
          Developed By : Mohit Kapoor
        </footer>
      </div>
    )
  }

}

