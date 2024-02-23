import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const CHANNEL_DATA = {
  '75cbf189b3bb8f9f687d2aca0d0a382b': { name: '한동숙입니다', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTVfMTgx/MDAxNzAyNjAxMjEyMTYw.Hw6vs76aI0L1zeu4fziwXDE35gidFriwTSgAjq7KWxUg.0V3KaKvctGKcVYa76UiDVTXMjXeUSuUezHX6nGU4y9kg.PNG/123.png?type=f120_120_na' },
  'bb382c2c0cc9fa7c86ab3b037fb5799c': { name: '침착맨', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTU0/MDAxNzAyOTU0NDE3NDcy.ykWtgPCYsJ6bR0iGi-mDG8g4jKBPvD17onQV2StICPsg.crHkYsEsJBBCOlWj8Afiwg-FImH5hMtAk5CWMp9dZ4Eg.PNG/%EC%B9%A8%EC%B0%A9%EB%A7%A8-%ED%94%84%EB%A1%9C%ED%95%84-2023.png?type=f120_120_na' },
  'a7e175625fdea5a7d98428302b7aa57f': { name: '찐짜탬탬버린', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfNzEg/MDAxNzAyOTYzMjYyNzg0.p5NGvJ8O95i4qr34yZkV7ERB3ILAufDv-_5gCUmGgyAg.rHSlJvL9dDHVkuFLZcR46qtPa1QCEqDDelVJ60sLe1cg.PNG/ed86de06d353e32b.png?type=f120_120_na' },
  '7ce8032370ac5121dcabce7bad375ced': { name: '풍월량풍월량', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMjBfNzgg/MDAxNzAyOTk5MDU4NTQ1.q74UANafs4egu_GflqIXrKZvqweabjdsqb3q7F-vEPEg.0DlZf3Myopu6ITUmTkOYLU-GKcBLotgKn61A0o9ZAN4g.PNG/7d354ef2-b2a8-4276-8c12-5be7f6301ae0-profile_image-600x600.png?type=f120_120_na' },
  '0b33823ac81de48d5b78a38cdbc0ab94': { name: '울프 Wolf', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMjBfNDkg/MDAxNzAzMDU1NjA1MTY2.bCUbi8bRvnKsF6Gmw_EIPrll1fPYTkJzTDo243vchEEg.JIYN6Ve8RVWFNqjdiwrEImVAAK4s-bNrJRRGA0ikM8sg.JPEG/%EA%B7%B8%EC%9C%BD.jpg?type=f120_120_na' },
  'c7ded8ea6b0605d3c78e18650d2df83b': { name: '괴물쥐', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAxMjlfMzkg/MDAxNzA2NTMxMzQ1Nzkx.4gWW7mvPJ4VPeQ-2lKiJ0oP9aGdUWzlU3QhPaGDg6nQg.5QXsCUrhprxH3gEIhP5lRVqb24K6CKkt91t41dbiq1Ug.JPEG/%EA%B4%B4%EB%AC%BC%EC%A5%90.jpg?type=f120_120_na' },
  'bdc57cc4217173f0e89f63fba2f1c6e5': { name: '핫다주', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAxMDFfNDIg/MDAxNzA0MDc3OTAxNTEw.BFkbuXeeAI7VHdH4iWFNwhRO8J9gnSqlLQczMUPWU-4g.kUOuvYabUvpL347-O5mofCGz3h58DrvCNgHWky1mGmcg.PNG/e19ac520d13f081f-profile_image-300x300.png?type=f120_120_na' },
  '3497a9a7221cc3ee5d3f95991d9f95e9': { name: '랄로10', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAyMTVfMTg5/MDAxNzA4MDAxOTkzNTM3.eFfaNqILr5WMC1imgLS-sUG85KB8dQpRGE7RuxRU8Jkg.TQ1EdEPnPVS256zEqmpPg-0IAcVBCP62gn0uiUMDu2sg.PNG/%ED%94%84%EC%82%AC_%EC%B4%88%EB%A1%9D.png?type=f120_120_na' },
  '1c231568d0b13de5703b3f6a5e86dc47': { name: '삼식123', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMjBfMTgy/MDAxNzAzMDI4MjQ1MjQ5.4I1ZqbduWoekk9hYGsEhC8Yh_WRN0UnpIZtd0Gy1cuYg.jYhht3ba43wFjKCfRX1uGONkRHZHDZP9KyzOa-aRrAUg.JPEG/%EC%82%BC%EC%8B%9D_%ED%8A%B8%EC%9C%84%EC%B9%98.jpg?type=f120_120_na' },
  '4d0b7d3f825ea982b95f0a5c2b4782d3': { name: '릴카 Lilka', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfNzkg/MDAxNzAyOTU0MTY4MDM4.2EH-ix9ISRu6b9NHV4NX-ZbLR_IWtnSx05rra91S9g8g.LQl6er9Fy9_Axi0B8vdVYXoEYfl_i-eY7OwoPlDmcl0g.PNG/%ED%94%84%EB%A1%9C%ED%95%84_%EC%82%AC%EC%A7%84%28%EC%A0%95%EB%B0%A9%ED%98%95%29.png?type=f120_120_na' },
  '6e06f5e1907f17eff543abd06cb62891': { name: '녹두로로', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTc2/MDAxNzAyOTc3NjA0NTc4.Vd9lD67bKMJbZS8aBvyX8KjDqKLCR9zCuhxGilqhSEQg.Pdsam1-hUc0QiCEjOmOm6-bbwHeLXBQ2W_udwZOzyskg.PNG/2.png?type=f120_120_na' },
  '0d027498b18371674fac3ed17247e6b8': { name: '옥냥이 RoofTopCAT', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAxMDVfMjA5/MDAxNzA0NDEyMzgxNzI1.aHeJKH7FXSP3rkqnyOWx5lbgdoXG5HEuKaItBJjlwccg.jWqm6lPH-P0yMWL4IHEV1qs_ZiGl-ExJEkjDFLSiwo8g.JPEG/%EB%B0%A9%EC%86%A1_%ED%94%84%EB%A1%9C%ED%95%84.jpg?type=f120_120_na' },
  'b5ed5db484d04faf4d150aedd362f34b': { name: '강지12', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMjJfMjEg/MDAxNzAzMjQ5MTU5MTQ3.vo-UOgYCEjq5Nhic_JhvlwXjpRzs7Gf40JcZ0O5mTTEg.x3HUcyrOn8lni2XhjyLIVZ59SDdgUTBPTyR8I_jeZ4Qg.PNG/601.png?type=f120_120_na' },
  '45e71a76e949e16a34764deb962f9d9f': { name: '아야츠노 유니본인', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAyMDdfMTkw/MDAxNzA3MzE0NzkyMzMx.s-_Q--LS107xo8g01yNj99EYbHIu4N8npYPM-HS45hQg.V2yuxTRUrNemxGu7Z-np1YhwyPWzuMqvNXZ1cyQDhyQg.PNG/%EC%9C%A0%EB%8B%883.png?type=f120_120_na' },
  '458f6ec20b034f49e0fc6d03921646d2': { name: '서새봄냥 SEBOM', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMThfMTU0/MDAxNzAyODY5MDk1NTY1.oTT5XMYykEunzMRCJToJl5Fl7DUzs4QEGvjshF2E87cg.OJrKteepM6J4JyAkcNvGSG4b2bSO9h9BRu9uc07Oteog.JPEG/1702869083892.jpg?type=f120_120_na' },
  'aed9d6557bebfb21ab3d081b862cdd2d': { name: '이춘향이오', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMjJfMjg0/MDAxNzAzMjQyNTE3MDk5.CuBTzC4M3BeLP9NYEY-p1rYTxW3qfyhTL_zNHI6qaUYg.ohdthdl_5mMiiLo29KGJ_rimQSVm1DNO8Z2dhuhtyugg.PNG/4CBB95E5-2793-46B3-A7D1-F2DD167452CA.png?type=f120_120_na' },
  '2eee29ce69664154d8bc478825941259': { name: '김뚜띠2', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTQ2/MDAxNzAyOTU5NDM1MDc1.rp9Q9Tgp22QoKjFrpryu25ZxDlTkpGTpGgSMtICAQoMg.64wDZKfz7XA1PWs0oy1rQyVv4P6gqm-E8LV0mGfEtygg.PNG/%EA%B5%BF.png?type=f120_120_na' },
  '0dad8baf12a436f722faa8e5001c5011': { name: '따효니 DDaHyoNi', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAxMTRfMTUy/MDAxNzA1MTY2NzAxMDM0.jxRoo4V4TdOptYggL80STQpPI-gHlzL43jzAaStOnsAg.3xenvZbIgK6vdP82zXdEG3w5X0rrKphOGY0HhTlM_58g.PNG/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2024-01-14_022438.png?type=f120_120_na' },
  '17f0cfcba4ff608de5eabb5110d134d0': { name: '김뿡 bbonge', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMzcg/MDAxNzAyOTY4NjcwMjQ0.5fcfhD3T5AK6edg7cKG8JHE9-aCPAOMEhuwXnWDg7pMg.zQb1rOPvTtPWo4IEWuVt2Gye5GxWwdFVrRfd2iRGvAgg.PNG/%EC%97%86%EB%8A%94%EA%B1%B8%EB%A1%9C%EC%81%AD.png?type=f120_120_na' },
  'f722959d1b8e651bd56209b343932c01': { name: '아이리 칸나에요', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAyMDRfMjUz/MDAxNzA3MDM1NzIyOTU1.MC7JHnCLGswHKXZsuKVE0qSSGh9NPhNMqgxhbj3tfWsg.xPxkEk46C0CAxs9NGyuWsuCK8j3fHsPtVumOHQyRKqcg.PNG/33333333.png?type=f120_120_na' },

  '0974bf2ded8c3e124797f7be6d1bdbb5': { name: '감블러', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTk0/MDAxNzAyOTU5NTUzNzYx.HI2Ow6d8GfIKBBaGMNYXrd09WSvkNyQS6Ayaikxsdlsg.WS5q6-wqM6V5GhVFSC_VYhM3Z4myzOSObNzn0GHMKZcg.PNG/%EA%B0%90%EB%B8%94%EB%9F%AC%EB%8B%98_%EB%82%B4%EB%A7%9E%EB%B0%B8.png?type=f120_120_na' },
};

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
      <h1>치지직 실시간 다시보기 서비스입니다.</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {channels.map(({ channel_id }) => (
          <Link key={channel_id} to={`${channel_id}`}>
            <div>
              <img
                style={{ width: '5rem', borderRadius: '50%' }}
                src={CHANNEL_DATA[channel_id]?.profileIMG}
                alt="profile-img" />
              <p style={{ textAlign: 'center' }}>{CHANNEL_DATA[channel_id]?.name ?? 'undefined'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Index;
