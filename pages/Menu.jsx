import { useSelector, useDispatch } from "react-redux";
import styles from '../styles/Menu.module.css';
import React, { useState, useEffect } from 'react';


function Menu(props) {
  let years = props.years;
  const [selectedYear, setYear] = useState('');
  const [launchSuccess, setLaunchSuccess] = useState('');
  const [isEven, setEven] = useState('');
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const details = useSelector(state => state.data);
  const launchFilter = useSelector(state => state.isLaunchSuccess);

  const yearChanged = (year) => {
    setYear(year.toString());
    setEven('');
    setLaunchSuccess('');
    const info = details.filter((x) => x.launch_year === year);
    dispatch({ type: "FILTERED_DATA", payload: info });
  }

  const setSuccessLanding = (val) => {
    setLaunchSuccess(val);
    setYear('');
    setEven('');
    const info = details.filter((x) => {
      return (x.launch_success === val)
    });
    dispatch({ type: "FILTERED_DATA", payload: info });
  }

  const filterEven = (val) => {
    setLaunchSuccess('');
    setYear('');
    setEven(val);
    if (val) {
      const info = details.filter((x) => {
        return (x.flight_number % 2 === 0)
      });
      dispatch({ type: "FILTERED_DATA", payload: info });
    }
    else {
      const info = details.filter((x) => {
        return (x.flight_number % 2 !== 0)
      });
      dispatch({ type: "FILTERED_DATA", payload: info });
    }
  }

  useEffect(() => {
    setLoading(true);
    const info = details.filter((x) => x.launch_success === launchFilter);
    dispatch({ type: "FILTERED_DATA", payload: info });
    setLoading(false);
  }, [launchFilter]);

  if (isLoading) {
    return (<h4 style={{ textAlign: 'center', margin: '25%' }}>Setting up menu... </h4>)

  }
  else {
    return (
      <div style={{ background: '#fff', padding: '1%' }}>
        <h5>Filters</h5>
        <div>
          <div style={{ textAlign: 'center' }}>Launch Year</div>
          <hr />
          <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }} className="row" >
            {
              years && years.length > 0 &&
              years.map((val, i) =>
                <div key={i} onClick={() => yearChanged(val)}
                  className={`${styles.yearButton} ${selectedYear === val
                    ? styles.yearButtonSelected : styles.yearButtonUnselected} 
                   `}>
                  {val}
                </div>)
            }

          </div>
        </div>
        <br />
        <div className="successLaunch">
          <div style={{ textAlign: 'center' }}>Successful Launch</div>
          <hr />
          <div className="row">
            <div className="col-3"></div>
            <div onClick={() => setSuccessLanding(true)}
              className={`${styles.otherButton} ${launchSuccess === true
                ? styles.yearButtonSelected : styles.yearButtonUnselected}`}
            >
              True
          </div>
            <div onClick={() => setSuccessLanding(false)}
              className={`${styles.otherButton} ${launchSuccess === false
                ? styles.yearButtonSelected : styles.yearButtonUnselected}`}
            >
              False
          </div>
          </div>
        </div>



        <div className="successLaunch">
          <div style={{ textAlign: 'center' }}>Flight Even</div>
          <hr />
          <div className="row">
            <div className="col-3"></div>
            <div onClick={() => filterEven(true)}
              className={`${styles.otherButton} ${isEven === true
                ? styles.yearButtonSelected : styles.yearButtonUnselected}`}
            >
              True
          </div>
            <div onClick={() => filterEven(false)}
              className={`${styles.otherButton} ${isEven === false
                ? styles.yearButtonSelected : styles.yearButtonUnselected}`}
            >
              False
          </div>
          </div>
        </div>


        <br />
      </div>
    );
  }

}

export default Menu;
