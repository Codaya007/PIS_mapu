import { View, Text, Heading } from 'native-base'
import React from 'react'
import CommentItem from '../components/CommentItem'

export default function CommentDetail({ comments }) {

    return  <View marginTop={2} >
        {/* {comments?.length > 0 &&
            <>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={comments}
                    renderItem={({ item: comment }) =>
                        // <Text>{comment.content}</Text>
                        <CommentItem comment={comment} user={"sdfasfdsadf"} />
                    }
                />
            </>
        } */}
        // ! Pensaba ponerle para que pueda visualizar su comentario y eliminarlo, o una vista a todos los comentarios que tiene ese nodo, porque la pantalla de detalle de nodo esta muy sobrecargada
    </View>
}