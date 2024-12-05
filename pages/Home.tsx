import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Home = ({
  route,
  navigation,
}: {
  route: { params: { username: string } };
  navigation: any;
}) => {
  const username = route?.params?.username || 'User';

  const navigateTo = (page: string) => {
    navigation.navigate(page); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Banner */}
      <View style={styles.banner}>
        <Image
          source={require('../assets/HomeBg1.png')}
          style={styles.bannerImage}
        />
      </View>

      {/* Welcome Notice */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, {username}!</Text>
        <Text style={styles.tagline}>Discover. Explore. Learn.</Text>
      </View>

      {/* Navigation Banners */}
      <View style={styles.navBannerContainer}>
        <TouchableOpacity
          style={styles.navBanner}
          onPress={() => navigateTo('Articles')}
        >
          <Image
            source={require('../assets/ArticleBanner.png')}
            style={styles.navImage}
          />
          <Text style={styles.navText}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBanner}
          onPress={() => navigateTo('Rockets')}
        >
          <Image
            source={require('../assets/SpaceShipsBg.png')}
            style={styles.navImage}
          />
          <Text style={styles.navText}>Spaceships</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBanner}
          onPress={() => navigateTo('Quiz')}
        >
          <Image
            source={require('../assets/QuizBg.png')}
            style={styles.navImage}
          />
          <Text style={styles.navText}>Q&A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBanner}>
          <Image
            source={require('../assets/PhycologyBg.png')}
            style={styles.navImage}
          />
          <Text style={styles.navText}>Phycology</Text>
          <Text style={styles.upcomingLabel}>(Coming Soon...)</Text>
        </TouchableOpacity>
      </View>

      {/* Developer Details */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Developed with ❤️ by Amith Malinga (Index No.:214130R)
        </Text>
        <Text style={styles.footerSubText}>
          Contact: malingaamith1@gmail.com | +94 70 21 33 691
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  banner: {
    width: '100%',
    height: 220,
    marginBottom: 0,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',

  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    marginBottom: 20,

  },
  navBannerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  navBanner: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    alignItems: 'center',
  },
  navImage: {
    width: '100%',
    height: 100,
  },
  navText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
  },
  upcomingLabel: {
    fontSize: 12,
    color: '#FF4500',
    fontWeight: 'bold',
    marginTop: -12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  footerSubText: {
    fontSize: 12,
    color: '#666',
  },
});

export default Home;
