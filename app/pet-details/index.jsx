import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubInfo from '@/components/PetDetails/PetSubInfo';
import AboutPet from '@/components/PetDetails/AboutPet';
import OwnerInfo from '@/components/PetDetails/OwnerInfo';
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

const PetDetails = () => {
    const { user } = useUser();
    const pet = useLocalSearchParams();
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: 'white'
        })

        getUserInfo();
    }, [])

    // to get the user property of the pet selected and save the user info in one state
    const getUserInfo = async () => {
        const que = query(collection(db, 'Pets'), where('id', '==', pet?.id));
        const user = await getDocs(que);
        user.forEach((item) => {
            console.log("user details: ", item.data().user);
            setUserInfo(item.data().user)
        })
    }

    // used to initiate chat session between two users
    const initiateChat = async () => {
        const docId1 = user?.primaryEmailAddress?.emailAddress + '_' + userInfo.email;
        const docId2 = userInfo.email + '_' + user?.primaryEmailAddress?.emailAddress;

        const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());

            router.push({
                pathname: '/chat',
                params: { id: doc?.id }
            })
        })

        if (querySnapshot.docs?.length == 0) {
            await setDoc(doc(db, 'Chat', docId1), {
                id: docId1,
                users: [
                    {
                        email: user?.primaryEmailAddress?.emailAddress,
                        imageUrl: user?.imageUrl,
                        name: user?.fullName
                    },
                    {
                        email: userInfo.email,
                        imageUrl: userInfo.imageUrl,
                        name: userInfo.name
                    }
                ]
            })
            router.push({
                pathname: '/chat',
                params: { id: docId1 }
            })
        }
    }

    return (
        <SafeAreaView className='bg-black-200 h-full'>
            <ScrollView>
                {/* pet info */}
                <PetInfo pet={pet} />

                {/* pet subinfo */}
                <PetSubInfo pet={pet} />

                {/* about */}
                <AboutPet pet={pet} />

                {/* owner details */}
                <OwnerInfo pet={pet} />
                <View className='h-28'></View>
            </ScrollView>

            {/* adopt button */}
            <View className='absolute w-full bottom-0'>
                <TouchableOpacity onPress={initiateChat} className='p-5 bg-secondary'>
                    <Text className='text-center font-pmedium text-lg text-white'>
                        Adopt Me
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PetDetails