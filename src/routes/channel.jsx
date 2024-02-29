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

function Channel() {
  const { channelID } = useParams();
  const videoRef = useRef();
  const [hls, setHls] = useState();
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!channelID) return;
    const source = `https://${import.meta.env.VITE_SERVER_URL}/${channelID}`;
    const hls = new Hls({ enableWorker: true });
    hls.loadSource(source);
    hls.attachMedia(videoRef.current);
    setHls(hls);
  }, [channelID]);

  const recordOnclick = () => {
    if (recorder) {
      stopRecording();
      setIsRecording(false);
    }
    else {
      startRecording(hls, channelID);
      setIsRecording(true);
    }
  }

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
