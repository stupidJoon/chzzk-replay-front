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

  //23
  'a6c4ddb09cdb160478996007bff35296': { name: '알아하쇼 타비', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAyMDJfOTEg/MDAxNzA2ODU4NDQ1Mjcz.0d4_1_jWl96L1nbucKWjfBsFESVMc8c7N8iT9W0N16Ug.nfW7-r6KTLAJOaRyOa9SiJ9spxY656qauPeZHCfckMog.PNG/1231451515.png?type=f120_120_na' },
  '2086f44c7b09a17cef6786f21389db3b': { name: '지누', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfNTgg/MDAxNzAyOTk1OTUwOTYw.L2x45gGl5EWXkViGr04MDaZ04EQvUIc3TvTr_zW8irYg.F4Wi08nW5i8fjB4R9cqaCeaGiiBXt8E2ZccqhZBb71kg.JPEG/profile13.jpg?type=f120_120_na' },
  '5d53f8fa5bef9b1bd4dc884f9907c079': { name: '명훈명훈', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMjBfMjkx/MDAxNzAzMDYwODYyOTE5.bu_SXt56kPeAHr3tE1EYt6JoHn4zrO7xk05eJQWJQ7cg.T32pbYxJ2f9-5GLGfsjUnjiTgkhhf-KmqvGZOmnE7Hwg.PNG/%EC%BA%A1%EC%B2%98%EC%BA%A1%EC%B2%98.PNG?type=f120_120_na' },
  '219d8e65810a77d6e42c7df018d9632b': { name: '마뫄', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfNDAg/MDAxNzAyOTY0OTM5Nzgz.Rh9xnEtByJ7kkjJxkvbwq-PFpy5L6bOoQBmpKLmDKfIg.KvRYR2vMCaWOwG2Wp7sVHW62BipduF93Y_EvddmIa1Ig.JPEG/unnamed.jpg?type=f120_120_na' },
  'b044e3a3b9259246bc92e863e7d3f3b8': { name: '시라유키 히나ㅋㅋ', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAyMDJfMjQ2/MDAxNzA2ODU4MzEyOTQ3.JP7Ip--UhZa7TeWw2VxkOdhfI_aCb6Fp5K2ULyMMeygg.hKlKY5BdmhsRyBwKMAWy9SCV_5dYkb7X4GPSE_V0j0Ag.JPEG/%ED%9E%88%EB%82%98%ED%9E%88%EB%82%98dd%EB%8B%88%ED%95%98.jpg?type=f120_120_na' },
  '80b36a0ae8e887e893ce0014dbfece4a': { name: '나나양', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMjU2/MDAxNzAyOTU0NjI3Nzc2.KRr9DOgrkexb3_ZkXbBRVxeTSUoZlW4M0DGUxH4aSxUg.LvLOVtEF40gDdm0B-uI9yB72KRhVQVPaKZYGZIM60Kgg.PNG/%EB%BF%8C%EC%9A%B0.png?type=f120_120_na' },
  '4b2f27574a2e60d15bd53f94cbfc4066': { name: '코렛트1', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTA3/MDAxNzAyOTU4NTc2Nzk3.qVIwDf_v-PcR5fIhdqftltltXmyuCHZdOW9SwjZPBhsg.sGGHdME6yWm_sXMtmcnd6YObCnzlaqjVCCOKfb3OqJYg.PNG/6_1.png?type=f120_120_na' },
  'f39c3d74e33a81ab3080356b91bb8de5': { name: '포셔Portia', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTQg/MDAxNzAyOTk0MDY3MDk4.AYCG30jnoir18ozbTkq9465vMk6hTGAJphCJrz9Qo2sg.0TTspJJqQV5hJEutSeNt6vdX3Mc0XcFzpYFY8NNWkp4g.PNG/KakaoTalk_20231219_183937840.png?type=f120_120_na' },
  'dec8d19f0bc4be90a4e8b5d57df9c071': { name: '얍얍yapyap', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMjFfMjYy/MDAxNzAzMTE0MjY0MzEw.4HN2-Prah0mvcdg91VweUfHaVWReJvn4GfnNLoXild4g.uMLiWaqHAhnsVnUozRdWca8fNhNsPlDK1q0bbyIxDeQg.PNG/dbb514f1-469b-479e-b5ba-3ac0f09a2776-profile_image-300x300.png?type=f120_120_na' },
  '8803cee946a9e610a76fbdee98d98c61': { name: '룩삼오피션', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMjFfMiAg/MDAxNzAzMTM1OTI3MjE0.btywvKre6LPS3bCiCA9HVYfZB5VBbtLEkwn76tAN_7cg.L6Fc8ILCjRdr88LNM0xiNlYDTXoCpxhiwvenb-BSNLgg.JPEG/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.jpg?type=f120_120_na' },
  '4325b1d5bbc321fad3042306646e2e50': { name: '아카네 리제ㅠㅅㅠ', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAyMTVfMTAx/MDAxNzA3OTY2MDY5ODk4.tfk_l56We9m9MNjpGLIqEUKu9_U1nIGuKq9oQlXwC3Ig.r2Bg6xkarWVPF1RJvL3UsngzlXzyz6erDxxmhpwD1Log.PNG/%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B88001.png?type=f120_120_na' },
  '22bd842599735ae19e454983280f611e': { name: 'ENCHANT', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTVfMjYy/MDAxNzAyNjIwMzQ5NjE1.tVl6ew-9iBd3Z3fEG8iRmzCFbUpf3qKj_o1BSXWB73og.kqiVM7bjKl40zr9m52PqMdO6cZB6mIXYA7PRIM388mcg.JPEG/Symbol.jpg?type=f120_120_na' },
  '0974bf2ded8c3e124797f7be6d1bdbb5': { name: '감블러', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTk0/MDAxNzAyOTU5NTUzNzYx.HI2Ow6d8GfIKBBaGMNYXrd09WSvkNyQS6Ayaikxsdlsg.WS5q6-wqM6V5GhVFSC_VYhM3Z4myzOSObNzn0GHMKZcg.PNG/%EA%B0%90%EB%B8%94%EB%9F%AC%EB%8B%98_%EB%82%B4%EB%A7%9E%EB%B0%B8.png?type=f120_120_na' },
  '089185efc29a8fbe14ea294dc85f9661': { name: '소풍왔니 sopoong', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMjE0/MDAxNzAyOTY2ODg2ODEy.ozHKWGbDqCCHRk3DcFY10DNJGE-v_3l-GZrqw_PKYAIg.TmuPla4PHD9B7usVf-oJPYN71QfErkOqsfdYbrGxQrog.JPEG/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.jpg?type=f120_120_na' },
  '19e3b97ca1bca954d1ac84cf6862e0dc': { name: '러너', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTg2/MDAxNzAyOTcyNTE1NjIy.gQxlCw96YLc3_bOGPNhD6a4zlz4qzn7gc5VV6BNpJP0g._AVnxdEW9y3Ma-z0ClAGDD8wxg3GL1qNOFGv5j7GdmYg.JPEG/ru_%281%29.jpg?type=f120_120_na' },
  'dcd75ef0f2c664e3270de18696ad43bf': { name: '쌍베 SsangBe', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTk1/MDAxNzAyOTYyODMwMjk5.4ZFVeyiMnFZN1LxYfLmyua402NJGJ-nPtwL7TKyrcBgg.7TpsVurMp20Fs6XHlRMUQf-JqmIu0PyNp2MolURABwQg.PNG/KakaoTalk_20231219_140925744.png?type=f120_120_na' },
  '42597020c1a79fb151bd9b9beaa9779b': { name: '파카', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAyMTRfNDMg/MDAxNzA3OTA5MTQ5NDU4.G5K-PKWURUPk7PC42iPSXn6YSOBF2I2PAW1Smzt0Wk4g.nwSoSF4VAZshbbuf2ksHk68NA5dZTqhFequVgvGWEHgg.JPEG/333333.jpg?type=f120_120_na' },
  '4515b179f86b67b4981e16190817c580': { name: '진짜 네네코 마시로', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAyMDJfMjY4/MDAxNzA2ODU5MTE0NjAz.2FfgPh_RmP1DbzPYIVAxkUy2gyiYPHRlvLRHiztPMeAg.4nwqZY5cTZ-QVhdJEnNIAJJiimK6eYc4r7yJNnPASFsg.PNG/6_%EC%86%8C%EC%8A%A41.png?type=f120_120_na' },
  'c68b8ef525fb3d2fa146344d84991753': { name: '진짜도현', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTc2/MDAxNzAyOTU2MDIyMDcy.cs4reRZIaW8vmdQvxI0p1FYgKyq6j8sFEORtFD5EJSQg.82cGdftwe4Y9-CIyMswa4P6dTZh3B4q9jr-B6B0Lj3kg.JPEG/IMG_3536.jpg?type=f120_120_na' },
  '8a59b34b46271960c1bf172bb0fac758': { name: '앰비션', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMThfODUg/MDAxNzAyODkwOTExNjcx.eNZNw7jE2uVB9ONNgYbpeCICvQSLOKQoNkXXiN3PbSMg.crVP8eb-RB4UvCjfFxXWYVUrhnj6X_LBnbiabbhwo8gg.PNG/%EC%A0%9C%EB%AA%A9_%EC%97%86%EC%9D%8C-3.png?type=f120_120_na' },
  'e112cad680f895d13769c43f56171b4a': { name: '아구 이뽀', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTI2/MDAxNzAyOTYwMDM3MDky.ezZG21epLypBugWGsVvGe0aho1ZcROtrF8N1AVogwfUg.7kIgNGVT5pH95Babbx7x4ONEV43PlfrlRmzLtrCWNvsg.PNG/%EB%85%BC%EB%85%BC%EB%8B%98%ED%94%84%EB%A1%9C%ED%95%84%EB%85%B8%EB%B0%B0%EA%B2%BD.png?type=f120_120_na' },
  '17aa057a8248b53affe30512a91481f5': { name: '김도 KimDoe', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMDdfMjA5/MDAxNzAxODc1Mzk0Njgz.4jdg2LkiZM_r-GCnzaLv89BkTh-sWLdYjuYcf_t3IP4g.KhoU7pv7Vk5K4QPKX361Cv7VblSE4LXV5NwjgWETEGkg.PNG/%ED%94%84%EC%82%AC.png?type=f120_120_na' },
  '1aeb0ca60649660a2e534592ce480f34': { name: '진짜양띵', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAxMjBfMjQ5/MDAxNzA1NzM0MTcwNjIy.zAtW4G0NeaCL9rUx1epXqp_0ilbmJL6Tw8PA3Z032YYg.S1g5UC4nEzxXXELyAkR8CxAZlXxx9dv6q7-LNg5xa1Ug.PNG/6020327d-1cd3-4afb-aefd-62cfbb6f9695-profile_image-300x300.png?type=f120_120_na' },
  // 47
  'c100f81959d1c17044be0541eed56f5b': { name: '피닉스박1', profileIMG: 'https://nng-phinf.pstatic.net/MjAyNDAyMDNfMTE3/MDAxNzA2OTUxMjkzMjQ4.3B2KxxTyEpzfCKZTKouycd8ZwRn7CmZG8d8TFz9HZhwg.DWNZZLS2JZD5WYVnHijsBForfURuBsaEkqWzLzyLSzog.PNG/123.png?type=f120_120_na' },
  'b5da9cbcab300065236b4309ecaf19b7': { name: '스나랑 Snarang', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMjBfMTA0/MDAxNzAzMDE3NjA2Mzgy.NtzeThu7J0eChZAgU2VwPFS4oxWj467Wyj1FjRJX6yYg.pVBlEC1s03BGzAZnEqwgVcG8581kPBARwNH6oSufZM4g.PNG/0E9B22C1-6EFB-4C38-A77A-CC5938A5E0E0-1703017606.png?type=f120_120_na' },
  '8b3e8e3a13201cff0836c69cfab62f45': { name: 'Flame 플레임', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMjBfODMg/MDAxNzAzMDU2MDE2MDU3.vfDZPNp8d4Lv191HrM6CPV6HRGCqthiKusM21rXQQSIg.HKzaJikdhNVqDTWIHGL7pCVSfZq80FuuCEqXx17VHMgg.PNG/i8271963014.png?type=f120_120_na' },
  'fe558c6d1b8ef3206ac0bc0419f3f564': { name: '플러리', profileIMG: 'https://nng-phinf.pstatic.net/MjAyMzEyMTlfMzAw/MDAxNzAyOTU2NDM5Mzkz.q8T_eeojL1oj7cpYX_fW4gcW8Ia9oUM1ece5us4HbSQg.WnlG0KJeueRu8WX8yD-BPNj7YRqQhL4zNozCzYzOIsYg.JPEG/KakaoTalk_20231219_122543055_02.jpg?type=f120_120_na' },



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
      <Link to="/">
        <h1>치지직 실시간 다시보기 서비스입니다.</h1>
      </Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {channels.map(({ channel_id }) =>  {
          return (
          <Link key={channel_id} to={`${channel_id}`}>
            <div>
              <img
                style={{ width: '5rem', borderRadius: '50%' }}
                src={CHANNEL_DATA[channel_id]?.profileIMG}
                alt="profile-img" />
              <p style={{ textAlign: 'center' }}>{CHANNEL_DATA[channel_id]?.name ?? 'undefined'}</p>
            </div>
          </Link>
        )})}
      </div>
    </div>
  )
}

export default Index;
