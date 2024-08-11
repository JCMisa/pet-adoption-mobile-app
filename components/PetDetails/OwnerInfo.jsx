import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'

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
        <View>
            <Image source={{ uri: userInfo?.imageUrl }} className='w-[40px] h-[40px]' />
            <Text className='text-white'>{userInfo?.name}</Text>
        </View>
    )
}

export default OwnerInfo