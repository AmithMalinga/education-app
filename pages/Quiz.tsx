import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface Trivia {
  id: string;
  question: string;
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  imageUrl: string;
}

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
};

export default function TriviaList() {
  const [triviaData, setTriviaData] = useState<Trivia[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>('');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      if (data.trivia_categories) {
        const allowedCategories = [
          "General Knowledge", "Science & Nature", "Science: Mathematics", "Science: Computers",
          "Sports", "Geography", "History", "Politics", "Art", "Animals"
        ];
  
        const filteredCategories = data.trivia_categories.filter((category: { name: string }) =>
          allowedCategories.includes(category.name)
        );
  
        filteredCategories.push({ id: 0, name: "Random" });
  
        setCategories(filteredCategories);
      }
    } catch (error) {
      setError('Error fetching categories.');
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTriviaData = async (pageNumber: number, selectedCategory: string) => {
    try {
      let url = `https://opentdb.com/api.php?amount=10&page=${pageNumber}&type=multiple`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      const response = await fetch(url);
      const data = await response.json();

      if (data.response_code === 0 && Array.isArray(data.results)) {
        const newTrivia = data.results.map((item: any) => ({
          id: `${item.question}-${item.correct_answer}`,
          question: item.question,
          category: item.category,
          correct_answer: item.correct_answer,
          incorrect_answers: item.incorrect_answers,
          imageUrl: `https://picsum.photos/200/300?random=${pageNumber}`,
        }));
        setTriviaData((prevData) => [...prevData, ...newTrivia]);
      } else if (data.response_code === 5) {
        setError("There was a problem fetching trivia questions. Please try again later.");
      } else if (data.response_code === 2) {
        setError("No trivia questions found.");
      } else {
        setError("Unknown error occurred.");
      }
    } catch (error) {
      setError('Error fetching trivia data.');
      console.error('Error fetching trivia data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setTriviaData([]);
    setLoading(true);
    fetchTriviaData(page, category);
  }, [category, page]);

  const loadMoreData = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  const renderTriviaCard = ({ item }: { item: Trivia }) => {
    const allAnswers = [item.correct_answer, ...item.incorrect_answers];
    shuffleArray(allAnswers);

    const answerLabels = ['a', 'b', 'c', 'd'];

    return (
      <ImageBackground
        source={require('../assets/QABackground.png')} // Path to your background image
        style={styles.cardBackground}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{item.question}</Text>
          <Text style={styles.status}>Category: {item.category}</Text>

          {allAnswers.map((answer, index) => (
            <Text key={index} style={styles.description}>
              {answerLabels[index]}) {answer}
            </Text>
          ))}

          <Text style={styles.correctAnswer}>
            Correct Answer: {item.correct_answer}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  if (loading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5667FD" />
        <Text>Loading Trivia...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/QABackground.png')} // Path to your background image
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Welcome to Q&A!</Text>
          <Text style={styles.bannerSubText}>Let's Test Your Knowledge...</Text>
        </View>

        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categories.map((cat) => ({
              label: cat.name,
              value: cat.id.toString(),
            }))}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a category", value: "" }}
          />
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={triviaData}
            renderItem={renderTriviaCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  banner: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  bannerText: {
    position: 'absolute',
    bottom: -20,
    left: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
  },
  bannerSubText: {
    position: 'absolute',
    bottom: -20,
    left: 20,
    fontSize: 12,
    color: 'black',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingLeft: 10,
    paddingTop: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
  },
  cardBackground: {
    flex: 1,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#5667FD',
    marginBottom: 4,
  },
  description: {
    fontSize: 18,
    color: '#555',
  },
  correctAnswer: {
    fontSize: 14,
    color: 'green',
    marginBottom: 4,
  },
  dropdownContainer: {
    marginTop: 30,
    // backgroundColor: 'rgba(0, 0, 0,0.6)',
    // color: 'white',
    // borderRadius: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    color: 'white',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 12,
  },
  inputAndroid: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    color: 'white',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 12,
  },
});
