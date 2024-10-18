"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/app/api";
export default function Login() {
    const router = useRouter();
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = { username: email, password: password };
        api.post("/accounts/token/", data)
            .then((res) => {
                router.push("/");
            })
            .catch((err) => {
                toast({
                    title: "Login failed.",
                    description: "Please check your email and password.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            });
    }

    return (
        <Box
            minH="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="gray.100"
        >
            <Box
                w="full"
                maxW="400px"
                p={6}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                bg="white"
            >
                <Heading mb={4} fontSize="2xl" textAlign="center">
                    Login
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                // type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            bg="var(--accent-color)"
                            type="submit"
                            width="full"
                        >
                            Login
                        </Button>
                        <Text textAlign="center" mt={2}>
                            Don't have an account?{" "}
                            <Button
                                variant="link"
                                colorScheme="teal"
                                onClick={() => router.push("/signup")}
                            >
                                Sign Up
                            </Button>
                        </Text>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}