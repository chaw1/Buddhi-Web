import { useState } from 'react';
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
import axios from 'axios'; // 引入axios
import { AuthContext } from '../components/context/AuthContext';

const RegisterModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('密码不一致');
            return;
        }
        try {
            const res = await axios.post('http://localhost:8080/register', { email, password });
            console.log(res.data);
            onClose(); // 关闭模态窗口
        } catch (error) {
            console.error('注册失败', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>注册</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>邮箱</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <FormLabel>密码</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <FormLabel>确认密码</FormLabel>
                        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleRegister}>
                        注册
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RegisterModal;
