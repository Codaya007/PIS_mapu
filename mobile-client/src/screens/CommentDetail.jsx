import { View, FlatList, Box, Button } from 'native-base'
import React from 'react'
import CommentItem from '../components/CommentItem'
import { API_BASEURL, CommentName } from '../constants';
import { getAllCommentsFromNode } from '../services/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments } from '../store/slices/commentSlice';
import Toast from "react-native-toast-message";
import axios from 'axios';

export default function CommentDetail({ navigation }) {
    const dispatch = useDispatch();
    const { comments, currentNode } = useSelector(state => state.commentReducer);
    const { user: currentUser } = useSelector(state => state.authReducer);

    const navigateToCommentForm = () => {
        navigation.navigate(CommentName, { node: currentNode })
    }

    const handleDeleteComment = async (commentId) => {
        if (!currentUser) {
            return Toast.show({
                type: "error",
                text1: "No es posible realizar esta acción",
                position: "bottom",
            });
        }

        try {
            await axios.delete(`${API_BASEURL}/comment/${commentId}`);

            Toast.show({
                type: "success",
                text1: "Comentario eliminado exitosamente",
                position: "bottom",
            });
            const data = await getAllCommentsFromNode(currentNode?._id)
            dispatch(getAllComments(data));
        } catch (error) {
            console.log(error.message || error?.response?.data);
            Toast.show({
                type: "error",
                text1: "Hubo un error al eliminar el comentario",
                position: "bottom",
            });
        }
    };

    return <View margin={3} flex={1}>
        {/* <Text style={styles.title}>Comentarios</Text> */}
        {comments?.length > 0 ?
            <>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={comments}
                    renderItem={({ item: comment }) =>
                        <CommentItem
                            comment={comment}
                            user={comment.user && `${comment.user?.name} ${comment.user?.lastname}`.trim()}
                            handleDeleteComment={handleDeleteComment}
                        />
                    }
                />
            </> : <Box>Aún no hay comentarios</Box>
        }
        <Button mt={2} borderRadius={50} bgColor="indigo.500" onPress={navigateToCommentForm}>Comentar</Button>
    </View>
}