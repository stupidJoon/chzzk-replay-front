import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './index.module.css';

function Index() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    getChannels();
    async function getChannels() {
      const data = await fetch('https://54.238.165.178.sslip.io/channels').then(res => res.json());
      setChannels(data);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Link to="/">
        <h1>치지직 실시간 다시보기 서비스입니다.</h1>
      </Link>
      <div className={styles.channels}>
        {channels.map(({ id, name, profile }) =>  {
          return (
          <Link key={id} to={`${id}`}>
            <div className={styles.channel}>
              <img
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                src={profile}
                alt="profile-img"
                width="100px"
                height="100px"
              />
              <p style={{ textAlign: 'center' }}>{name}</p>
            </div>
          </Link>
        )})}
      </div>
      <div className={styles.footer}>
        Coded by <a href="https://github.com/stupidJoon" target="_blank">StupidJoon</a></div>
    </div>
  )
}

export default Index;
