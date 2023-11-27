// // components/LoadingScreen.js
// import React from 'react';
// import { Box, CircularProgress, Image } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import buddhi from '../public/images/buddhi.png'
//
// const LoadingScreen = () => {
//     return (
//         <motion.div
//             initial={{ translateY: 0 }}
//             animate={{ translateY: '-100vh' }}
//             transition={{ duration: 0.5, delay: 1 }}
//         >
//             <Box
//                 position="fixed"
//                 top="0"
//                 left="0"
//                 right="0"
//                 bottom="0"
//                 bg="#F5F5DC" // 米色背景
//                 zIndex="1000"
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="center"
//                 alignItems="center"
//             >
//                 <Image src={buddhi} boxSize="100px" alt="Logo" />
//                 <CircularProgress isIndeterminate color="teal.300" />
//             </Box>
//         </motion.div>
//     );
// };
//
// export default LoadingScreen;
// components/LoadingScreen.js
import React from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';

const LoadingScreen = () => {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="white"
            zIndex="1000"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Spinner size="xl" speed="0.65s" emptyColor="gray.200" color="blue.500" />
            <Text mt="4" fontSize="lg">正在加载...</Text>
        </Box>
    );
};

export default LoadingScreen;

