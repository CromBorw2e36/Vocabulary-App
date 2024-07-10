import {
  Image,
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import VocabularyItem, {
  ValueChange,
} from "@/components/vocabulary-item/vocabularyItem";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { FAB } from "@react-native-material/core";
import VocabularyENTITY from "@/server/model/VocabularyENTITY";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import VocabularySQLiteService from "@/server/database/sqlLiteDatabase";
import { useFocusEffect } from "expo-router";
import generateRandomCodeFromDate from "@/common/random-code";

const vocabulary = (prop: any) => {
  const [InputMaster, SetInputMaster] = useState<Array<VocabularyENTITY>>([]);
  const _vocabularySQLiteService = new VocabularySQLiteService();

  useFocusEffect(
    React.useCallback(() => {
      const onloadDataSource = async () => {
        await _vocabularySQLiteService.StartDatabase();
        _vocabularySQLiteService.GetItems().then((result) => {
          console.log(result);
          SetInputMaster(result); // Assuming SetInputMaster is a state setter function
        });
      };

      onloadDataSource();

      // Clean-up function for useEffect
      return () => {
        // Optional clean-up code here, if needed
      };
    }, [])
  );

  const flatListRef = useRef<FlatList<VocabularyENTITY>>(null);

  const handleAddItem = () => {
    const newVocabulary = new VocabularyENTITY();
    newVocabulary.id = InputMaster.length + 1;
    newVocabulary.code = generateRandomCodeFromDate();
    newVocabulary.is_edit = true;
    newVocabulary.is_deleted = false;
    newVocabulary.create_by = "User";
    newVocabulary.create_at = new Date();
    newVocabulary.dev_status = "ADD_NEW";
    SetInputMaster((x) => [newVocabulary, ...x]);
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
    console.log(newVocabulary);
  };

  const handleSaveItem = (param: ValueChange) => {
    const { newData } = param;

    console.log("param", param);
    switch (param.dev_status) {
      case "ADD_NEW": {
        if (param.cancel) {
          const visited = InputMaster.findIndex((x) => x.id === newData!.id);
          if (visited > -1) {
            const updatedList = [...InputMaster];
            updatedList.splice(visited, 1);
            SetInputMaster(updatedList);
          }
          break;
        }
      }
      case "UPDATE": {
        if (newData !== undefined) {
          const visited = InputMaster.findIndex((x) => x.id === newData.id);
          if (visited > -1) {
            const updatedList = [...InputMaster];
            updatedList[visited] = newData;
            SetInputMaster(updatedList);

            if (newData.dev_status == "ADD_NEW") {
              _vocabularySQLiteService.InsertItem(newData);
            }else{
              _vocabularySQLiteService.UpdateItem(newData);
            }
          } else {
            ToastAndroid.show("Action to error", ToastAndroid.SHORT);
          }
        }
        break;
      }
    }
  };

  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    //   headerImage={
    //     <Image
    //       source={require("@/assets/images/Thumbnail/5995729.jpg")}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F9F9F9",
        position: "relative",
        paddingTop: Platform.OS === "android" ? 40 : 0,
      }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Vocabulary</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {InputMaster.filter((x) => x?.is_deleted != true).length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={InputMaster.filter((x) => x?.is_deleted != true)}
            keyExtractor={(item) => item!.id!.toString()}
            renderItem={({ item }) => (
              <VocabularyItem
                data={item}
                title={item?.name}
                subTitle={item?.description}
                phonicTranscription={item?.phonicsTractions}
                onValueChange={handleSaveItem}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 16 }}
            ListEmptyComponent={
              <View style={{ marginBottom: 20 }}>
                <ThemedText type="subtitle">No vocabulary found.</ThemedText>
              </View>
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              // Load more data
            }}
          ></FlatList>
        ) : (
          <Image
            source={require("@/assets/images/Thumbnail/7718877.jpg")}
            style={styles.reactLogo1}
          />
        )}
        <FAB
          onPress={handleAddItem}
          icon={<TabBarIcon name="add" size={24} color={"white"} />}
          color="#2196F3"
          style={{
            position: "absolute",
            bottom: 30,
            right: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></FAB>
      </ThemedView>
    </SafeAreaView>
    // </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    // flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#D3D3D3",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    // paddingVertical: 10,
    // maxHeight: Dimensions.get("window").height,
    // zIndex: 1
    flex: 5,
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
    width: Dimensions.get("window").width,
    bottom: 0,
    left: 0,
    position: "absolute",
    objectFit: "cover",
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default vocabulary;

const _dataDemo = [
  {
    id: 1,
    code: "1",
    name: "English",
    description:
      "The English language is the most widely spoken language in the world.",
    phonicsTractions: "Eng-lən-ch, En-kə-lə-n",
  },
  {
    id: 2,
    code: "2",
    name: "French",
    description:
      "French is a Western European language primarily spoken in France.",
    phonicsTractions: "Fran-ch, Fran-chə-n",
  },
  {
    id: 3,
    code: "3",
    name: "English",
    description:
      "The English language is the most widely spoken language in the world.",
    phonicsTractions: "Eng-lən-ch, En-kə-lə-n",
  },
  {
    id: 4,
    code: "4",
    name: "French",
    description:
      "French is a Western European language primarily spoken in France.",
    phonicsTractions: "Fran-ch, Fran-chə-n",
  },
  {
    id: 5,
    code: "5",
    name: "English",
    description:
      "The English language is the most widely spoken language in the world.",
    phonicsTractions: "Eng-lən-ch, En-kə-lə-n",
  },
  {
    id: 6,
    code: "6",
    name: "French",
    description:
      "French is a Western European language primarily spoken in France.",
    phonicsTractions: "Fran-ch, Fran-chə-n",
  },
  {
    id: 7,
    code: "7",
    name: "English",
    description:
      "The English language is the most widely spoken language in the world.",
    phonicsTractions: "Eng-lən-ch, En-kə-lə-n",
  },
  {
    id: 8,
    code: "8",
    name: "French",
    description:
      "French is a Western European language primarily spoken in France.",
    phonicsTractions: "Fran-ch, Fran-chə-n",
  },
  {
    id: 9,
    code: "9",
    name: "English",
    description:
      "The English language is the most widely spoken language in the world.",
    phonicsTractions: "Eng-lən-ch, En-kə-lə-n",
  },
  {
    id: 21,
    code: "21",
    name: "French",
    description:
      "French is a Western European language primarily spoken in France.",
    phonicsTractions: "Fran-ch, Fran-chə-n",
  },
  {
    id: 10,
    code: "10",
    name: "English",
    description:
      "The English language is the most widely spoken language in the world.",
    phonicsTractions: "Eng-lən-ch, En-kə-lə-n",
  },
  {
    id: 12,
    code: "12",
    name: "French",
    description:
      "French is a Western European language primarily spoken in France.",
    phonicsTractions: "Fran-ch, Fran-chə-n",
  },
  {
    id: 11,
    code: "11",
    name: "English",
    description:
      "The English language is the most widely spoken language in the world.",
    phonicsTractions: "Eng-lən-ch, En-kə-lə-n",
  },
  {
    id: 13,
    code: "13",
    name: "French",
    description:
      "French is a Western European language primarily spoken in France.",
    phonicsTractions: "Fran-ch, Fran-chə-n",
  },
  {
    id: 41,
    code: "41",
    name: "English",
    description:
      "The English language is the most widely spoken language in the world.",
    phonicsTractions: "Eng-lən-ch, En-kə-lə-n",
  },
  {
    id: 14,
    code: "14",
    name: "French",
    description:
      "French is a Western European language primarily spoken in France.",
    phonicsTractions: "Fran-ch, Fran-chə-n",
  },
  {
    id: 15,
    code: "15",
    name: "English",
    description:
      "The English language is the most widely spoken language in the world.",
    phonicsTractions: "Eng-lən-ch, En-kə-lə-n",
  },
  {
    id: 16,
    code: "16",
    name: "French",
    description:
      "French is a Western European language primarily spoken in France.",
    phonicsTractions: "Fran-ch, Fran-chə-n",
  },

  //... more data...
];
