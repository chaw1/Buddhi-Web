import NextLink from 'next/link'
import {
    Link,
    Container,
    Heading,
    Box,
    SimpleGrid,
    Button,
    List,
    ListItem,
    useColorModeValue,
    chakra,
    Input,
    Text // 同时添加 Text，用于显示回答
} from '@chakra-ui/react'
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import Image from 'next/image'
import React, { useState,useContext } from 'react';
import axios from 'axios'; // 引入axios
import Layout from '../components/layouts/article'
import { AuthContext } from '../components/context/AuthContext'; // 引入AuthContext

const ProfileImage = chakra(Image, {
    shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const { isLoggedIn } = useContext(AuthContext); // 获取登录状态

    // 用于处理问题提交的函数
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        if (!isLoggedIn) {
            // 如果用户未登录，显示提示信息或打开登录模态框
            alert("请先登录！");
            return;
        }
        setLoading(true);
        try {
            // 发送POST请求到后端
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:8080/ask', { question }, {
                headers: {
                    'Authorization': `${token}` // 确保正确地附加了令牌
                }
            });
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error during API call:', error);
            setResponse('遇到了一点问题，请稍后再试。');
        }
        setLoading(false);
    };

    return (
    <Layout>
        <Container maxW="container.md" centerContent pt={6} px={6} height="100vh">
            {/* 输入区域 */}
            <Box mb={4} >
                <Heading as="h3" size="xl" mb={6}>向佛陀提问</Heading>
                <Input
                    //回车提交
                    onKeyPress={(e) => {
                        if(e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    placeholder="在这里静心提问..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    size="md"
                    bg="white"
                    borderColor="teal.300"
                />
                <Button mt={4} colorScheme="teal" size="lg" onClick={handleSubmit} isLoading={loading}>
                    发起提问
                </Button>
            </Box>

            {/* 显示回复区域 */}
            {response && (
                <Box mt={4}>
                    <Text fontSize="lg">佛陀的回答：</Text>
                    <Box p={4} bg="white" borderRadius="md" borderColor="teal.300" borderWidth="2px">
                        {response}
                    </Box>
                </Box>
            )}
        </Container>
    </Layout>
    );
};

export default Home;
export { getServerSideProps } from '../components/chakra';