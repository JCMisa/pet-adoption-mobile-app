import { View, Text, ScrollView, Platform, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from 'react-native-gifted-chat'
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';

const ChatScreen = () => {
    const { user } = useUser();

    const params = useLocalSearchParams();
    const navigation = useNavigation();

    const [chatMate, setChatMate] = useState()
    const [messages, setMessages] = useState([])

    useEffect(() => {
        getUserDetails();

        const unsubscribe = onSnapshot(collection(db, 'Chat', params?.id, 'Messages'), (snapshot) => {
            const messageData = snapshot.docs.map((doc) => ({
                _id: doc.id,
                ...doc.data()
            }))
            setMessages(messageData);
        });

        return () => unsubscribe();
    }, [])

    const getUserDetails = async () => {
        const docRef = doc(db, 'Chat', params?.id); // it means to get the record in Chat collection with document id equal to params.id
        const docSnap = await getDoc(docRef);

        const result = docSnap?.data();
        console.log("chat session user details: ", result);

        // to get the information of user to chat only to avoid chatting with your self HAHA xd
        const otherUser = result?.users?.filter(item => item.email != user?.primaryEmailAddress?.emailAddress)
        console.log('user to chat: ', otherUser);
        setChatMate(otherUser[0]);
        console.log('user to chat state: ', chatMate);

        navigation.setOptions({
            headerTransparent: false,
            headerTitle: otherUser[0].name,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#222831'
            }
        })
    }

    const onSend = async (newMessage) => {
        setMessages((previousMessage) => GiftedChat.append(previousMessage, newMessage));
        newMessage[0].createdAt = moment().format('MM-DD-yyyy HH:mm:ss');
        await addDoc(collection(db, 'Chat', params.id, 'Messages'), newMessage[0])
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            {/* <View>
                <Pressable onPress={() => router.replace('/(tabs)/inbox')} className='mt-[-10]'>
                    <View className='flex flex-row items-end'>
                        <Text className='text-white px-3 text-xl font-pmedium'>{chatMate?.name}</Text>
                        <Text className='text-xs font-plight text-light'>(pet owner)</Text>
                    </View>
                </Pressable>
            </View> */}
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                showUserAvatar={true}
                user={{
                    _id: user?.primaryEmailAddress?.emailAddress,
                    name: user?.fullName,
                    avatar: user?.imageUrl
                }}
            />
            {
                Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
            }
        </SafeAreaView>
    )
}

export default ChatScreen