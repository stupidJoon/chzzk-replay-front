import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './index.module.css';

const PROFILE_DEFAULT = 'https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png?type=f120_120_na';

function Index() {
  const [channels, setChannels] = useState([]);
  const [nextPage, setNextPage] = useState();

  useEffect(() => {
    (async () => {
      const proxyURL = 'https://worker-young-limit-0dd1.junsang-yu3.workers.dev/proxy?proxyUrl=';
      const livesURL = 'https://api.chzzk.naver.com/service/v1/lives'
      const data = await fetch(proxyURL + livesURL).then(res => res.json());
      setChannels(data.content.data);
      setNextPage(data.content.page.next);
    })();
  }, []);

  const addChannels = async () => {
    const proxyURL = 'https://worker-young-limit-0dd1.junsang-yu3.workers.dev/proxy?proxyUrl=';
    const livesURL = `https://api.chzzk.naver.com/service/v1/lives?concurrentUserCount=${nextPage.concurrentUserCount}&liveId=${nextPage.liveId}`;
    const data = await fetch(proxyURL + livesURL).then(res => res.json());
    const newChannels = [...channels];
    for (const channel of data.content.data) {
      if (channels.some(ch => ch.liveId === channel.liveId)) continue;
      newChannels.push(channel);
    }

    setChannels(newChannels);
    setNextPage(data.content.page.next);
  };

  return (
    <div className={styles.container}>
      <Link to="/">
        <h1 className={styles.title}>치지직 실시간 다시보기 서비스입니다</h1>
      </Link>
      <div className={styles.channels}>
        {channels.map(({ liveId, channel }) => {
          return (
          <Link key={liveId} to={`${channel.channelId}`}>
            <div className={styles.channel}>
              <img
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                src={channel.channelImageUrl || PROFILE_DEFAULT}
                alt="profile-img"
              />
              <p style={{ textAlign: 'center' }}>{channel.channelName}</p>
            </div>
          </Link>
        )})}
      </div>
      <button onClick={addChannels} className={styles.more}>더보기</button>
      <div className={styles.footer}>
        Coded by <a href="https://github.com/stupidJoon" target="_blank">StupidJoon</a>
      </div>
    </div>
  )
}

export default Index;
