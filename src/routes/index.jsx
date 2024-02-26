import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './index.module.css';

const PROFILE_DEFAULT = 'https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png?type=f120_120_na';

function Index() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    getChannels();
    async function getChannels() {
      const data = await fetch(`https://${import.meta.env.VITE_SERVER_URL}/channels`).then(res => res.json());
      setChannels(data);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Link to="/">
        <h1 className={styles.title}>치지직 실시간 다시보기 서비스입니다.</h1>
      </Link>
      <div className={styles.channels}>
        {channels.map(({ id, name, profile }) =>  {
          return (
          <Link key={id} to={`${id}`}>
            <div className={styles.channel}>
              <img
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                src={profile ?? PROFILE_DEFAULT}
                alt="profile-img"
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
