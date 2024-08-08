import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import EmptyState from '../Helpers/EmptyState'

const Category = () => {
    const [categoryList, setCategoryList] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('Cats')

    const getCategories = async () => {
        setCategoryList([])
        const categories = await getDocs(collection(db, "Category"))
        categories.forEach((category) => {
            console.log("Category: ", category.id, " => ", category.data());
            setCategoryList(categoryList => [...categoryList, category.data()])
        })
    }

    useEffect(() => {
        getCategories();
    }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getSliders(); // get the data again
        setRefreshing(false)
    }

    return (
        <View className="mt-3">
            <Text className="font-pmedium text-lg mb-5 text-light">Category</Text>
            <FlatList
                data={categoryList}
                keyExtractor={(item, index) => item?.id || index}
                renderItem={({ item, index }) => (
                    <View key={index} className="flex-1 flex items-center justify-center">
                        <TouchableOpacity className={`${selectedCategory == item?.name ? 'border border-secondary rounded-lg' : 'opacity-70'}`}>
                            <Image source={{ uri: item?.imageUrl }} className="w-[60px] h-[60px] rounded-lg" />
                        </TouchableOpacity>
                        <Text className="text-center font-pregular text-white">{item?.name}</Text>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Categories to Show" subtitle="Please wait while we are fetching the data" />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                numColumns={4}
            />
        </View>
    )
}

export default Category