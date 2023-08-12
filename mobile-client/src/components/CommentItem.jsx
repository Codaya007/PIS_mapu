import { View, Text, Heading, Box, Image, Avatar } from 'native-base'
import React from 'react'
import { getTimeAgo } from '../helpers';

export default function CommentDetail({ comment }) {
    const user = comment.user?.name ? `${comment.user?.name} ${comment.user?.lastname}`.trim() : "Desconocido";

    return <View mb={2} bgColor={"gray.100"} display={"flex"} flexDirection={"row"} p={3} justifyContent={"space-between"}>
        <View>
            <Avatar src={comment.user?.avatar} alt={user} />
        </View>
        <View width={"80%"}>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignContent={"center"}>
                <Heading size={"sm"}>{user}</Heading>
                <Text fontSize={"xs"}>
                    {getTimeAgo(comment.createdAt, "")}
                </Text>
            </Box>
            <View width={"full"} paddingY={2}>
                <Text textAlign={"justify"}>{comment.content || "Sin contenido"}</Text>
            </View>
        </View>
    </View >
}