import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '@/constants';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabIcon = ({ color, iconName, menuName, focused }) => {
    return (
        <View className="flex items-center justify-center gap-2">
            <Ionicons name={iconName} size={24} color={color} focused={focused} />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                style={{ color: color }}
            >
                {menuName}
            </Text>
        </View>
    );
};

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#f27513",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle: {
                    backgroundColor: "#222831",
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 84
                }
            }}
        >
            <Tabs.Screen name="home" options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon iconName="home" menuName="Home" color={color} focused={focused} />
                )
            }} />

            <Tabs.Screen name="favorite" options={{
                title: "Favorites",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon iconName="heart" menuName={"Favorites"} color={color} focused={focused} />
                )
            }} />

            <Tabs.Screen name="inbox" options={{
                title: "Inbox",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon iconName="chatbubble" menuName={"Inbox"} color={color} focused={focused} />
                )
            }} />

            <Tabs.Screen name="profile" options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon iconName="person-circle" menuName={"Profile"} color={color} focused={focused} />
                )
            }} />
        </Tabs>
    )
}

export default TabLayout