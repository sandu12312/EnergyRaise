import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

interface WelcomeQuizProps {
  onComplete: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  answers: {
    text: string;
    emotion: string;
    icon: string;
  }[];
}

const welcomeQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Cum te simți în general în ultima săptămână?',
    answers: [
      { text: 'Foarte bine, plin de energie', emotion: 'happy', icon: '😊' },
      { text: 'Normal, ca de obicei', emotion: 'neutral', icon: '😐' },
      { text: 'Puțin stresat/anxios', emotion: 'anxious', icon: '😰' },
      { text: 'Trist sau deprimat', emotion: 'sad', icon: '😢' },
    ],
  },
  {
    id: 2,
    question: 'Ce te preocupă cel mai mult în acest moment?',
    answers: [
      { text: 'Stresul de la muncă', emotion: 'stressed', icon: '💼' },
      { text: 'Relațiile cu apropiații', emotion: 'worried', icon: '❤️' },
      { text: 'Sănătatea mea', emotion: 'anxious', icon: '🏥' },
      { text: 'Nimic în particular', emotion: 'calm', icon: '⭐' },
    ],
  },
  {
    id: 3,
    question: 'Cum îți petreci timpul liber de obicei?',
    answers: [
      {
        text: 'Activități relaxante (lectură, meditație)',
        emotion: 'calm',
        icon: '📚',
      },
      { text: 'Sport și activități fizice', emotion: 'energetic', icon: '🏃' },
      { text: 'Cu prietenii și familia', emotion: 'happy', icon: '👥' },
      {
        text: 'Îmi place să stau singur/ă',
        emotion: 'contemplative',
        icon: '🤔',
      },
    ],
  },
  {
    id: 4,
    question: 'Ce te-ar ajuta cel mai mult să te simți mai bine?',
    answers: [
      {
        text: 'Remedii naturale și ceaiuri',
        emotion: 'seeking-calm',
        icon: '🌿',
      },
      {
        text: 'Mai mult timp pentru mine',
        emotion: 'seeking-peace',
        icon: '🧘',
      },
      { text: 'Suport emoțional', emotion: 'seeking-support', icon: '🤝' },
      { text: 'Energie și motivație', emotion: 'seeking-energy', icon: '⚡' },
    ],
  },
];

export const WelcomeQuizScreen: React.FC<WelcomeQuizProps> = ({
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (emotion: string, answerIndex: number) => {
    setSelectedAnswer(answerIndex);

    // Add a small delay to show the green border effect
    setTimeout(() => {
      const newAnswers = [...answers, emotion];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < welcomeQuizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsCompleted(true);
      }
    }, 300);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const progress = ((currentQuestion + 1) / welcomeQuizQuestions.length) * 100;
  const question = welcomeQuizQuestions[currentQuestion];

  // Perfect dark mode - exactly matching the provided images
  const theme = {
    // Dark background exactly like images - pure dark gray/black
    gradientStart: isDarkMode ? '#1a1a1a' : '#f8fafc',
    gradientMid: isDarkMode ? '#1e1e1e' : '#f1f5f9',
    gradientEnd: isDarkMode ? '#222222' : '#e2e8f0',

    // Cards - dark gray like in images
    cardBackground: isDarkMode ? '#2a2a2a' : 'rgba(255, 255, 255, 0.95)',
    cardBorder: isDarkMode
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(139, 157, 195, 0.12)',

    // Text colors - pure white like in images
    textPrimary: isDarkMode ? '#ffffff' : '#1a202c',
    textSecondary: isDarkMode ? '#ffffff' : '#4a5568',
    textMuted: isDarkMode ? '#b0b0b0' : '#64748b',

    // Mint green accents exactly like images
    primary: isDarkMode ? '#9cb59c' : '#7c9885',
    primaryDark: isDarkMode ? '#7a9f7a' : '#65785c',
    primaryLight: isDarkMode ? '#b8c9b8' : '#8faa92',

    // Buttons with mint green like images
    buttonBackground: isDarkMode ? '#9cb59c' : '#7c9885',
    buttonHover: isDarkMode ? '#7a9f7a' : '#6d8774',

    // Very subtle borders like in images
    border: isDarkMode
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(139, 157, 195, 0.15)',
    borderActive: isDarkMode ? '#9cb59c' : '#7c9885',
    borderHover: isDarkMode ? '#b8c9b8' : '#8faa92',

    // Background elements matching images
    iconBackground: isDarkMode
      ? 'rgba(156, 181, 156, 0.1)'
      : 'rgba(124, 152, 133, 0.1)',
    benefitsBackground: isDarkMode ? '#333333' : 'rgba(124, 152, 133, 0.05)',
    benefitsBorder: isDarkMode
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(124, 152, 133, 0.1)',

    // Theme toggle like in images
    themeToggleBackground: isDarkMode ? '#333333' : 'rgba(255, 255, 255, 0.9)',
    themeToggleBorder: isDarkMode
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(124, 152, 133, 0.15)',
  };

  if (isCompleted) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.gradientStart }]}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />

        {/* Aurora gradient background */}
        <View
          style={[
            styles.gradientBackground,
            {
              backgroundColor: theme.gradientStart,
            },
          ]}
        />

        {/* Minimal Theme Toggle */}
        <TouchableOpacity
          style={[
            styles.themeToggle,
            {
              backgroundColor: theme.themeToggleBackground,
              borderColor: theme.themeToggleBorder,
            },
          ]}
          onPress={toggleTheme}
        >
          <Text style={[styles.themeIcon, { color: theme.textMuted }]}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
            }}
          >
            <CardContent>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.iconBackground },
                ]}
              >
                <Text style={[styles.leafIcon, { color: theme.primary }]}>
                  🌿
                </Text>
              </View>

              <Text style={[styles.title, { color: theme.primary }]}>
                Quiz Completat!
              </Text>

              <Text
                style={[styles.description, { color: theme.textSecondary }]}
              >
                Mulțumesc pentru răspunsuri! Pentru recomandări personalizate,
                te rugăm să te autentifici.
              </Text>

              <View
                style={[
                  styles.benefitsContainer,
                  {
                    backgroundColor: theme.benefitsBackground,
                    borderColor: theme.benefitsBorder,
                  },
                ]}
              >
                <Text
                  style={[styles.benefitsText, { color: theme.textPrimary }]}
                >
                  🌿 Ceaiuri terapeutice{'\n'}
                  🌸 Tincturi naturale{'\n'}
                  🌱 Uleiuri esențiale{'\n'}
                  💊 Suplimente naturale
                </Text>
              </View>

              <Button
                title="Continuă către Login"
                onPress={onComplete}
                style={StyleSheet.flatten([
                  styles.continueButton,
                  { backgroundColor: theme.buttonBackground },
                ])}
                isDarkMode={isDarkMode}
              />
            </CardContent>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.gradientStart }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Aurora gradient background */}
      <View
        style={[
          styles.gradientBackground,
          {
            backgroundColor: theme.gradientStart,
          },
        ]}
      />

      {/* Minimal Theme Toggle */}
      <TouchableOpacity
        style={[
          styles.themeToggle,
          {
            backgroundColor: theme.themeToggleBackground,
            borderColor: theme.themeToggleBorder,
          },
        ]}
        onPress={toggleTheme}
      >
        <Text style={[styles.themeIcon, { color: theme.textMuted }]}>
          {isDarkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <CardContent>
            {/* Header - Minimal */}
            <View style={styles.header}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.iconBackground },
                ]}
              >
                <Text style={[styles.leafIcon, { color: theme.primary }]}>
                  🌿
                </Text>
              </View>
              <Text style={[styles.title, { color: theme.primary }]}>
                Bun venit la EmoBalance
              </Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Descoperă remediile naturale potrivite pentru tine
              </Text>
            </View>

            {/* Progress - Compact */}
            <View style={styles.progressSection}>
              <View style={styles.progressInfo}>
                <Text style={[styles.progressText, { color: theme.textMuted }]}>
                  Întrebarea {currentQuestion + 1} din{' '}
                  {welcomeQuizQuestions.length}
                </Text>
                <Text
                  style={[styles.progressPercent, { color: theme.primary }]}
                >
                  {Math.round(progress)}%
                </Text>
              </View>
              <ProgressBar
                progress={progress}
                progressColor={theme.primary}
                backgroundColor={theme.border}
              />
            </View>

            {/* Question - Compact */}
            <View style={styles.questionSection}>
              <Text style={[styles.questionText, { color: theme.textPrimary }]}>
                {question.question}
              </Text>

              <View style={styles.answersContainer}>
                {question.answers.map((answer, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.answerButton,
                      {
                        borderColor:
                          selectedAnswer === index
                            ? theme.borderActive
                            : theme.border,
                        borderWidth: selectedAnswer === index ? 2 : 1,
                        backgroundColor:
                          selectedAnswer === index
                            ? isDarkMode
                              ? 'rgba(156, 181, 156, 0.08)'
                              : 'rgba(124, 152, 133, 0.06)'
                            : 'transparent',
                      },
                    ]}
                    onPress={() => handleAnswerSelect(answer.emotion, index)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.answerIcon, { color: theme.primary }]}>
                      {answer.icon}
                    </Text>
                    <Text
                      style={[styles.answerText, { color: theme.textPrimary }]}
                    >
                      {answer.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Footer - Minimal */}
            <Text style={[styles.footerText, { color: theme.textMuted }]}>
              Răspunsurile tale ne vor ajuta să îți oferim recomandări
              personalizate
            </Text>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  themeToggle: {
    position: 'absolute',
    top: 55,
    right: 20,
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  themeIcon: {
    fontSize: 18,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  card: {
    maxWidth: 380,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  leafIcon: {
    fontSize: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: Platform.OS === 'ios' ? '200' : '300',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.1,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '600' : '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.1,
  },
  questionSection: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '300' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 20,
    letterSpacing: -0.4,
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  answerIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  answerText: {
    fontSize: 15,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    flex: 1,
    lineHeight: 20,
    letterSpacing: -0.1,
  },
  footerText: {
    fontSize: 13,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: -0.05,
    opacity: 0.8,
  },
  description: {
    fontSize: 15,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    letterSpacing: -0.1,
  },
  benefitsContainer: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
  },
  benefitsText: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.1,
  },
  continueButton: {
    paddingVertical: 14,
    borderRadius: 14,
  },
});
