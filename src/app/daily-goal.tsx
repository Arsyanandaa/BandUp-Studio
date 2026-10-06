import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const DailyGoalScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/bg-night.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
          
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Daily Study Goal</Text>
            <Text style={styles.subtitle}>How much time can you spend today?</Text>
          </View>

          <View style={styles.optionsContainer}>
            {['5 min', '10 min', '20 min', '30 min'].map((time, index) => (
              <TouchableOpacity key={index} style={styles.optionButton}>
                <Text style={styles.optionText}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footerContainer}>
            <Link href="/choose-starter" asChild>
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
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: '#95A4FC', // Light blue/purple color
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 20, // Add bottom margin for the next button
  },
  nextButton: {
    backgroundColor: '#95A4FC',
    paddingVertical: 16,
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

export default DailyGoalScreen;
