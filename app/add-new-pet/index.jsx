import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Picker } from '@react-native-picker/picker';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from '@/config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

const AddNewPet = () => {
    const navigation = useNavigation();
    const { user } = useUser();

    const [formData, setFormData] = useState(
        {
            category: 'Fish',
            sex: 'Male'
        }
    )
    const [gender, setGender] = useState()
    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Fish')
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: 'white'
        })

        getCategories();
    }, [])

    const getCategories = async () => {
        setCategoryList([])
        const categories = await getDocs(collection(db, "Category"))
        categories.forEach((category) => {
            console.log("Category: ", category.id, " => ", category.data());
            setCategoryList(categoryList => [...categoryList, category.data()])
        })
    }

    // used to pick image from gallery
    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const handleInputChange = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue);
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const onSubmit = () => {
        // checks if all 8 fields are filled and no one left behind
        if (Object.keys(formData).length != 8) {
            ToastAndroid.show('Please enter all details.', ToastAndroid.SHORT)
            return;
        }
        uploadImage();
    }

    // use to upload pet image to firebase storage
    const uploadImage = async () => {
        setLoading(true)
        const resp = await fetch(image)
        const blobImage = await resp.blob();
        const storageRef = ref(storage, '/PetAdopt/' + Date.now() + '.jpg')

        uploadBytes(storageRef, blobImage).then((snapshot) => {
            console.log('File Uploaded');
        }).then(resp => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {
                console.log(downloadUrl); // returns the image url
                saveFormData(downloadUrl);
            })
        })
    }

    const saveFormData = async (imageUrl) => {
        const docId = Date.now().toString();
        await setDoc(doc(db, 'Pets', docId), {
            ...formData,
            imageUrl: imageUrl,
            user: {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                imageUrl: user?.imageUrl
            },
            id: docId
        })
        setLoading(false)
        router.replace('/')
    }

    return (
        <SafeAreaView className='bg-black-200 h-full p-7 mt-5'>
            <ScrollView>
                <Text className='text-white font-pbold text-xl'>Add New Pet</Text>

                <Pressable onPress={imagePicker} className='border border-secondary-100 bg-black-100 p-3 w-[80px] shadow rounded-lg mt-5'>
                    {
                        !image ?
                            <Image source={images.paw} className='w-[50px] h-[50px]' /> :
                            <Image source={{ uri: image }} className='w-[50px] h-[50px]' />
                    }
                </Pressable>

                <View className='mt-5'>
                    <Text className='text-white font-pthin'>Pet Name *</Text>
                    <TextInput className='p-5 bg-black-100 border rounded-lg border-secondary-100 font-pregular text-white' onChangeText={(value) => handleInputChange('name', value)} />
                </View>

                <View className='mt-5'>
                    <Text className='text-white font-pthin'>Pet Breed *</Text>
                    <TextInput className='p-5 bg-black-100 border rounded-lg border-secondary-100 font-pregular text-white' onChangeText={(value) => handleInputChange('breed', value)} />
                </View>

                <View className='mt-5 mb-5'>
                    <Text className='text-white font-pthin'>Pet Age *</Text>
                    <TextInput className='p-5 bg-black-100 border rounded-lg border-secondary-100 font-pregular text-white' onChangeText={(value) => handleInputChange('age', value)} keyboardType='number-pad' />
                </View>

                <View className='flex flex-row gap-5'>
                    <View className='w-[30%]'>
                        <Text className='text-white font-pthin'>Gender</Text>
                        <Picker
                            style={{ backgroundColor: '#1E1E2D', color: 'white' }}
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) => {
                                setGender(itemValue);
                                handleInputChange('sex', itemValue)
                            }}>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </View>
                    <View className='w-[70%]'>
                        <Text className='text-white font-pthin'>Category</Text>
                        <Picker
                            style={{ backgroundColor: '#1E1E2D', color: 'white' }}
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedCategory(itemValue);
                                handleInputChange('category', itemValue);
                            }}>
                            {categoryList && categoryList.map((category, index) => (
                                <Picker.Item key={index} label={category.name} value={category.name} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View className='mt-5'>
                    <Text className='text-white font-pthin'>Pet Weight *</Text>
                    <TextInput className='p-5 bg-black-100 border rounded-lg border-secondary-100 font-pregular text-white' onChangeText={(value) => handleInputChange('weight', value)} keyboardType='number-pad' />
                </View>

                <View className='mt-5'>
                    <Text className='text-white font-pthin'>Address *</Text>
                    <TextInput className='p-5 bg-black-100 border rounded-lg border-secondary-100 font-pregular text-white' onChangeText={(value) => handleInputChange('address', value)} />
                </View>

                <View className='mt-5'>
                    <Text className='text-white font-pthin'>About *</Text>
                    <TextInput className='p-5 bg-black-100 border rounded-lg border-secondary-100 font-pregular text-white' onChangeText={(value) => handleInputChange('about', value)} numberOfLines={5} multiline={true} />
                </View>

                <TouchableOpacity className='bg-secondary-100 p-5 rounded-lg mt-5' onPress={onSubmit} disabled={loading}>
                    {
                        loading ? <ActivityIndicator size={'small'} /> : (
                            <Text className='text-center text-primary font-pmedium text-lg'>Submit</Text>
                        )
                    }
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddNewPet