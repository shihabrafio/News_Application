import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const NewsDetailScreen = ({ route }) => {
  const { newsItem } = route.params;

  const handlePress = () => {
    Linking.openURL(newsItem.url);
  };

  return (
    <ScrollView style={styles.container}>
  {newsItem.image ? (
  <Image
    source={{ uri: newsItem.image }}
    style={styles.image}
    resizeMode="cover"
  />
) : (
  <Image
    source={require('../assets/news_image.jpeg')}
    style={styles.image}
    resizeMode="cover"
  />
)}

      <Text style={styles.time}> {new Date(newsItem.time * 1000).toLocaleString()}</Text>
      <Text style={styles.title}>{newsItem.title}</Text>
      <Text style={styles.authorRow}>
        <Text style={styles.author}>⚫ {newsItem.by}</Text>
        
        {newsItem.descendants && (
          <Text style={styles.votes}>👍 {newsItem.descendants}</Text>
        )}
      </Text>
      <Text style={styles.author}>{newsItem.text}</Text>
      {newsItem.url && (
        <>
        <Text style={styles.author}>To know more about it</Text>
        <Text style={styles.time}>Click the link below</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.content}>{newsItem.url}</Text>
        </TouchableOpacity></>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  authorRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'sans-serif',
    fontWeight: 'semibold',
  },
  votes: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'sans-serif',
    fontWeight: 'semibold',
  },
  time: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'sans-serif',
    fontWeight: 'semibold',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: 'blue', 
    textDecorationLine: 'underline', 
  },
});

export default NewsDetailScreen;
