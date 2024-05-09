import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hls from 'hls.js';
import styles from './channel.module.css';

function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

function startRecording(hls, channelID) {
  recorder = new MediaRecorder(hls.media.captureStream());
  const chunks = [];

  let type = '';

  recorder.ondataavailable = (event) => {
    type = event.data.type;
    chunks.push(event.data);
  };

  recorder.onstop = (event) => {
    console.log(event);
    const blob = new Blob(chunks, { type });
    downloadBlob(blob, channelID);
  };

  recorder.start();
}

function stopRecording() {
  // recorder에 마지막 1초정도는 누락됨. 임시대첵으로 1초 sleep
  setTimeout(() => {
    recorder.stop();
    recorder = undefined;
  }, 1000);
}
let recorder;

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
  const { channelID } = useParams();
  const videoRef = useRef();
  const [hls, setHls] = useState();
  const [isRecording, setIsRecording] = useState(false);

  const recordOnclick = () => {
    if (recorder) {
      stopRecording();
      setIsRecording(false);
    }
    else {
      startRecording(hls, channelID);
      setIsRecording(true);
    }
  };

  useEffect(() => {
    if (channelID === undefined) return;
    (async () => {
      const liveDetail = await getLiveDetail(channelID);
      const liveID = getLiveID(liveDetail);
      const timeMachine = await getTimeMachine(liveID);
      const source = getPlayListURL(timeMachine);
      
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(source);
      hls.attachMedia(videoRef.current);
      setHls(hls);

      videoRef.current.focus();
    })();
  }, [channelID]);

  return (
    <div className={styles.container}>
      <Link to="/">
        <h1 className={styles.title}>치지직 실시간 다시보기 서비스입니다</h1>
      </Link>

      <video className={styles.video} ref={videoRef} controls></video>

      <button className={styles.record} onClick={recordOnclick}>{isRecording ? '🔴 녹화 종료하기' : '⚪ 녹화 시작하기'}</button>

      <div className={styles.footer}>
        Coded by <a href="https://github.com/stupidJoon" target="_blank">StupidJoon</a>
      </div>
    </div>
  )
}

export default Channel;
