import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const NewsDetailScreen = ({ route }) => {
  const { newsItem } = route.params;

  const handlePress = () => {
    Linking.openURL(newsItem.url);
  };

  return (
    <View style={styles.container}>
      {newsItem.image && (
        <Image
          source={{ uri: newsItem.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Text style={styles.title}>{newsItem.title}</Text>
      <Text style={styles.author}>Author: {newsItem.by}</Text>
      <Text style={styles.author}>Votes: {newsItem.descendants}</Text>
      <Text style={styles.time}>Published Time: {new Date(newsItem.time * 1000).toLocaleString()}</Text>
      <Text style={styles.author}>{newsItem.text}</Text>
        <Text style={styles.author}>To know more about it</Text>
        <Text style={styles.time}>Click the link below</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.content}>{newsItem.url}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    marginBottom: 10,
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
