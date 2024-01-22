// src/app/item/[id]/SinglePageView.tsx 
// 個別アイテムページに埋め込むViewコンポーネント
"use client";

import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';
import style from "./page.module.css";
import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
import Modal,{ Styles } from 'react-modal';


// 型定義．元々のsingleItemオブジェクトの型定義
type singleItemDataType = {
    message: string,
    singleItem: {
        _id: string,
        title: string,
        image: string,
        description: string,
        email?: string
    }
}
// propsで渡されるsingleItemを型定義
type SinglePageViewProps = {
    singleItem: singleItemDataType;
}


//Modalで指定するスタイル
const responsiveModalStyle: Styles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      maxWidth: '100%',
      maxHeight: '80%',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
};

const SinglePageView = ({ singleItem }:SinglePageViewProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    // modalのメディアクエリがうまくいかないので、430px以下画面の場合はModalを
    // 開かないようにするために、windowWidthを取得するためのuseEffect()
    useEffect(() => {
        // ウィンドウのサイズが変更されたときに実行されるハンドラ
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        // 初回レンダリング時にウィンドウのサイズを取得
        setWindowWidth(window.innerWidth);
        // イベントリスナーを追加
        window.addEventListener('resize', handleResize);
        // コンポーネントのアンマウント時にイベントリスナーを削除
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    
    const handleImageClick = () => {
        // 小さな画面の場合はモーダルを開かない
        if (windowWidth > 430) {
            setIsModalOpen(true);
        }
      };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    const handleModalRequestClose = () => {
    // モーダルが開かれた瞬間に windowWidth の更新が行われ、
    // 再度 useEffect が発火してしまい、
    // その結果一瞬だけモーダルが開いてしまう問題を避けるための追加
    if (windowWidth > 430) {
        handleCloseModal();
    }
    };
    
  return (
    <>
        <Box mb={6} mt={6}>
        <Typography align="center" fontSize={18}>
            <br />
            {singleItem.singleItem.title}
        </Typography>
        </Box>
        <Box sx={{ padding: '2px', margin: '2px' }}>
            {/* カードの画像は1100px,750pxと決め打ち */}
            <Link href="#">
                <Image
                className={style.cardImg}
                src={singleItem.singleItem.image}
                alt=""
                width={1100}
                height={750}
                onClick={handleImageClick}
                />
            </Link>
        </Box>

        <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalRequestClose}
        // className={styles.modalCSS}
        // overlayClassName={styles.overlayCSS}
        style={responsiveModalStyle}
      >
        <Image
          src={singleItem.singleItem.image}
          alt=""
          width={1100}
          height={750}
        />
        <Button 
            sx={{ alignSelf: 'flex-end', position: 'absolute', top: '10px', right: '10px', zIndex: 1 }} 
            onClick={handleCloseModal}>閉じる
        </Button>
      </Modal>


        
        <br />
        <Box p={1} sx={{color:'dark', fontSize:'16', textAlign: 'left'}}>
            {/* description表示箇所はサニタイズ解除*/}
            <div dangerouslySetInnerHTML={{ __html: singleItem.singleItem.description }} />
        </Box>
        <Box mb={6} mt={6} sx={{backgroundColor:'#eee', paddingLeft:'50px',paddingRight:'50px',paddingBottom:'30px',paddingTop:'10px'}}>
            <Typography align="center">【管理用】</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="success" href={`/item/update/${singleItem.singleItem._id}`}>
                    編集ページ
                </Button>
                <Button variant="contained" color="error" href={`/item/delete/${singleItem.singleItem._id}`}>
                    削除ページ
                </Button>
            </Box>
        </Box>
    </>
  )
}

export default SinglePageView