import { isResSent } from 'next/dist/next-server/lib/utils';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from '../styles/View.module.css';

function View(props) {
  const rocketData = useSelector(state => state.filterData);
  const [details, setDetails] = useState([]);
  const [isLoading, setLoading] = useState(true);



  let setData = (year) => {
    return new Promise((resolve, reject) => {
      const info = details.filter((x) => x.launch_year === year);
      resolve(info);
    })
  }

  useEffect(() => {
    setLoading(true);
    setDetails(rocketData);
    setLoading(false);
  }, [rocketData]);

  if (isLoading && details.length < 1) {
    return (<h4 style={{ padding: '30%' }}> Loading..</h4>)

  }
  else {
    return (
      <div className="row">
        {
          details && details.length > 0 &&
          details.map((data, i) => {
            return (<div key={i} style={{ marginBottom: '1%', padding: '2%', boxShadow: "1px 2px 3px solid" }}
              className={` ${styles.cards} col-md-3 col-lg-3 col-sm-12`}>
              <div style={{background:'#ffffff',padding: '4%'}}>
                <div style={{ textAlign: 'center' }}>
                  <img className={styles.imageStyles} src={data.links.mission_patch_small} alt='Image' />
                </div>
                <p className="text-primary">{data.rocket.rocket_name}</p>
                <br />
                <h6>Mission Id(s)</h6>
                <ul>
                  {
                    data.mission_id && data.mission_id.length > 0 &&
                    data.mission_id.map((x, index) => <li key={index}>{x}</li>)
                  }
                </ul>
                <h6><b>Launch Year:</b> {data.launch_year}</h6>
                <h6><b>Successfull Launch:</b>  {data.launch_success.toString()}</h6>
                <h6><b>Flight Number:</b> {data.flight_number} </h6>
              </div>

            </div>)
          })
        }
      </div>
    );
  }

}

export default View;
