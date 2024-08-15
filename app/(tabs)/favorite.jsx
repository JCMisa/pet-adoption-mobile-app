import { View, Text, ScrollView, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import shared from '@/shared/shared'
import { useUser } from '@clerk/clerk-expo'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import PetListItem from '@/components/Home/PetListItem'
import EmptyState from '@/components/Helpers/EmptyState'

const Favorite = () => {
    const { user } = useUser();

    const [favIds, setFavIds] = useState([])
    const [favPetList, setFavPetList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        user && getFavPetId();
    }, [user])

    // const getFavPetId = async () => {
    //     setLoading(true)
    //     const result = await shared.getFavList(user);
    //     setFavIds(result?.favorites); // set te value of the state to the current favorites array property
    //     setLoading(false)
    //     getFavPetList(result?.favorites);
    // }

    const getFavPetId = async () => {
        setLoading(true)
        setFavIds([])
        try {
            const querySnapshot = await getDocs(query(collection(db, 'UserFavPet'), where('email', '==', user?.primaryEmailAddress?.emailAddress)));

            // created new array variable that stores the the mapped favorites
            // this will return nested arrays, first element array is the array with elements and the second is the array without elements
            // const favoritePetIds = querySnapshot.docs.map(doc => doc.data().favorites);
            querySnapshot.forEach((favorite) => {
                console.log("favorite pet infos: ", favorite.data());
                setFavIds(favorite.data().favorites)
            })
            // console.log("favorite pet ids:", favoritePetIds);
            // setFavIds(favoritePetIds[0]);
            console.log("favorite pet ids states:", favIds);
            getFavPetList(favIds);
        } catch (error) {
            console.error("Error fetching favorite pet ID:", error);
        } finally {
            setLoading(false)
        }
    }

    const getFavPetList = async (favIdParams) => {
        setLoading(true)
        setFavPetList([]); // reset the state when fetching new data

        const q = query(collection(db, 'Pets'), where('id', 'in', favIdParams)); // get all record in Pets collection where id can be seen inside favIds array, we used "in" instead of "==" so we can get a list of all records not only one

        const favPets = await getDocs(q)

        favPets.forEach((pet) => {
            console.log("favorite pet info: ", pet.data());
            setFavPetList(prev => [...prev, pet.data()])
        })
        setLoading(false)
    }

    return (
        <SafeAreaView className='p-7 bg-black-200 h-full'>
            <FlatList
                data={favPetList}
                keyExtractor={(item, index) => item?.id || index}
                renderItem={(item, index) => (
                    <View className='mt-5'>
                        <PetListItem info={item?.item} />
                    </View>
                )}
                numColumns={2}
                ListHeaderComponent={() => (
                    <Text className='font-pbold text-2xl text-light'>Favorites</Text>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Favorites to Show" subtitle="Please wait while we are fetching the data" />
                )}
                onRefresh={getFavPetId}
                refreshing={loading}
            />
            {/* <TouchableOpacity onPress={() => getFavPetId()}>
                <Text>Refresh</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

export default Favorite