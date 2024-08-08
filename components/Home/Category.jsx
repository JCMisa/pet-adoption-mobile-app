import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import EmptyState from '../Helpers/EmptyState'

const Category = ({ category }) => {
    const [categoryList, setCategoryList] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('Fish')

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
        await getCategories(); // get the data again
        setRefreshing(false)
    }

    return (
        <View className="-mt-3">
            <Text className="font-pmedium text-md mb-5 text-light">Category</Text>
            <FlatList
                nestedScrollEnabled={true}
                data={categoryList}
                keyExtractor={(item, index) => item?.id || index}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => {
                        setSelectedCategory(item?.name);
                        category(item.name);
                    }} key={index} className="flex-1 flex items-center justify-center"
                    >
                        <View className={`${selectedCategory == item?.name ? 'border border-secondary rounded-lg' : 'opacity-60'}`}>
                            <Image source={{ uri: item?.imageUrl }} className="w-[60px] h-[60px] rounded-lg" />
                        </View>
                        <Text className="text-center font-pregular text-white">{item?.name}</Text>
                    </TouchableOpacity>
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