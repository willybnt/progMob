import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'd6473e19cd9fa7dacff36543c6541727';

  const fetchWeather = async () => {
    if (!latitude || !longitude) {
      Alert.alert('Erro', 'Por favor, insira latitude e longitude.');
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os dados do clima.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima Atual</Text>
      <TextInput
        style={styles.input}
        placeholder="Informe a Latitude"
        placeholderTextColor="#aaa"
        value={latitude}
        onChangeText={setLatitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Informe a Longitude"
        placeholderTextColor="#aaa"
        value={longitude}
        onChangeText={setLongitude}
      />
      <Button title="Buscar Clima" onPress={fetchWeather} />
      {weatherData && (
        <View style={styles.weatherInfo}>
          <Text style={styles.infoText}>
            Temperatura: {weatherData.main.temp}°C
          </Text>
          <Text style={styles.infoText}>
            Umidade: {weatherData.main.humidity}%
          </Text>
          <Text style={styles.infoText}>
            Clima: {weatherData.weather[0].description}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
});
