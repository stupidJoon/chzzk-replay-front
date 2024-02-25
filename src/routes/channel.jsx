import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hls from 'hls.js';

function Channel() {
  const videoRef = useRef();
  const { channelID } = useParams();

  useEffect(() => {
    if (!channelID) return;

    const source = `https://54.238.165.178.sslip.io/${channelID}`;
    // const source = `https://158.180.79.219.sslip.io/${channelID}`;
    const hls = new Hls({ enableWorker: true });
    hls.loadSource(source);
    hls.attachMedia(videoRef.current);
  }, [channelID]);

  return (
    <div>
      <style>{`a { color: inherit; text-decoration: inherit;}`}</style>
      <Link to="/">
        <h1>치지직 실시간 다시보기 서비스입니다.</h1>
      </Link>
      <video style={{ width: 'min(100%, 1440px)' }} ref={videoRef} controls></video>
    </div>
  )
}

export default Channel;
