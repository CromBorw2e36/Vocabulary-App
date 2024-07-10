import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import VocabularyENTITY from "@/server/model/VocabularyENTITY";
import VocabularySQLiteService from "@/server/database/sqlLiteDatabase";
import { router, useFocusEffect } from "expo-router";
import randomNaturalNumber from "@/common/random-number-min-max";
import { ThemedView } from "@/components/ThemedView";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Button } from "@react-native-material/core";

const reivewVocabulary = () => {
  const [InputMaster, SetInputMaster] = useState<Array<VocabularyENTITY>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  const [titleMessage, setTitleMessage] = useState(
    "No vocabulary found. Please add some vocabulary data."
  );

  const _vocabularySQLiteService = new VocabularySQLiteService();

  useFocusEffect(
    React.useCallback(() => {
      const onloadDataSource = async () => {
        await _vocabularySQLiteService.StartDatabase();
        _vocabularySQLiteService.GetItems().then((result) => {
          const data = result.filter(
            (x: VocabularyENTITY) => x?.is_deleted !== true
          );
          SetInputMaster(data); // Assuming SetInputMaster is a state setter function
          if (data.length > 0) {
            setCurrentIndex(
              randomNaturalNumber(0, data.length === 1 ? 0 : data.length - 1)
            );
            setTitleMessage(
              "You have reviewed all the vocabulary, please add new words!"
            );
          }
        });
      };

      onloadDataSource();

      // Clean-up function for useEffect
      return () => {
        // Optional clean-up code here, if needed
      };
    }, [])
  );

  const onAction = ({ code }: { code: "NEXT_TEXT" | "MEANING" }) => {
    switch (code) {
      case "MEANING": {
        setShowDescription(!showDescription);
        break;
      }
      case "NEXT_TEXT": {
        const newdata = InputMaster;
        newdata.splice(currentIndex, 1);
        SetInputMaster(newdata);
        setCurrentIndex(randomNaturalNumber(0, newdata.length - 1));
        setShowDescription(false);
        break;
      }
      default:
        break;
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/Thumbnail/5995729.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      {InputMaster.length > 0 ? (
        <ThemedView style={styles.stepContainer}>
          <ThemedView style={styles.itemContent}>
            <ThemedText
              type="title"
              style={[styles.textItem, styles.textItem1]}
            >
              {InputMaster[currentIndex]?.name ?? ""}
            </ThemedText>
            <ThemedText style={[styles.textItem, styles.textItem2]}>
              {"/"}
              {InputMaster[currentIndex]?.phonicsTractions ?? ""}
              {"/"}
            </ThemedText>

            {showDescription && (
              <ThemedText style={styles.textItem}>
                {InputMaster[currentIndex]?.description ?? ""}
              </ThemedText>
            )}
          </ThemedView>

          <Button
            title="Meaning"
            onPress={() => onAction({ code: "MEANING" })}
          />
          <Button
            title="Next"
            onPress={() => onAction({ code: "NEXT_TEXT" })}
          />
        </ThemedView>
      ) : (
        <ThemedView
          style={[
            styles.stepContainer,
            {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 300,
            },
          ]}
        >
          <ThemedText type="title" style={styles.textItem}>
            {titleMessage}
            <HelloWave />
          </ThemedText>
          <Button
            title="Add vocabulary"
            onPress={() => router.navigate("vocabulary")}
          />
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
};

export default reivewVocabulary;

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
  itemContent: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textItem: {
    textAlign: "center",
  },
  textItem1: {
    fontSize: 38,
    fontWeight: "bold",
    lineHeight: 44,
  },
  textItem2: {
    fontSize: 18,
    fontStyle: "italic",
    lineHeight: 26,
  },
});
