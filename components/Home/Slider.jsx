import { View, Text, FlatList, Image, Dimensions, RefreshControl, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import EmptyState from '../Helpers/EmptyState'
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants'

const zoomIn = {
    0: {
        scale: 0.9,
        opacity: 0.5
    },
    1: {
        scale: 1.1,
        opacity: 1
    },
};

const zoomOut = {
    0: {
        scale: 1.1,
        opacity: 1
    },
    1: {
        scale: 0.9,
        opacity: 0.5
    },
};

const pulse = {
    0: { scale: 1 },
    0.5: { scale: 1.1 },
    1: { scale: 1 },
};

const SliderItem = ({ activeItem, item, index }) => {
    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === index ? zoomIn : zoomOut
            }
            duration={500}
        >
            <TouchableOpacity
                className="relative flex justify-center items-center"
                activeOpacity={0.7}
            >
                <ImageBackground
                    source={{
                        uri: item.imageUrl,
                    }}
                    className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </Animatable.View >
    );
};

const Slider = () => {
    const [sliderList, setSliderList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const getSliders = async () => {
        setSliderList([])
        const sliders = await getDocs(collection(db, 'Sliders')) // this will get all the records in the Sliders collection
        sliders.forEach((slider) => {
            console.log("Slider: ", slider.id, " => ", slider.data()); // slider.data() returns each record inside Sliders collection/table
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

    const [activeItem, setActiveItem] = useState(sliderList[0]);

    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    return (
        <View className="mt-10 flex items-center justify-center text-center">
            <FlatList
                data={sliderList}
                keyExtractor={(item, index) => item?.id || index}
                renderItem={({ item, index }) => (
                    sliderList ? <SliderItem activeItem={activeItem} item={item} index={index} /> : (
                        <Animatable.View
                            className="mr-5"
                            animation={activeItem === index ? zoomIn : zoomOut}
                            duration={500}
                        >
                            <TouchableOpacity
                                className="relative flex justify-center items-center"
                                activeOpacity={0.7}
                            >
                                <View className="min-w-52 min-h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40">

                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    )
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 70,
                }}
                contentOffset={{ x: 170 }}
                ListEmptyComponent={({ item, index }) => (
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
        </View>
    )
}

export default Slider