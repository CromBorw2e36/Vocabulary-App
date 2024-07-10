import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { PropsWithChildren, ReactElement, useEffect } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import VocabularyENTITY from "@/server/model/VocabularyENTITY";
import { TabBarIcon } from "../navigation/TabBarIcon";

export interface ValueChange {
  newData: VocabularyENTITY | undefined;
  dev_status: undefined | "ADD_NEW" | "UPDATE";
  cancel: undefined | boolean;
}

type Prop = PropsWithChildren<{
  title?: string;
  subTitle?: string;
  phonicTranscription?: string;
  data: VocabularyENTITY | undefined;
  onValueChange?: (event: ValueChange) => void;
}>;

const VocabularyItem = ({
  subTitle,
  title,
  children,
  phonicTranscription,
  data,
  onValueChange,
}: Prop) => {
  const [InputMaster, SetInputMaster] = React.useState<VocabularyENTITY>(
    new VocabularyENTITY()
  );
  const [showPControl, setShowControl] = React.useState<boolean>(false);

  useEffect(() => {
    if (data) SetInputMaster(data);
  }, [data]);

  const onAction = (param: { code: string }) => {
    switch (param.code) {
      case "edit":
        SetInputMaster({
          ...data,
          is_edit: true,
        });
        setShowControl(false);
        break;
      case "delete":
        if (onValueChange) {
          onValueChange({
            newData: {
              ...InputMaster,
              is_deleted: true,
              delete_at: new Date(),
              delete_by: "User",
            },
            dev_status: "UPDATE",
            cancel: false,
          });
        }
        setShowControl(false);
        break;
      case "PRESS_CANCEL": {
        if (data?.dev_status == "ADD_NEW") {
          if (onValueChange) {
            onValueChange({
              newData: InputMaster,
              dev_status: "ADD_NEW",
              cancel: true,
            });
            setShowControl(false);
          }
        } else {
          SetInputMaster({ ...data, is_edit: false });
          setShowControl(false);
        }
        break;
      }
      case "PRESS_SAVE": {
        if (onValueChange) {
          onValueChange({
            newData: {
              ...InputMaster,
              is_edit: false,
              is_deleted: false,
              delete_at: new Date(),
              delete_by: "User",
            },
            dev_status: "UPDATE",
            cancel: false,
          });
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <TouchableWithoutFeedback onPressOut={() => setShowControl(false)}>
      <TouchableNativeFeedback
        onLongPress={() => setShowControl(!InputMaster.is_edit)}
      >
        <ThemedView style={styles.container}>
          {!InputMaster.is_edit && (
            <ThemedView style={styles.content}>
              <ThemedText style={styles.title}>
                {title}{" "}
                {PhonicTranscriptionComponent({ phonicTranscription } as Prop)}
              </ThemedText>
              <ThemedText style={styles.subtitle}>{subTitle}</ThemedText>
            </ThemedView>
          )}
          {showPControl && (
            <ThemedView style={styles.actionBlock}>
              <TouchableOpacity onPress={() => onAction({ code: "edit" })}>
                <ThemedText style={styles.action} type="defaultSemiBold">
                  Edit
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onAction({ code: "delete" })}>
                <ThemedText style={styles.action} type="defaultSemiBold">
                  Delete
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
          {InputMaster.is_edit && (
            <ThemedView style={styles.content}>
              <ThemedView
                style={{
                  marginBottom: 8,
                }}
              >
                <ThemedText>Word</ThemedText>
                <TextInput
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 5,
                    borderRadius: 5,
                    borderColor: "#E8E8E8",
                    color: '#333'
                  }}
                  value={InputMaster.name}
                  onChangeText={(text) =>
                    SetInputMaster({ ...InputMaster, name: text })
                  }
                ></TextInput>
              </ThemedView>
              <ThemedView style={{ marginBottom: 8 }}>
                <ThemedText>Phonics Traction</ThemedText>
                <TextInput
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 5,
                    borderRadius: 5,
                    borderColor: "#E8E8E8",
                    color: '#333'
                  }}
                  value={InputMaster.phonicsTractions}
                  onChangeText={(text) =>
                    SetInputMaster({ ...InputMaster, phonicsTractions: text })
                  }
                ></TextInput>
              </ThemedView>
              <ThemedView style={{ marginBottom: 8 }}>
                <ThemedText>Description</ThemedText>
                <TextInput
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 5,
                    borderRadius: 5,
                    borderColor: "#E8E8E8",
                    color: '#333'
                  }}
                  value={InputMaster.description}
                  onChangeText={(text) =>
                    SetInputMaster({ ...InputMaster, description: text })
                  }
                ></TextInput>
              </ThemedView>
              <ThemedView
                style={{
                  marginBottom: 8,
                  gap: 8,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  title="Save"
                  onPress={() => onAction({ code: "PRESS_SAVE" })}
                />
                <Button
                  title="Cancel"
                  onPress={() => onAction({ code: "PRESS_CANCEL" })}
                />
              </ThemedView>
            </ThemedView>
          )}
        </ThemedView>
      </TouchableNativeFeedback>
    </TouchableWithoutFeedback>
  );
};

export default VocabularyItem;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: 10,
    padding: 10,
    width: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Shadow property for Android
    elevation: 3,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 8,
  },
  content: {
    paddingLeft: 10,
    width: "100%",

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
  phonicTranscription: {
    fontStyle: "italic",
    fontSize: 11,
    color: "gray",
  },
  actionBlock: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 80,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Shadow property for Android
    elevation: 3,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 8,
    backgroundColor: "white",
    transform: [{ translateY: -20 }],
  },
  action: {
    fontSize: 14,
    fontWeight: "regular",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

const PhonicTranscriptionComponent = ({ phonicTranscription }: Prop) => {
  return (
    <ThemedText style={styles.phonicTranscription}>
      {phonicTranscription && "/"}
      {phonicTranscription}
      {phonicTranscription && "/"}
    </ThemedText>
  );
};
