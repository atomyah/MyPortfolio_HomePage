// src/app/hobby/page.tsx
// 趣味ページ

"use client";

import {
    Box,
    Container,
    Grid,
    Typography,
  } from "@mui/material";
  import PianoIcon from '@mui/icons-material/Piano';
  import Header from "../Header";
  import styles from "./page.module.css";

const HobbyPage = () => {

  return (
    <>
    <div className={styles.navContainer}>
      <Header />
    </div>
    <Container maxWidth="sm">
        <Box mb={6} mt={8}>
            <Typography align="center" fontSize={18}>
            趣味
            </Typography>
        </Box>
        <Box mb={3} mt={1}>
            <PianoIcon className={styles.pianoIcon} />
            <p className={styles.pianoText}>ピアノ</p>
        </Box>
        <p>「あの夏へ」～映画「千と千尋の神隠し」より</p>
        <Grid item lg={6} md={6} sm={6} mb={4}>
            <Box sx={{ padding: '2px', margin: '2px' }}>
                <video width="90%" height="auto" controls>
                <source src="/videos/piano01.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Box>
            <Box p={0.5} sx={{ paddingLeft: '40px', paddingRight: '30px', margin: '5px', color:'#577', fontSize:'0.8em', textAlign: 'left'}}>
                ※ 著作権注記
            <br />
                「あの夏へ」 作曲: 久石 譲
            <br />
                この楽曲はスタジオジブリの映画『千と千尋の神隠し』の一部であり、
                関連する著作権はスタジオジブリおよび作曲家の久石譲に帰属します。
            </Box>
        </Grid>
        <p>「Feather Theme（羽のテーマ）」～映画「フォレストガンプ」より</p>
        <Grid item lg={6} md={6} sm={6}>
            <Box sx={{ padding: '2px', margin: '2px' }}>
                <video width="90%" height="auto" controls>
                <source src="/videos/piano02.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Box>
            <Box p={0.5} sx={{ paddingLeft: '40px', paddingRight: '30px', margin: '5px', color:'#577', fontSize:'0.8em', textAlign: 'left'}}>
                ※ 著作権注記
            <br />
                「Feather Theme（羽のテーマ）」 作曲: アラン・シルヴェストリ
            <br />
                この楽曲は映画『フォレストガンプ』の一部であり、
                関連する著作権は監督であったロバート・ゼメキスと脚本家エリック・ロスおよび作曲家アラン・シルヴェストリに帰属します。
            </Box>
        </Grid>
    </Container>
  </>
  )
}

export default HobbyPage