import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking,Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHtml from 'react-native-render-html';

const NewsDetailScreen = ({ route }) => {
  const { newsItem } = route.params;
  const contentWidth = Dimensions.get('window').width;
  console.log(contentWidth)
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
          <Text style={styles.votes}>           👍 {newsItem.descendants}</Text>
        )}
      </Text>
      <ScrollView horizontal={true}>
      <Text style={styles.text}>
        <RenderHtml
          contentWidth={contentWidth}
          
          source={{ html: newsItem.text || "<p>No content available.</p>" }}
        />
      </Text>
      </ScrollView>
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
    padding: 13,
    backgroundColor: '#ffffff',
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
  text: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 15,
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
  bigLetter: {
    fontSize: 30,
    fontWeight: 'bold', 
  },
  content: {
    fontSize: 16,
    color: 'blue', 
    textDecorationLine: 'underline', 
    marginBottom: 40,
  },
});

export default NewsDetailScreen;
