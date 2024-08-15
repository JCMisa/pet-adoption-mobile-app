import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import MarkFav from '../MarkFav'

const PetInfo = ({ pet }) => {
    function modifyImageUrl(url) {
        // Define the regular expression to match the pattern
        const regex = /\/PetAdopt\/([^\/]+)/;

        // Extract the filename using the regex
        const match = url.match(regex);
        if (!match) {
            return url; // No match, return original URL
        }

        const [, filename] = match; // Destructure the match array

        // Construct the new URL with "%2F"
        return `https://firebasestorage.googleapis.com/v0/b/native-backend.appspot.com/o/PetAdopt%2F${filename}?alt=media&token=1d4bf76d-7360-41d7-9a33-5ab56236ac2b`;
    }

    // Example usage
    const originalUrl = pet?.imageUrl;
    const modifiedUrl = modifyImageUrl(originalUrl);

    return (
        <View>
            <Image source={{ uri: modifiedUrl }} className='w-full h-[400px] bg-cover' />

            <View className='p-7 flex flex-row justify-between items-center'>
                <View>
                    <Text className='font-pbold text-xl text-white'>{pet?.name}</Text>
                    <Text className='font-pregular text-xs text-light max-w-[200px]'>{pet?.address}</Text>
                </View>

                <MarkFav pet={pet} />
            </View>
        </View>
    )
}

export default PetInfo