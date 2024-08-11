import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { SafeAreaView } from 'react-native-safe-area-context'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import PetListItem from './PetListItem'
import * as Animatable from 'react-native-animatable';

const pulse = {
    0: { scale: 1 },
    0.5: { scale: 1.1 },
    1: { scale: 1 },
};

const PetListByCategory = () => {
    const [petList, setPetList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const getPetList = async (category) => {
        setPetList([])
        // collect all records inside Pets collection where category property is equal to category parameter passed in the method
        const q = query(collection(db, 'Pets'), where('category', '==', category))
        const result = await getDocs(q)

        result.forEach((res) => {
            console.log("PetListCategory: ", res.id, " => ", res.data());
            setPetList(petList => [...petList, res.data()]);
        })
    }

    useEffect(() => {
        getPetList('Fish')
    }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getPetList('Fish'); // get the data again
        setRefreshing(false)
    }

    return (
        <SafeAreaView>
            {/* value will be either Cats, Dogs, Birds, or Fish */}
            <Category category={(value) => getPetList(value)} />
            <FlatList
                nestedScrollEnabled={true}
                data={petList}
                keyExtractor={(item, index) => item?.id || index}
                renderItem={({ item }) => (
                    <View className='mt-5 flex'>
                        <PetListItem info={item} />
                    </View>
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={() => (
                    <View className="flex flex-row">
                        <Animatable.View
                            className="mr-5"
                            animation={pulse}
                            duration={3000}
                            iterationCount="infinite"
                            easing="ease-in-out"
                        >
                            <TouchableOpacity
                                className="relative flex justify-center items-center"
                                activeOpacity={0.7}
                            >
                                <View className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40">

                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default PetListByCategory