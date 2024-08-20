import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ImageBackground,Image, ScrollView } from 'react-native';

const request = async (callback) => {
  const response = await fetch('https://dragonball-api.com/api/characters');
  const parsed = await response.json();
  callback(parsed.items);
};

export default function App() {

  // useState Verificar o Estado do Componente  
  const [registros, setRegistros] = useState([]);


  // trabalha em conjunto com o Use state renderizando algo especifico
  useEffect(() => {
    request(setRegistros);
  }, []);


  const image = { uri: 'https://img.elo7.com.br/product/original/40F9597/papel-de-parede-esferas-do-dragao-dragon-ball-adesivo-papel-de-parede-esferas-do-dragao.jpg' };
  return (

    <View style={styles.container}>
        <View style={styles.viewText}>
          <Text style={styles.text}>Dragon Ball</Text>
        </View>

        <ScrollView style={styles.scroll}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <FlatList
            data={registros}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) =>
              <View style={styles.dados}>
                <Image source={{ uri: item.image }} style={styles.imageDBZ}/>
                <Text style={styles.dadosText}>{item.name}</Text>
              </View>
            }
          />

          <StatusBar style="auto" />
      </ImageBackground>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"auto",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll:{
    width:'100%',
  },

  image: {
    width:'100%',
    height:'100%',
    paddingBottom:40,
    paddingTop:40,
    zIndex:-1,
  },

  imageDBZ: {
    width:190,
    display:'flex',
    left:'33%',
    height:490,
    marginTop:50,
    paddingBottom:0,
    paddingTop:0,

  },

  dados: {
    
  },

  dadosText: {
    marginTop:8,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color:'rgb(255,255,255)',
    textShadowColor: 'black 0.1em 0.1em 0.2em',
  },

  text: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize:18
  },

  viewText: {
    backgroundColor: 'rgba(0,0,0,5)',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    top: 23,
    zIndex: 1,
  }
});