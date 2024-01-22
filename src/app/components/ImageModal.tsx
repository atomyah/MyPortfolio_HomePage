// src/app/components/ImageModal.tsx
// react-modalを使用することになったのでボツ.

// import React from 'react';
// import { Modal, Box, Button, } from '@mui/material';
// import Image from "next/image";

// interface ImageModalProps {
//   isOpen: boolean;
//   imageUrl: string;
//   onClose: () => void;
// }

// const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, onClose }) => {
//   return (
//     <Modal open={isOpen} onClose={onClose}>
//       <Box>
//         <img src={imageUrl} alt="" width={1100} height={750} />
//         <Button onClick={onClose}>Close</Button>
//       </Box>
//     </Modal>
//   );
// };

// export default ImageModal;