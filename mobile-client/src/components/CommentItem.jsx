import { View, Text, Heading } from 'native-base'
import React from 'react'


// const formatBlockName = (str = "Bloque 0") => str.split(" ")[1]

export default function CommentDetail({ comment, user }) {
    // const { content = "" } = comment;
    // const { name = "Unknow", lastname = "" } = user;

    return <View borderRadius={0} mb={2} bgColor={"gray.100"} display={"flex"} flexDirection={"row"}>
        <View padding={"3"} width={"85%"}>
            {/* <Heading size={"sm"}>{user.name}</Heading> */}
            {/* QUITAR MAS TARDE */}
            <Heading size={"sm"}>{user}</Heading> 
            <View width={"full"}>
                <Text textAlign={"justify"}>{comment.content || "Sin contenido"}</Text>
            </View>
        </View>
    </View >
}