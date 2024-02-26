import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hls from 'hls.js';
import styles from './channel.module.css';

function Channel() {
  const videoRef = useRef();
  const { channelID } = useParams();

  useEffect(() => {
    if (!channelID) return;

    const source = `https://${import.meta.env.VITE_SERVER_URL}/${channelID}`;
    const hls = new Hls({ enableWorker: true });
    hls.loadSource(source);
    hls.attachMedia(videoRef.current);
  }, [channelID]);

  return (
    <div>
      <Link to="/">
        <h1 className={styles.title}>치지직 실시간 다시보기 서비스입니다.</h1>
      </Link>
      <video style={{ width: 'min(100%, 1440px)' }} ref={videoRef} controls></video>
    </div>
  )
}

export default Channel;
