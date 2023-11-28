import { useState,useContext } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../components/context/AuthContext'; // 引入AuthContext

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:8080/login', { email, password });
            console.log(res.data);
            onClose(); // 关闭模态窗口

            // 登录成功后更新AuthContext状态
            if (res.data && res.data.token) {
                login({email, token: res.data.token}); // 使用AuthContext的login函数
                localStorage.setItem('token', res.data.token); // 可选：保存令牌到本地存储
            }
        } catch (error) {
            console.error('登录失败', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>登录</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>邮箱</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <FormLabel>密码</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleLogin}>
                        登录
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;
