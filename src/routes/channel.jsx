import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hls from 'hls.js';
import styles from './channel.module.css';

const proxyURL = 'https://worker-young-limit-0dd1.junsang-yu3.workers.dev/proxy?proxyUrl=';

const liveDetailURL = (channelID) => proxyURL + `https://api.chzzk.naver.com/service/v2/channels/${channelID}/live-detail`;
const getLiveDetail = (channelID) => fetch(liveDetailURL(channelID)).then(res => res.json());
const getLiveID = (liveDetail) => {
  const livePlayback = JSON.parse(liveDetail.content.livePlaybackJson);
  const liveID = livePlayback.meta.liveId;
  return liveID;
}

const timeMachineURL = (liveID) => proxyURL + `https://api.chzzk.naver.com/service/v1/live/${liveID}/playback/time-machine`;
const getTimeMachine = (liveID) => fetch(timeMachineURL(liveID)).then(res => res.json());
const getPlayListURL = (timeMachine) => timeMachine.content.playback.media.find(m => m.mediaId === 'HLS').path;

function Channel() {
  return (
    <div className={styles.container}>
      <Link to="/">
        <h1 className={styles.title}>치지직 실시간 다시보기 서비스입니다</h1>
      </Link>

      <ChannelVideo />

      <ChannelClips />

      <div className={styles.footer}>
        Coded by <a href="https://github.com/stupidJoon" target="_blank">StupidJoon</a>
      </div>
    </div>
  )
}

function ChannelVideo() {
  const { channelID } = useParams();
  const videoRef = useRef();
  
  useEffect(() => {
    if (channelID === undefined) return;
    (async () => {
      const liveDetail = await getLiveDetail(channelID);
      const liveID = getLiveID(liveDetail);
      const timeMachine = await getTimeMachine(liveID);
      const source = getPlayListURL(timeMachine);
      
      const hls = new Hls({
        enableWorker: true,
        startLevel: 5,
      });
      hls.loadSource(source);
      hls.attachMedia(videoRef.current);

      videoRef.current.focus();
    })();
  }, [channelID]);

  return (
    <video className={styles.video} ref={videoRef} controls></video>
  );
}

function ChannelClips() {
  const { channelID } = useParams();
  const [clips, setClips] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const json = await fetch(`https://158.180.79.219.sslip.io/clips?channelID=${channelID}`).then(res => res.json());
      setClips(json);
    })();
  }, []);

  return (
    <>
      <h2>채널 클립</h2>
      <div className={styles.clips}>
        {clips.slice((page - 1) * 8, page * 8).map((clip) => {
          return (
            <div key={clip.id} className={styles.clip}>
              <iframe src={`https://chzzk.naver.com/embed/clip/${clip.id}`} frameBorder="0" allow="autoplay; clipboard-write; web-share" allowFullScreen></iframe>
              <h5>{clip.title}</h5>
            </div>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => (page > 1) && setPage(page - 1)}>◀️</button>
        <button>{page}</button>
        <button onClick={() => setPage(page + 1)}>{page + 1}</button>
        <button onClick={() => setPage(page + 2)}>{page + 2}</button>
        <button onClick={() => setPage(page + 3)}>{page + 3}</button>
        <button onClick={() => setPage(page + 4)}>{page + 4}</button>
        <button onClick={() => setPage(page + 1)}>▶️</button>
      </div>
    </>
  )
}

export default Channel;
