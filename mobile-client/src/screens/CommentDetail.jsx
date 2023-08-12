import { View, Text, FlatList, Box, Button } from 'native-base'
import React from 'react'
import CommentItem from '../components/CommentItem'
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CommentName } from '../constants';

export default function CommentDetail({ navigation }) {
    const route = useRoute();

    const { comments = [] } = route.params;

    const navigateToCommentForm = () => {
        navigation.navigate(CommentName)
    }

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
                        />
                    }
                />
            </> : <Box>Aún no hay comentarios</Box>
        }
        <Button mt={2} borderRadius={50} bgColor="indigo.500" onPress={navigateToCommentForm}>Comentar</Button>
    </View>
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: '600',
    },
});