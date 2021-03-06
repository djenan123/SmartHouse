import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Button,
  View,
  SafeAreaView,
  Text,
} from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Table, Row } from "react-native-table-component";
import { ScrollView } from "react-native-gesture-handler";

const Temperature = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    celAvgTemperature: 0,
    fahAvgTemperature: 0,
    temperatures: [],
  };
  const [temperature, setTemperatureInfo] = useState(initialState);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showTemp, setShowTemp] = useState(false);
  const [tableHead, setTableHead] = useState(["Celsius (°C)", "Fahrenheit (°F)", "Hour"]);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
    axios
      .get(
        "https://smarthouseapi20210508183300.azurewebsites.net/api/temperatures/filter/" +
          selectedDate.toDateString()
      )
      .then((response) => {
        setTemperatureInfo(response.data);
        setShowTemp(true);
      })
      .catch((error) => {
        setTemperatureInfo(initialState);
        setShowTemp(false);
      });
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isLoading && <ActivityIndicator size="large" color="green" />}
        <View style={styles.formContainer}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              is24Hour={false}
              display="default"
              onChange={onChange}
            />
          )}
          {showTemp ? (
            <>
              <Text textStyle={styles.text} style={{marginBottom: 10}}>
                Average temperature celsius:{" "}
                {temperature.celAvgTemperature.toFixed(2)}°C
              </Text>
              <Text textStyle={styles.text}>
                Average temperature fahrenheit:{" "}
                {temperature.fahAvgTemperature.toFixed(2)}°F
              </Text>
            <ScrollView style={styles.averageTempContainer}>
              <Table borderStyle={{ borderWidth: 1 }} style={{ marginTop: 20}}>
                <Row
                  data={tableHead}
                  style={styles.head}
                  textStyle={styles.text}
                />
                {temperature.temperatures.map((x) => (
                  <Row
                    textStyle={styles.text}
                    key={x.id}
                    data={[
                      x.temperatureCelsius,
                      x.temperatureFahrenheit,
                      new Date(x.dateAdded).getHours(),
                    ]}
                  ></Row>
                ))}
              </Table>
            </ScrollView>
            </>
          ) : (
            <View>
              <Text>There is no data to show!</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Button
            style={styles.buttonText}
            onPress={showDatepicker}
            title="Show date picker!"
          >
            Show picker
          </Button>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Temperature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  formContainer: {
    marginBottom: 30,
    alignItems: "center",
    marginTop: 20,
    flex: 9,
  },
  buttonContainer: {
    marginBottom: 20,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  averageTempContainer: {
    marginBottom: 40,
    fontSize: 20,
    width: "85%"
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center" },
});
