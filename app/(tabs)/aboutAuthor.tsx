import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@react-native-material/core";

const aboutAuthor = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 4, alignContent: "center", justifyContent: "center" }}
      >
        <ThemedText style={styles.text_content}>Product</ThemedText>
        <ThemedText type="title" style={[styles.text_content, { height: 60 }]}>
          Vocabulary
        </ThemedText>
        <ThemedText style={styles.text_content}>Author</ThemedText>
        <ThemedText type="subtitle" style={styles.text_content}>
          CromBrow2e36
        </ThemedText>
        <ThemedText style={styles.text_content}>Design</ThemedText>
        <ThemedText type="subtitle" style={styles.text_content}>
          CromBrow2e36
        </ThemedText>
        <ThemedText style={styles.text_content}>
          <ThemedText style={styles.text}>
            Designed to meet the creator's needs. You can provide feedback to
            help us improve via email at{" "}
            <ThemedText
              style={styles.link}
              onPress={() =>
                Linking.openURL("mailto:khanhdthucntt19@gmail.com")
              }
            >
              khanhdthucntt19@gmail.com
            </ThemedText>
            .{"\n"}Thank you for using our product and sharing your thoughts.
          </ThemedText>
        </ThemedText>
      </View>
      <View style={{ flex: 1, padding: 60, gap: 10 }}>
        <Button title="Set password" />
        <Button title="Recycle bin" />
        <Button color="error" variant="text" title="Reset data" />
      </View>
    </View>
  );
};

export default aboutAuthor;

const styles = StyleSheet.create({
  text_content: {
    textAlign: "center",
    gap: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    margin: 20,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
