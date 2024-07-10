import { GestureResponderEvent, StyleSheet, Text, Touchable, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import React, { PropsWithChildren, ReactElement } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

type Prop = PropsWithChildren<{
  headerImage: ReactElement;
  title: string;
  subTitle: string;
  onPress: (event: GestureResponderEvent) => void;
}>;

const ItemMenuRow = ({ headerImage, subTitle, title, children, onPress }: Prop) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
    >
      <ThemedView style={styles.container}>
        <View style={styles.thumbnailImage}>{headerImage}</View>
        <View style={styles.content}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.subtitle}>{subTitle}</ThemedText>
        </View>
      </ThemedView>
    </TouchableNativeFeedback>
  );
};

export default ItemMenuRow;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Shadow property for Android
    elevation: 3,
  },
  thumbnailImage: {
    width: 64,
    minWidth: 24,
  },
  content: {
    paddingLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
    fontStyle: "italic",
  },
});
