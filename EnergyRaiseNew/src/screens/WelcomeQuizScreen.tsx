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
} from 'react-native';
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
import Icon from 'react-native-vector-icons/Feather';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useTheme } from '../hooks/useTheme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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

// Floating particle component pentru background
const FloatingParticle: React.FC<FloatingParticleProps> = ({
  delay,
  colors,
}) => {
  const translateY = useSharedValue(screenHeight);
  const translateX = useSharedValue(Math.random() * screenWidth);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    const startAnimation = () => {
      translateY.value = screenHeight + 50;
      translateX.value = Math.random() * screenWidth;
      opacity.value = 0;
      scale.value = 0.5;

      setTimeout(() => {
        translateY.value = withTiming(-100, {
          duration: 3000 + Math.random() * 2000,
          easing: Easing.out(Easing.quad),
        });
        translateX.value = withTiming(
          translateX.value + (Math.random() - 0.5) * 100,
          {
            duration: 3000 + Math.random() * 2000,
            easing: Easing.inOut(Easing.sin),
          },
        );
        opacity.value = withSequence(
          withTiming(0.8, { duration: 500 }),
          withTiming(0.4, { duration: 2000 }),
          withTiming(0, { duration: 500 }),
        );
        scale.value = withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.8, { duration: 2000 }),
          withTiming(0.5, { duration: 500 }),
        );
      }, delay);
    };

    startAnimation();
    const interval = setInterval(startAnimation, 5000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [delay, translateY, translateX, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.particle, animatedStyle]}>
      <LinearGradient colors={colors} style={styles.particleGradient} />
    </Animated.View>
  );
};

// Rotating star component pentru logo
const RotatingStar: React.FC<{ size?: number; colors: string[] }> = ({
  size = 32,
  colors,
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={[{ width: size, height: size }, animatedStyle]}>
      <LinearGradient
        colors={colors}
        style={[
          styles.starContainer,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <Icon name="heart" size={size * 0.6} color="white" />
      </LinearGradient>
    </Animated.View>
  );
};

export const WelcomeQuizScreen: React.FC<WelcomeQuizProps> = ({
  onComplete,
}) => {
  const { colors, theme, toggleTheme, isLoading } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation values
  const questionScale = useSharedValue(1);
  const questionOpacity = useSharedValue(1);
  const cardScale = useSharedValue(0.95);
  const cardOpacity = useSharedValue(0);

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

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: colors.backgroundAuroraDark[0] },
        ]}
      >
        <View style={styles.loadingContainer}>
          <RotatingStar colors={[colors.accentGreen, colors.iconEnergy]} />
        </View>
      </SafeAreaView>
    );
  }

  // Completion screen
  if (isCompleted) {
    const message = getPersonalizedMessage();

    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />

        {/* Aurora gradient background */}
        <LinearGradient
          colors={colors.backgroundAuroraDark}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 200}
            colors={[colors.accentGreen + '40', colors.iconEnergy + '60']}
          />
        ))}

        {/* Theme Toggle */}
        <GestureDetector
          gesture={Gesture.Tap().onStart(() => {
            runOnJS(toggleTheme)();
          })}
        >
          <Animated.View
            style={[
              styles.themeToggle,
              {
                backgroundColor: colors.themeToggleBackground,
                borderColor: colors.themeToggleBorder,
              },
            ]}
          >
            <Icon
              name={theme === 'dark' ? 'sun' : 'moon'}
              size={20}
              color={colors.textMuted}
            />
          </Animated.View>
        </GestureDetector>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View style={cardAnimatedStyle}>
            <Card variant="glassmorphism" animated>
              <CardContent>
                {/* Header */}
                <View style={styles.completionHeader}>
                  <RotatingStar
                    size={64}
                    colors={[colors.accentGreen, colors.iconEnergy]}
                  />
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
                      <Icon
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
                <Button
                  title="Începe Transformarea Ta"
                  onPress={onComplete}
                  fullWidth
                  icon={<Icon name="arrow-right" size={20} color="white" />}
                />
              </CardContent>
            </Card>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Main quiz screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Aurora gradient background */}
      <LinearGradient
        colors={colors.backgroundAuroraDark}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 150}
          colors={[colors.accentGreen + '30', colors.iconEnergy + '50']}
        />
      ))}

      {/* Theme Toggle */}
      <GestureDetector
        gesture={Gesture.Tap().onStart(() => {
          runOnJS(toggleTheme)();
        })}
      >
        <Animated.View
          style={[
            styles.themeToggle,
            {
              backgroundColor: colors.themeToggleBackground,
              borderColor: colors.themeToggleBorder,
            },
          ]}
        >
          <Icon
            name={theme === 'dark' ? 'sun' : 'moon'}
            size={20}
            color={colors.textMuted}
          />
        </Animated.View>
      </GestureDetector>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View style={cardAnimatedStyle}>
          <Card variant="glassmorphism" animated>
            <CardContent>
              {/* Header */}
              <View style={styles.header}>
                <RotatingStar
                  size={64}
                  colors={[colors.accentGreen, colors.iconEnergy]}
                />
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
                            <Icon
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
                            <Icon
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
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeToggle: {
    position: 'absolute',
    top: 55,
    right: 20,
    zIndex: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  // Particle Animation
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 1,
  },
  particleGradient: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Star Animation
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A3C9A8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

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
});
