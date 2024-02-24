import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

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
    <div>
      <style>{`a { color: inherit; text-decoration: inherit;}`}</style>
      <Link to="/">
        <h1>치지직 실시간 다시보기 서비스입니다.</h1>
      </Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {channels.map(({ id, name, profile }) =>  {
          return (
          <Link key={id} to={`${id}`}>
            <div>
              <img
                style={{ width: '5rem', borderRadius: '50%' }}
                src={profile}
                alt="profile-img" />
              <p style={{ textAlign: 'center' }}>{name}</p>
            </div>
          </Link>
        )})}
      </div>
    </div>
  )
}

export default Index;
