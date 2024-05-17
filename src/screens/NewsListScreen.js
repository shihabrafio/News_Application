import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const NewsListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [topNews, setTopNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topNewsResponse = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const latestNewsResponse = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
        
        const topNewsIds = topNewsResponse.data.slice(0, 20);
        const latestNewsIds = latestNewsResponse.data.slice(0, 20);

        const topNewsPromises = topNewsIds.map(id =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        );
        const latestNewsPromises = latestNewsIds.map(id =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        );

        const topNewsData = await Promise.all(topNewsPromises);
        const latestNewsData = await Promise.all(latestNewsPromises);

        setTopNews(topNewsData.map(item => item.data));
        setLatestNews(latestNewsData.map(item => item.data));
        setLoading(false);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToNewsDetail = (item) => {
    navigation.navigate('NewsDetailScreen', { newsItem: item });
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToNewsDetail(item)} style={styles.boxContainer}>
      <Text style={styles.category}>{item.title}</Text>
      <Text style={styles.author}>Author: {item.by}</Text>
      <Text style={styles.time}>Published: {new Date(item.time * 1000).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Top News</Text>
      <FlatList 
        data={topNews}
        renderItem={renderNewsItem}
        keyExtractor={item => item.id.toString()}
      />
      <Text style={styles.title}>Latest News</Text>
      <FlatList
        data={latestNews}
        renderItem={renderNewsItem}
        keyExtractor={item => item.id.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  flex: {
    display: 'flex',
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  author: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  time: {
    fontSize: 14,
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  boxContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsListScreen;
