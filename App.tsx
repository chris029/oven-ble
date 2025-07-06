import React, { useState } from "react";
import * as Haptics from "expo-haptics";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeviceModal from "./DeviceConnectionModal";
// import { PulseIndicator } from "./PulseIndicator";
import useBLE from "./useBLE";

const App = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    currentProgram,
    goToProgram,
    sendOvenMessage,
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  const onShortPressCallback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    let message = "shortPenis";
    sendOvenMessage(message);
  };

  const onLongPressCallback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let message = "longPenis";
    sendOvenMessage(message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ovenInfo}>
        <Text style={styles.ovenInfoText}>GO TO:</Text>
        <Text style={styles.ovenInfoText}>{goToProgram}</Text>
        <Text style={styles.ovenInfoText}>CURRENT:</Text>
        <Text style={styles.ovenInfoText}>{currentProgram}</Text>
      </View>
      <Pressable
        style={styles.mainButton}
        delayLongPress={1000}
        onPress={onShortPressCallback}
        onLongPress={onLongPressCallback}
      ></Pressable>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.connectionButton}
      >
        <Text style={styles.connectionButtonText}>
          {connectedDevice ? "DISCONNECT" : "CONNECT"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F3EF",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ovenInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  ovenInfoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1B3C53",
    marginTop: 10,
  },
  connectionButton: {
    backgroundColor: "#D2C1B6",
    justifyContent: "center",
    alignItems: "center",
    height: "7%",
    width: "75%",
    borderWidth: 3,
    borderRadius: 8,
    borderColor: "#1B3C53",
  },
  connectionButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B3C53",
  },
  mainButton: {
    height: "9%",
    width: "20%",
    borderWidth: 3,
    borderRadius: "50%",
    backgroundColor: "#D2C1B6",
    borderColor: "#1B3C53",
  },
});

export default App;
