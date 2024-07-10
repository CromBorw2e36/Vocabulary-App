import { Stack, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
      initialRouteName="aboutAuthor"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="vocabulary"
        options={{
          title: "Vocabulary",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "book" : "book-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reivewVocabulary"
        options={{
          title: "Review",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "file-tray-full" : "file-tray-stacked-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="aboutAuthor"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chatbox" : "chatbox-ellipses"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
