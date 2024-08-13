import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import Feather from '@expo/vector-icons/Feather';

const OwnerInfo = ({ pet }) => {
    const [userInfo, setUserInfo] = useState([])

    // i am first getting the user info by getting all the records in Pets table where it satisfy the conditions and store it in userInfo state
    const getUserInfo = async () => {
        setUserInfo([])
        const que = query(collection(db, 'Pets'), where('name', '==', pet?.name), where('category', '==', pet?.category), where('breed', '==', pet?.breed), where('age', '==', pet?.age), where('sex', '==', pet?.sex))
        const userInfos = await getDocs(que)
        userInfos.forEach((info) => {
            console.log("User info: ", info.id, " => ", info.data().user);
            setUserInfo(info.data().user)
        })
    }

    useEffect(() => {
        getUserInfo()
        console.log("pet info: ", pet);
    }, [])
    return (
        <View className='py-7 flex flex-row items-center justify-between border border-radius border-gray-100 shadow rounded-lg w-[95%] ml-3 p-5 bg-black-100'>

            <View className='flex flex-row items-center gap-3'>
                <Image source={{ uri: userInfo?.imageUrl }} className='w-[50px] h-[50px] rounded-full' />

                <View>
                    <Text className='text-white font-pmedium text-lg'>{userInfo?.name}</Text>
                    <Text className='text-light font-pregular text-xs'>Pet Owner</Text>
                </View>
            </View>

            <Feather name="send" size={24} color="white" />
        </View>
    )
}

export default OwnerInfo