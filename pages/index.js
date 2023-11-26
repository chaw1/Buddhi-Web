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
import React, { useState } from 'react';
import axios from 'axios'; // 引入axios
import Layout from '../components/layouts/article'

const ProfileImage = chakra(Image, {
    shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');

    // 用于处理问题提交的函数
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        try {
            // 发送POST请求到后端
            const res = await axios.post('http://localhost:8080/ask', { question });
            // 设置响应
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error during API call:', error);
            setResponse('遇到了一点问题，请稍后再试。');
        }
        setLoading(false);
    };

    return (
    <Layout>
        <Container maxW="container.md" pt={6} px={6}>
            {/* 输入区域 */}
            <Box mb={4}>
                <Heading as="h3" size="lg" mb={4}>向佛陀提问</Heading>
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
                <Button mt={4} colorScheme="teal" onClick={handleSubmit} isLoading={loading}>
                    发起提问
                </Button>

            </Box>

            {/* 显示回复区域 */}
            {response && (
                <Box mt={4}>
                    <Text fontSize="lg">佛陀的回答：</Text>
                    <Box p={4} bg="teal.50" borderRadius="md" borderColor="teal.200" borderWidth="1px">
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