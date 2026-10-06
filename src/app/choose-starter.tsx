import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const ChooseStarterScreen = () => {
  const [selectedStarter, setSelectedStarter] = useState<string | null>(null);

  const starters = [
    {
      id: 'owl',
      title: 'Owl Scholar',
      subtitle: '+10% XP in Reading',
      // Using a placeholder require. Replace with actual filenames once placed in assets/images/
      image: require('../../assets/images/owl-scholar.png'),
    },
    {
      id: 'cat',
      title: 'Ninja Cat',
      subtitle: '+15s Speaking Timer',
      image: require('../../assets/images/ninja-cat.png'),
    },
    {
      id: 'fox',
      title: 'Robo Fox',
      subtitle: '1 Extra Life per day',
      image: require('../../assets/images/robo-fox.png'),
    },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/bg-night.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
          
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Choose your{'\n'}Starter</Text>
            <Text style={styles.subtitle}>Set your goal, you can change it later.</Text>
          </View>

          <View style={styles.optionsContainer}>
            {starters.map((starter) => {
              const isSelected = selectedStarter === starter.id;
              return (
                <TouchableOpacity 
                  key={starter.id} 
                  style={[styles.card, isSelected && styles.cardSelected]}
                  onPress={() => setSelectedStarter(starter.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.imageContainer}>
                    <Image source={starter.image} style={styles.cardImage} resizeMode="contain" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{starter.title}</Text>
                    <Text style={styles.cardSubtitle}>{starter.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>

          <View style={styles.footerContainer}>
            <Link href="/" asChild>
              <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#95A4FC', // Light blue/purple color
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
    height: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#A9B5FF', // Slightly brighter when selected
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 80, // Offset for the image width to keep text centered visually
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#E0E7FF', // Slightly muted white/blue
    fontWeight: '500',
  },
  footerContainer: {
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#95A4FC',
    paddingVertical: 18,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default ChooseStarterScreen;
