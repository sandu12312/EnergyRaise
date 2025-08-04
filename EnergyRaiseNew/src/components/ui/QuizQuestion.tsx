import React from 'react';
import { View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';
import { SvgIcon } from './SvgIcon';
import { useTheme } from '../../hooks/useTheme';
import tw from '../../utils/tw';

interface QuizAnswer {
  text: string;
  emotion: string;
  icon: string;
  description: string;
}

interface QuizQuestionData {
  id: number;
  question: string;
  subtitle?: string;
  answers: QuizAnswer[];
}

interface QuizQuestionProps {
  question: QuizQuestionData;
  selectedAnswer: string | null;
  onAnswerSelect: (emotion: string) => void;
  isAnimating: boolean;
  animatedStyle: any;
}

// Reusable QuizQuestion component (CONTRIBUTING.md rule #33)
export const QuizQuestion: React.FC<QuizQuestionProps> = React.memo(
  ({
    question,
    selectedAnswer,
    onAnswerSelect,
    isAnimating,
    animatedStyle,
  }) => {
    const { theme } = useTheme();

    return (
      <Animated.View style={[tw`mb-6`, animatedStyle]}>
        <Text
          style={tw`text-2xl font-semibold mb-3 ${
            theme === 'light'
              ? 'text-light-text-primary'
              : 'text-dark-text-primary'
          }`}
        >
          {question.question}
        </Text>
        {question.subtitle && (
          <Text
            style={tw`text-lg mb-6 ${
              theme === 'light'
                ? 'text-light-text-secondary'
                : 'text-dark-text-secondary'
            }`}
          >
            {question.subtitle}
          </Text>
        )}

        <View style={tw`mt-4 space-y-4`}>
          {question.answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer.emotion;

            return (
              <GestureDetector
                key={index}
                gesture={Gesture.Tap().onStart(() => {
                  if (!isAnimating) {
                    runOnJS(onAnswerSelect)(answer.emotion);
                  }
                })}
              >
                <Animated.View
                  style={tw`flex-row items-center p-5 rounded-xl border ${
                    isSelected
                      ? `border-2 border-common-accent-green bg-common-accent-green/10`
                      : `border ${
                          theme === 'light'
                            ? 'border-light-border'
                            : 'border-dark-border'
                        }`
                  }`}
                >
                  <View
                    style={tw`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                      isSelected
                        ? 'bg-common-accent-green'
                        : 'bg-common-accent-green/20'
                    }`}
                  >
                    <SvgIcon
                      name={answer.icon}
                      size={24}
                      color={isSelected ? 'white' : '#A3C9A8'}
                    />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text
                      style={tw`text-lg ${
                        theme === 'light'
                          ? 'text-light-text-primary'
                          : 'text-dark-text-primary'
                      } ${isSelected ? 'font-semibold' : 'font-medium'}`}
                    >
                      {answer.text}
                    </Text>
                    <Text
                      style={tw`text-base mt-1 ${
                        theme === 'light'
                          ? 'text-light-text-muted'
                          : 'text-dark-text-muted'
                      }`}
                    >
                      {answer.description}
                    </Text>
                  </View>
                  {isSelected && (
                    <SvgIcon name="check-circle" size={24} color="#A3C9A8" />
                  )}
                </Animated.View>
              </GestureDetector>
            );
          })}
        </View>
      </Animated.View>
    );
  },
);
