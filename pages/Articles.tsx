import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Linking } from 'react-native';
import { ClickCountProvider, useClickCount } from '../pages/ClickCountContext';

interface ContentItem {
  title: string;
  snippet: string;
  status: string;
  imageUrl: string;
  pageId: number;
}

const Home = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { incrementCount } = useClickCount(); // Get the increment function from context

  const fetchData = async () => {
    try {
      const topics = ['Mathematics', 'Science', 'History', 'Physics', 'Chemistry'];
      const allData: ContentItem[] = [];

      for (const topic of topics) {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${topic}&format=json&origin=*&prop=pageimages&pilimit=5&pithumbsize=300`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const topicData = await Promise.all(
          data.query.search.map(async (item: any) => {
            const pageDetailsResponse = await fetch(
              `https://en.wikipedia.org/w/api.php?action=query&pageids=${item.pageid}&prop=pageimages&format=json&origin=*&pithumbsize=300`
            );

            const pageDetailsData = await pageDetailsResponse.json();
            const pageDetails = pageDetailsData.query.pages[item.pageid];

            // Only return items with a valid image
            if (pageDetails?.thumbnail?.source) {
              return {
                title: item.title,
                snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ''), // Remove HTML tags
                status: getStatusForTopic(topic),
                imageUrl: pageDetails.thumbnail.source,
                pageId: item.pageid,
              };
            }
            return null; // Skip items without images
          })
        );

        // Filter out null values (i.e., items without images)
        allData.push(...topicData.filter((item) => item !== null));
      }

      setContent(allData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load content. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusForTopic = (topic: string): string => {
    const statusMap: { [key: string]: string } = {
      Mathematics: 'Trending',
      Science: 'New',
      History: 'Popular',
      Physics: 'Featured',
      Chemistry: 'Recommended',
    };
    return statusMap[topic] || 'New';
  };

  const handleLearnMore = (item: ContentItem) => {
    const articleUrl = `https://en.wikipedia.org/?curid=${item.pageId}`;
    Linking.canOpenURL(articleUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(articleUrl);
        } else {
          Alert.alert('Error', 'Unable to open the article URL.');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: ContentItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.status}>{item.status}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {item.snippet}
      </Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleLearnMore(item);
          }}
        >
          <Text style={styles.buttonText}>Continue Reading</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.countButton}
          onPress={incrementCount}
        >
          <Text style={styles.countButtonText}>Count</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#CCD1FE" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchData} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={content}
        renderItem={renderItem}
        keyExtractor={(item) => item.pageId.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

// Floating Button Component
const FloatingButton: React.FC = () => {
  const { clickCount } = useClickCount();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={[styles.buttonText, { fontSize: 40 }]}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  status: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#5667FD',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
  countButton: {
    borderWidth: 1,
    borderColor: '#5667FD',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  countButtonText: {
    fontSize: 14,
    color: '#5667FD',
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#CCD1FE',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    right: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: '#263238',
    width: 80,
    height: 80,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default () => (
  <ClickCountProvider>
    <Home />
    <FloatingButton />
  </ClickCountProvider>
);
