import React, { FC, useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Device } from "react-native-ble-plx";

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

const DeviceModalListItem: FC<DeviceModalListItemProps> = (props) => {
  const { item, connectToPeripheral, closeModal } = props;

  const connectAndCloseModal = useCallback(() => {
    connectToPeripheral(item.item);
    closeModal();
  }, [closeModal, connectToPeripheral, item.item]);

  return (
    <TouchableOpacity
      onPress={connectAndCloseModal}
      style={modalStyle.ctaButton}
    >
      <Text style={modalStyle.buttonText}>{item.item.name}</Text>
    </TouchableOpacity>
  );
};

const DeviceModal: FC<DeviceModalProps> = (props) => {
  const { devices, visible, connectToPeripheral, closeModal } = props;

  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      );
    },
    [closeModal, connectToPeripheral]
  );

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <SafeAreaView style={modalStyle.modalArea}>
        <Text style={modalStyle.modalTitleText}>
          Tap on a device to connect
        </Text>
        <FlatList
          contentContainerStyle={modalStyle.modalFlatlistContiner}
          data={devices}
          renderItem={renderDeviceModalListItem}
        />
        <TouchableOpacity style={modalStyle.goBackButton} onPress={closeModal}>
          <Text style={modalStyle.buttonText}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  modalArea: {
    flex: 1,
    alignContent: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#F9F3EF",
  },
  modalTitleText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 20,
    textAlign: "center",
    color: "#1B3C53",
  },
  modalFlatlistContiner: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: "#F9F3EF",
  },
  ctaButton: {
    backgroundColor: "#D2C1B6",
    height: 50,
    width: "100%",
    borderWidth: 3,
    borderRadius: 8,
    borderColor: "#1B3C53",
    alignContent: "center",
    justifyContent: "center",
  },
  goBackButton: {
    backgroundColor: "#D2C1B6",
    height: "7%",
    width: "75%",
    borderWidth: 3,
    borderRadius: 8,
    borderColor: "#1B3C53",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1B3C53",
  },
});

export default DeviceModal;
