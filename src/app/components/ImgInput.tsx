import React, {useState} from 'react'
import cloudinary from 'next-cloudinary'
import {
    Box,
    Button,
    Typography,
  } from "@mui/material";
import { MuiFileInput } from 'mui-file-input';

// 型定義
type ImageInputPropsType = {
    setImage: (url: string) => void;
}

const ImgInput = (props:ImageInputPropsType) => {
      // 画像アップロードフォーム<MuiFileInput>で使用する.
    const [imageFile, seImageFile] = useState<File | null>(null);

    const handleChangeFile = (newFile: File | null) => {
        if(newFile){
            seImageFile(newFile);
        }
    };

    const handleClick = async() => {
        try{
            const data = new FormData()

            if(imageFile){
                data.append("file", imageFile)
            }

            const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            
            if(presetName && cloudName){
                data.append("upload_preset", presetName)
                data.append("cloud_name", cloudName)
            }
            const response = await fetch("https://api.cloudinary.com/v1_1/atomyah/image/upload",
            {
                method: "POST",
                body: data,
            })
            const jsonData = await response.json()
            //console.log('〇ImgInput.tsxのjsonDataは',jsonData);
            //console.log('〇ImgInput.tsxのjsonData.urlは',jsonData.url);
            await props.setImage(jsonData.url)
            alert("画像アップロード成功")
        }catch(err){
            alert('画像アップロード失敗')
        }
    }


    return (
        <div>
            <Box mt={2}>
                <label>画像をCloudinaryにアップロード → </label>
                    <input 
                        type='file' 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => seImageFile(e.target.files?.[0] || null)}
                        accept="image/png, image/jpg"
                    />
                <button 
                    onClick={handleClick} disabled={!imageFile}
                >
                    画像アップロード
                </button>
            </Box>
        </div>
      );
}
export default ImgInput

