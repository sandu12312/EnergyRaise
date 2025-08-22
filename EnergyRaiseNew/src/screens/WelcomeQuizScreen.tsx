import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { quizService } from '../services/quizService';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useTheme } from '../hooks/useTheme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Simple SVG Icons - Always work!
const SvgIcon: React.FC<{ name: string; size: number; color: string }> = ({
  name,
  size,
  color,
}) => {
  const icons = {
    zap: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 8V4l8 8h-4v4l-8-8h4z" fill={color} />
        <Path d="M8 12l4-4v3h3l-4 4v-3H8z" fill={color} opacity="0.7" />
      </Svg>
    ),
    target: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="3" fill={color} />
        <Circle
          cx="12"
          cy="12"
          r="7"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <Circle
          cx="12"
          cy="12"
          r="11"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
      </Svg>
    ),
    star: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 17l-6.4 4.2L8 14l-6-4.8h7.6L12 2z"
          fill={color}
        />
        <Path
          d="M12 6l1.2 3.6H17l-3 2.4 1.2 3.6L12 13l-3.2 2.6L10 12l-3-2.4h3.8L12 6z"
          fill="white"
          opacity="0.3"
        />
      </Svg>
    ),
    leaf: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C18 2 22 6 22 12c0 3-1 6-3 8-1 1-2 2-4 2-3 0-5-2-5-5 0-2 1-4 3-5 1 0 2 0 3 1v-1c0-3-2-5-5-5-2 0-4 1-5 3C5 8 4 6 4 4c0-1 1-2 2-2h6z"
          fill={color}
        />
        <Path
          d="M12 8c2 0 4 1 5 3-1-1-2-1-3-1-2 1-3 3-3 5 0 2 1 4 3 4-1 1-2 1-3 1-2 0-4-1-5-3 1 1 2 1 3 1 2-1 3-3 3-5 0-2-1-4-3-4 1-1 2-1 3-1z"
          fill="white"
          opacity="0.2"
        />
      </Svg>
    ),
    brain: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 3C9 3 7 5 7 8c-2 0-4 2-4 4 0 3 2 5 4 6 1 3 4 3 5 3s4 0 5-3c2-1 4-3 4-6 0-2-2-4-4-4 0-3-2-5-5-5z"
          fill={color}
        />
        <Circle cx="10" cy="10" r="1" fill="white" />
        <Circle cx="14" cy="10" r="1" fill="white" />
        <Path
          d="M9 13c1 1 3 1 4 0"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <Path
          d="M8 16c2 1 4 1 6 0"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
      </Svg>
    ),
    heart: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          fill={color}
        />
      </Svg>
    ),
    moon: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          fill={color}
        />
      </Svg>
    ),
    sun: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="5" fill={color} />
        <Path
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    ),
    'check-circle': (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" fill={color} />
        <Path
          d="M9 12l2 2 4-4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ),
    'arrow-right': (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M5 12h14M12 5l7 7-7 7"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ),
    sparkles: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"
          fill={color}
        />
        <Path
          d="M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3zM9 21l.5 1.5L11 23l-1.5.5L9 25l-.5-1.5L7 23l1.5-.5L9 21z"
          fill={color}
        />
      </Svg>
    ),
    award: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle
          cx="12"
          cy="8"
          r="6"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ),
  };

  return icons[name as keyof typeof icons] || icons.star;
};

interface WelcomeQuizProps {
  onComplete: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  answers: {
    text: string;
    emotion: string;
    icon: string;
    description: string;
  }[];
}

interface FloatingParticleProps {
  delay: number;
  colors: string[];
}

const welcomeQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Cum îți petreci majoritatea zilelor?',
    subtitle: 'Să înțelegem mai bine stilul tău de viață',
    answers: [
      {
        text: 'Mult stress și presiune',
        emotion: 'stressed',
        icon: 'zap',
        description: 'Ai nevoie de tehnici de relaxare',
      },
      {
        text: 'Echilibru între muncă și odihnă',
        emotion: 'balanced',
        icon: 'target',
        description: 'Vrei să menții echilibrul',
      },
      {
        text: 'Caut mai multă energie și motivație',
        emotion: 'seeking',
        icon: 'star',
        description: 'Ai nevoie de boost energetic',
      },
    ],
  },
  {
    id: 2,
    question: 'Ce te ajută cel mai mult să te relaxezi?',
    subtitle: 'Descoperim ce funcționează pentru tine',
    answers: [
      {
        text: 'Ceaiuri și remedii naturale',
        emotion: 'natural',
        icon: 'leaf',
        description: 'Iubești soluțiile naturale',
      },
      {
        text: 'Meditație și mindfulness',
        emotion: 'mindful',
        icon: 'brain',
        description: 'Preferi exercițiile mentale',
      },
      {
        text: 'Suport profesional și ghidaj',
        emotion: 'guided',
        icon: 'heart',
        description: 'Vrei să fii ghidat de experți',
      },
    ],
  },
  {
    id: 3,
    question: 'Cât timp poți dedica zilnic pentru tine?',
    subtitle: 'Să personalizăm experiența ta',
    answers: [
      {
        text: '5-10 minute',
        emotion: 'short',
        icon: 'moon',
        description: 'Routine scurte și eficiente',
      },
      {
        text: '15-30 minute',
        emotion: 'medium',
        icon: 'sun',
        description: 'Sesiuni moderate de wellness',
      },
      {
        text: 'Peste 30 minute',
        emotion: 'long',
        icon: 'sparkles',
        description: 'Experiențe profunde de relaxare',
      },
    ],
  },
  {
    id: 4,
    question: 'Ce vrei să realizezi în următoarele 30 de zile?',
    subtitle: 'Să stabilim obiectivele tale',
    answers: [
      {
        text: 'Să reduc stresul și anxietatea',
        emotion: 'reduce_stress',
        icon: 'heart',
        description: 'Focus pe liniște și echilibru',
      },
      {
        text: 'Să am mai multă energie și vitalitate',
        emotion: 'increase_energy',
        icon: 'zap',
        description: 'Boost pentru energia fizică',
      },
      {
        text: 'Să dezvolt obiceiuri sănătoase',
        emotion: 'build_habits',
        icon: 'award',
        description: 'Construire de rutine pozitive',
      },
    ],
  },
];

// Removed FloatingParticle component for simplified design

// Simple static icon component
const SimpleIcon: React.FC<{ size?: number; color: string }> = ({
  size = 32,
  color,
}) => {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      <SvgIcon name="heart" size={size * 0.6} color="white" />
    </View>
  );
};

export const WelcomeQuizScreen: React.FC<WelcomeQuizProps> = ({
  onComplete,
}) => {
  const { colors, theme, isLoading: themeLoading } = useTheme();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCheckingQuizStatus, setIsCheckingQuizStatus] = useState(true);

  // Animation values
  const questionScale = useSharedValue(1);
  const questionOpacity = useSharedValue(1);
  const cardScale = useSharedValue(0.95);
  const cardOpacity = useSharedValue(0);

  // Check if user has already completed the quiz
  useEffect(() => {
    const checkQuizStatus = async () => {
      if (user) {
        try {
          const hasCompleted = await quizService.hasCompletedQuiz(user.uid);
          if (hasCompleted) {
            // User has already completed the quiz, skip to completion
            onComplete();
          }
        } catch (error) {
          console.error('Error checking quiz status:', error);
        } finally {
          setIsCheckingQuizStatus(false);
        }
      } else {
        setIsCheckingQuizStatus(false);
      }
    };

    checkQuizStatus();
  }, [user, onComplete]);

  useEffect(() => {
    // Initial card animation
    cardScale.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    });
    cardOpacity.value = withTiming(1, { duration: 800 });
  }, [cardScale, cardOpacity]);

  useEffect(() => {
    // Reset selected answer when question changes
    setSelectedAnswer(null);

    // Question transition animation
    questionScale.value = withSequence(
      withTiming(0.95, { duration: 200 }),
      withSpring(1, { damping: 12, stiffness: 100 }),
    );
    questionOpacity.value = withSequence(
      withTiming(0.7, { duration: 200 }),
      withTiming(1, { duration: 300 }),
    );
  }, [currentQuestion, questionScale, questionOpacity]);

  const handleAnswerSelect = (emotion: string) => {
    if (isAnimating) return;

    setSelectedAnswer(emotion);
    setAnswers(prev => ({
      ...prev,
      [welcomeQuizQuestions[currentQuestion].id]: emotion,
    }));

    setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        if (currentQuestion < welcomeQuizQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        } else {
          setIsCompleted(true);
        }
        setIsAnimating(false);
      }, 300);
    }, 500);
  };

  const getPersonalizedMessage = () => {
    const answerValues = Object.values(answers);

    if (
      answerValues.includes('stressed') ||
      answerValues.includes('reduce_stress')
    ) {
      return {
        title: 'Meriti Liniște și Echilibru! 🌿',
        subtitle: 'Stresul nu trebuie să îți controleze viața',
        benefits: [
          'Tehnici de respirație personalizate pentru calmarea instantanee',
          'Ceaiuri terapeutice recomandate de experți',
          'Acces la psihologi specializați în gestionarea stresului',
          'Jurnal ghidat pentru procesarea emoțiilor',
        ],
      };
    }

    if (
      answerValues.includes('seeking') ||
      answerValues.includes('increase_energy')
    ) {
      return {
        title: 'Energia Ta Naturală Te Așteaptă! ⚡',
        subtitle: 'Descoperă puterea remediilor naturale',
        benefits: [
          'Suplimente naturiste personalizate pentru energia ta',
          'Routine de morning boost cu rezultate garantate',
          'Sunetele Solfeggio pentru regenerare energetică',
          'Tracking inteligent al progresului tău',
        ],
      };
    }

    return {
      title: 'Calea Spre Wellness Perfect! ✨',
      subtitle: 'Transformă-ți viața în 30 de zile',
      benefits: [
        'Plan personalizat bazat pe profilul tău unic',
        'Comunitate suportivă și ghidaj profesional',
        'Remedii naturale certificate și eficiente',
        'Progres vizibil în primele 7 zile',
      ],
    };
  };

  const progress = ((currentQuestion + 1) / welcomeQuizQuestions.length) * 100;
  const question = welcomeQuizQuestions[currentQuestion];

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
    opacity: cardOpacity.value,
  }));

  const questionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: questionScale.value }],
    opacity: questionOpacity.value,
  }));

  if (themeLoading || isCheckingQuizStatus) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB' },
        ]}
      >
        <View style={styles.loadingContainer}>
          <SimpleIcon size={48} color={colors.accentGreen} />
          <ActivityIndicator
            size="large"
            color={colors.accentGreen}
            style={{ marginTop: 20 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Completion screen
  if (isCompleted) {
    const message = getPersonalizedMessage();

    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB' },
        ]}
      >
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View style={cardAnimatedStyle}>
            <Card variant="glassmorphism" animated>
              <CardContent>
                {/* Header */}
                <View style={styles.completionHeader}>
                  <SimpleIcon size={64} color={colors.accentGreen} />
                  <Text
                    style={[
                      styles.completionTitle,
                      { color: colors.accentGreen },
                    ]}
                  >
                    {message.title}
                  </Text>
                  <Text
                    style={[
                      styles.completionSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {message.subtitle}
                  </Text>
                </View>

                {/* Benefits */}
                <View style={styles.benefitsSection}>
                  <Text
                    style={[styles.benefitsHeader, { color: colors.primary }]}
                  >
                    Ce vei primi:
                  </Text>

                  {message.benefits.map((benefit, index) => (
                    <Animated.View
                      key={index}
                      style={[
                        styles.benefitItem,
                        {
                          backgroundColor: colors.primary + '10',
                          borderColor: colors.primary + '20',
                        },
                      ]}
                    >
                      <SvgIcon
                        name="check-circle"
                        size={20}
                        color={colors.accentGreen}
                      />
                      <Text
                        style={[
                          styles.benefitText,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {benefit}
                      </Text>
                    </Animated.View>
                  ))}
                </View>

                {/* CTA Button */}
                <View style={styles.ctaButtonContainer}>
                  <Button
                    title={
                      isSaving ? 'Se salvează...' : 'Începe Transformarea Ta'
                    }
                    onPress={async () => {
                      if (user) {
                        try {
                          setIsSaving(true);
                          await quizService.saveQuizAnswers(user.uid, answers);
                          onComplete();
                        } catch (error) {
                          console.error('Error saving quiz answers:', error);
                          Alert.alert(
                            'Eroare',
                            'A apărut o eroare la salvarea răspunsurilor. Te rugăm să încerci din nou.',
                          );
                          setIsSaving(false);
                        }
                      } else {
                        // If user is not logged in yet, just complete the quiz
                        // The answers will be saved later when they register
                        onComplete();
                      }
                    }}
                    variant="default"
                    size="lg"
                    fullWidth
                    disabled={isSaving}
                    icon={
                      isSaving ? undefined : (
                        <SvgIcon name="arrow-right" size={20} color="white" />
                      )
                    }
                  />
                </View>
              </CardContent>
            </Card>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Main quiz screen
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB' },
      ]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View style={cardAnimatedStyle}>
          <Card variant="glassmorphism" animated>
            <CardContent>
              {/* Header */}
              <View style={styles.header}>
                <SimpleIcon size={64} color={colors.accentGreen} />
                <Text style={[styles.title, { color: colors.primary }]}>
                  EnergyRaise
                </Text>
                <Text
                  style={[styles.subtitle, { color: colors.textSecondary }]}
                >
                  Descoperă-ți calea spre echilibru
                </Text>
              </View>

              {/* Progress */}
              <View style={styles.progressSection}>
                <View style={styles.progressInfo}>
                  <Text
                    style={[styles.progressText, { color: colors.textMuted }]}
                  >
                    Progres
                  </Text>
                  <Text
                    style={[styles.progressPercent, { color: colors.primary }]}
                  >
                    {currentQuestion + 1}/{welcomeQuizQuestions.length}
                  </Text>
                </View>
                <ProgressBar
                  progress={progress}
                  progressColors={[colors.accentGreen, colors.iconEnergy]}
                  backgroundColor={colors.progressBackground}
                  animated
                />
              </View>

              {/* Question */}
              <Animated.View
                style={[styles.questionSection, questionAnimatedStyle]}
              >
                <Text
                  style={[styles.questionText, { color: colors.textPrimary }]}
                >
                  {question.question}
                </Text>
                {question.subtitle && (
                  <Text
                    style={[
                      styles.questionSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {question.subtitle}
                  </Text>
                )}

                <View style={styles.answersContainer}>
                  {question.answers.map((answer, index) => {
                    const isSelected = selectedAnswer === answer.emotion;

                    return (
                      <GestureDetector
                        key={index}
                        gesture={Gesture.Tap().onStart(() => {
                          if (!isAnimating) {
                            runOnJS(handleAnswerSelect)(answer.emotion);
                          }
                        })}
                      >
                        <Animated.View
                          style={[
                            styles.answerButton,
                            {
                              borderColor: isSelected
                                ? colors.borderActive
                                : colors.border,
                              borderWidth: isSelected ? 2 : 1,
                              backgroundColor: isSelected
                                ? colors.primary + '15'
                                : 'transparent',
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.answerIconContainer,
                              {
                                backgroundColor: isSelected
                                  ? colors.primary
                                  : colors.primary + '20',
                              },
                            ]}
                          >
                            <SvgIcon
                              name={answer.icon}
                              size={20}
                              color={isSelected ? 'white' : colors.primary}
                            />
                          </View>
                          <View style={styles.answerTextContainer}>
                            <Text
                              style={[
                                styles.answerText,
                                {
                                  color: colors.textPrimary,
                                  fontWeight: isSelected ? '600' : '400',
                                },
                              ]}
                            >
                              {answer.text}
                            </Text>
                            <Text
                              style={[
                                styles.answerDescription,
                                { color: colors.textMuted },
                              ]}
                            >
                              {answer.description}
                            </Text>
                          </View>
                          {isSelected && (
                            <SvgIcon
                              name="check-circle"
                              size={20}
                              color={colors.accentGreen}
                            />
                          )}
                        </Animated.View>
                      </GestureDetector>
                    );
                  })}
                </View>
              </Animated.View>

              {/* Footer */}
              <Text style={[styles.footerText, { color: colors.textMuted }]}>
                Răspunsurile tale ne vor ajuta să îți oferim recomandări
                personalizate
              </Text>
            </CardContent>
          </Card>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  // Simplified design - removed particle and star animations

  // Main Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: Platform.OS === 'ios' ? '200' : '300',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: -1,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.2,
    opacity: 0.9,
  },

  // Progress Section
  progressSection: {
    marginBottom: 32,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '500' : '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.1,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '600' : '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    letterSpacing: -0.1,
  },

  // Question Section
  questionSection: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '300' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  questionSubtitle: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    letterSpacing: -0.2,
    opacity: 0.8,
  },

  // Answers
  answersContainer: {
    gap: 16,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  answerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  answerTextContainer: {
    flex: 1,
  },
  answerText: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '500' : '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    lineHeight: 22,
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  answerDescription: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    lineHeight: 18,
    letterSpacing: -0.1,
    opacity: 0.8,
  },

  // Footer
  footerText: {
    fontSize: 13,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: -0.05,
    opacity: 0.7,
  },

  // Completion Screen
  completionHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  completionTitle: {
    fontSize: 28,
    fontWeight: Platform.OS === 'ios' ? '300' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: -0.7,
    lineHeight: 34,
  },
  completionSubtitle: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.2,
    opacity: 0.9,
  },

  // Benefits
  benefitsSection: {
    marginBottom: 32,
  },
  benefitsHeader: {
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Rounded' : 'Roboto',
    lineHeight: 20,
    letterSpacing: -0.1,
    flex: 1,
  },

  // CTA Button
  ctaButtonContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
});
