import {
  Image,
  StyleSheet,
  Platform,
  ToastAndroid,
  ScrollView,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ItemMenuRow from "@/components/menu/ItemMenuRow";
import React from "react";
import { router } from "expo-router";

export default function HomeScreen({}) {
  React.useEffect(() => {
    ToastAndroid.show("Design by 2K Soft", ToastAndroid.SHORT);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/Thumbnail/7498819.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">2K, Hello!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ItemMenuRow
          onPress={() => router.navigate("vocabulary")}
          headerImage={
            <Image
              source={require("@/assets/images/Thumbnail/6102035.jpg")}
              style={styles.reactLogo1}
            />
          }
          title="Vocabulary"
          subTitle="Manage your vocabulary"
        ></ItemMenuRow>
        <ItemMenuRow
          onPress={() => router.navigate("reivewVocabulary")}
          headerImage={
            <Image
              source={require("@/assets/images/Thumbnail/4529183.jpg")}
              style={styles.reactLogo1}
            />
          }
          title="Review vocabulary"
          subTitle="Show all your vocabulary"
        ></ItemMenuRow>
        <ItemMenuRow
          onPress={() => ToastAndroid.show("Feature under development", ToastAndroid.SHORT)}
          headerImage={
            <Image
              source={require("@/assets/images/Thumbnail/7718877.jpg")}
              style={styles.reactLogo1}
            />
          }
          title="Find words"
          subTitle="Look at the meaning and guess the word"
        ></ItemMenuRow>
        <ItemMenuRow
          onPress={() => router.navigate("aboutAuthor")}
          headerImage={
            <Image
              source={require("@/assets/images/Thumbnail/453753-PFRUP5-217.jpg")}
              style={styles.reactLogo1}
            />
          }
          title="Contact us"
          subTitle="If you have any question, please contact us"
        ></ItemMenuRow>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
    objectFit: "cover",
  },
  reactLogo1: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
    objectFit: "cover",
    borderRadius: 10,
    overflow: "hidden",
  },
});
