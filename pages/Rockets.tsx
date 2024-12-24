import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

interface Rocket {
  id: string;
  name: string;
  links: {
    patch: {
      small: string;
    };
  };
  success: boolean;
  details: string;
}

export default function RocketsList() {
  const route = useRoute<RouteProp<{ Rockets: { username: string } }, 'Rockets'>>();
  const { username } = route.params || { username: 'Guest' }; // Fallback

  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRockets = async () => {
    try {
      const response = await fetch('https://api.spacexdata.com/v4/launches');
      const data = await response.json();
      setRockets(data);
    } catch (error) {
      console.error('Error fetching rockets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRockets();
  }, []);

  const renderRocketCard = ({ item }: { item: Rocket }) => (
    <View style={styles.card}>
      {item.links?.patch?.small ? (
        <Image source={{ uri: item.links.patch.small }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text>No Image Available</Text>
        </View>
      )}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.status}>
        Status: {item.success ? 'Success' : 'Failed'}
      </Text>
      <Text style={styles.description}>{item.details || 'No description.'}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5667FD" />
        <Text>Loading Rockets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={require('../assets/spaceShipBg.png')}
          style={styles.bannerImage}
        />
        <Text style={styles.bannerText}>Welcome, {username} 👋</Text>
        <Text style={styles.bannerSubText}>Let's Explore the Universe...</Text>
      </View>
      <FlatList
        data={rockets}
        renderItem={renderRocketCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  banner: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerText: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bannerSubText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 16,
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  noImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: 'green',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
