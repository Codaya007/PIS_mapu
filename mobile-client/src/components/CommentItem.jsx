import axios from 'axios';
import { View, Text, Heading, Button } from 'native-base'
import Toast from "react-native-toast-message";
import { EvilIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { API_BASEURL } from "../constants";

import React from 'react'

export default function CommentDetail({ comment }) {
    const { content = "",
        // user = { name: "Unknow" } 
    } = comment;
    const { user } = useSelector((state) => state.authReducer);

    const handleDeleteComment = async () => {
        // console.log("fsdfdsfadfads", user);
        if (user == null) {
            return Toast.show({
                type: "error",
                text1: "Para eliminar el comentario debe registrarse",
                position: "bottom",
            });
        }

        try {
            console.log("fsdfdsfadfads", comment._id);
            await axios.delete(`${API_BASEURL}/comment/${comment._id}`);

            Toast.show({
                type: "success",
                text1: "Comentario eliminado exitosamente",
                position: "bottom",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Hubo un error al eliminar el comentario",
                position: "bottom",
            });
            console.log(error);
        }
    };


    return <View borderRadius={0} mb={2} bgColor={"gray.100"} display={"flex"} flexDirection={"row"}>
        <View padding={"3"} width={"85%"}>
            <Heading size={"sm"}>{comment.user?.name} {comment.user?.lastname}</Heading>
            <View width={"full"}>
                <Text textAlign={"justify"}>{content || "Sin contenido"}</Text>
            </View>
        </View>
        {user?._id == comment?.user?._id &&
            <Button onPress={handleDeleteComment} background={"transparent"} width={"20"} pr={"10"}>
                <EvilIcons name="trash" size={32} color="red" />
            </Button>
        }
    </View >
}