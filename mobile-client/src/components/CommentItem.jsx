import { View, Text, Heading, Box, Avatar, Button } from 'native-base'
import React from 'react'
import { getTimeAgo } from '../helpers';
import { EvilIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";

// const lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At provident delectus nisi repudiandae recusandae. Quae fugit quos est temporibus saepe asperiores a, eligendi aperiam voluptatum magni deserunt commodi porro libero."

export default function CommentDetail({ comment, handleDeleteComment }) {
    const { user: currentUser } = useSelector(state => state.authReducer);
    const commentUser = comment?.user;
    const userFullName = commentUser?.name ? `${commentUser?.name} ${commentUser?.lastname}`.trim() : "Desconocido";

    return <Box mb={2} bgColor={"gray.300"} borderRadius={"10"} display={"flex"} flexDirection={"row"} p={3} justifyContent={"space-between"}>
        <View>
            <Avatar source={{ uri: commentUser?.avatar }} alt={userFullName} />
        </View>
        <View width={"80%"}>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignContent={"center"}>
                <Heading size={"sm"}>{userFullName}</Heading>
                <Text fontSize={"xs"}>
                    {getTimeAgo(comment.createdAt, "")}
                </Text>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} flexDirection={"row"}>
                <Box width={"80%"} paddingY={2}>
                    <Text textAlign={"justify"}>{comment.content || "Sin contenido"}</Text>
                </Box>
                {currentUser?._id == commentUser?._id &&
                    <Button onPress={() => handleDeleteComment(comment?._id)} background={"transparent"} width={"20"} pr={"10"}>
                        <EvilIcons name="trash" size={32} color="red" />
                    </Button>
                }
            </Box>
        </View>
    </Box >
}