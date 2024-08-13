import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import shared from '@/shared/shared';

const MarkFav = ({ pet }) => {
    const { user } = useUser();

    const [favList, setFavList] = useState()

    useEffect(() => {
        user && getFav()
    }, [user])

    const addToFav = async () => {
        const favResult = favList;
        favResult.push(pet.id); // push the current pet id to the favList state
        await shared.updateFav(user, favResult); // update the favorites property with the current elements of favResult/favList
        getFav();
    }

    const removeFromFav = async () => {
        const favResult = favList.filter(item => item != pet?.id); // collect all ids inside favList array which is not equal to the current pet id, if the element is equal to the current pet id, then skip it and will not be included to the updated list
        await shared.updateFav(user, favResult); // update the list with the updated value of favList
        getFav();
    }

    const getFav = async () => {
        const result = await shared.getFavList(user)
        setFavList(result?.favorites ? result?.favorites : [])
    }
    return (
        <View>
            {favList?.includes(pet?.id) ? (
                <Pressable onPress={() => removeFromFav()}>
                    <Ionicons name="heart" size={30} color='red' />
                </Pressable>
            ) : (
                <Pressable onPress={() => addToFav()}>
                    <Ionicons name="heart-outline" size={30} color='white' />
                </Pressable>
            )}
        </View>
    )
}

export default MarkFav