import { View, Text, FlatList, Image, SafeAreaView, Dimensions, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import EmptyState from '../Helpers/EmptyState'

const Slider = () => {
    const [sliderList, setSliderList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const getSliders = async () => {
        setSliderList([])
        const sliders = await getDocs(collection(db, 'Sliders')) // this will get all the records in the Sliders collection
        sliders.forEach((slider) => {
            console.log(slider.id, " => ", slider.data()); // slider.data() returns each record inside Sliders collection/table
            setSliderList(sliderList => [...sliderList, slider.data()]); // push each record into sliderList state array
        });
    }

    useEffect(() => {
        getSliders();
    }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getSliders(); // get the data again
        setRefreshing(false)
    }

    return (
        <SafeAreaView className="mt-10 flex items-center justify-center text-center">
            <FlatList
                data={sliderList}
                keyExtractor={(item, index) => item?.id || index}
                renderItem={({ item }) => (
                    <View>
                        <Image source={{ uri: item?.imageUrl }} alt='slider' className="h-[170px] rounded-lg mr-5" style={{ width: Dimensions.get('screen').width * 0.9 }} />
                    </View>
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <EmptyState title="No Sliders to Show" subtitle="Please wait while we are fetching the data" />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    )
}

export default Slider