import { View, Text } from 'react-native'
import React from 'react'
import Category from './Category'
import { SafeAreaView } from 'react-native-safe-area-context'

const PetListByCategory = () => {
    return (
        <SafeAreaView>
            <Category />
        </SafeAreaView>
    )
}

export default PetListByCategory