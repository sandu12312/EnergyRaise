import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface SvgIconProps {
  name: string;
  size: number;
  color: string;
}

// Optimized SVG Icons with React.memo for performance (CONTRIBUTING.md rule #9)
export const SvgIcon: React.FC<SvgIconProps> = React.memo(
  ({ name, size, color }) => {
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
        <Svg
          width={size}
          height={size}
          viewBox="0 0 513.319 513.319"
          fill="none"
        >
          <Path
            d="M308.122,308.451c-13.664,13.381-32.95,16.004-48.034,8.962c-21.018-9.8-31.388-32.497-25.392-55.868 c5.292-20.631,23.97-35.812,44.49-39.741c17.323-3.312,39.927-0.651,62.956-16.898c6.345-4.477,17.003-13.777,27.127-31.729 c-5.91,29.992-17.459,71.672-47.558,102.952c-0.55,0.571-1.111,1.121-1.672,1.672c-2.172,2.121-4.436,4.101-6.783,5.951 C311.37,305.791,309.623,306.973,308.122,308.451z"
            fill={color}
            opacity="0.3"
          />
          <Path
            d="M510.923,179.332c-11.96-97.923-68.85-171.196-165.965-175.257c-7.366-0.307-14.366,3.072-17.596,9.665 c-3.23,6.592-2.24,14.396,2.499,19.802c91.657,104.392,7.929,170.435,7.929,170.435c-15.323,16.174-34.638,26.342-56.163,29.424 c-22.068,3.164-44.072-0.347-62.058-9.879c-8.664-4.59-16.764-10.571-24.444-18.251c-41.744-41.744-34.831-127.84-30.362-160.123 c0.74-5.355-1.069-10.749-4.842-14.43c-3.772-3.682-8.999-5.357-14.194-4.479c-131.868,22.273-147.577,146.45-139.444,208.783 c10.308,78.922,72.215,218.033,229.727,264.697c4.132,1.221,8.553,0.904,12.489-0.894c3.936-1.798,7.1-4.959,8.898-8.895 c17.235-37.8,52.776-92.483,106.62-106.755c39.504-10.468,89.471-39.35,120.413-86.645 C518.788,243.426,516.387,219.193,510.923,179.332z M387.82,293.287c-72.861,19.3-109.289,88.003-124.552,125.626 c-123.364-41.211-171.318-148.992-179.625-213.432c-7.57-58.825,10.917-145.645,104.445-163.167 c-2.726,36.146,2.747,133.187,60.885,191.324c10.147,10.147,21.113,18.003,33.057,23.953c24.474,12.977,53.983,17.532,83.078,13.47 c29.304-4.106,56.25-17.903,77.457-39.795c0,0,33.881-33.004,24.444-87.312c37.4,52.698,18.716,106.699-14.771,147.992 C423.335,276.43,404.508,288.874,387.82,293.287z"
            fill={color}
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
            d="M10 13c0 1.1.9 2 2 2s2-.9 2-2H10z"
            fill="white"
            opacity="0.7"
          />
        </Svg>
      ),
      heart: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={color}
          />
          <Path
            d="M12 17l-1-1c-3-2.5-5-4.5-5-6.5 0-2 1.5-3.5 3.5-3.5 1 0 2 .5 2.5 1.5.5-1 1.5-1.5 2.5-1.5 2 0 3.5 1.5 3.5 3.5 0 2-2 4-5 6.5l-1 1z"
            fill="white"
            opacity="0.25"
          />
        </Svg>
      ),
      moon: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fill={color}
          />
        </Svg>
      ),
      sun: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 17a5 5 0 100-10 5 5 0 000 10zm0 2a7 7 0 100-14 7 7 0 000 14zm1-17a1 1 0 10-2 0v1a1 1 0 102 0V2zM11 21a1 1 0 102 0v-1a1 1 0 10-2 0v1zm7.071-12.071a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM6.343 16.657a1 1 0 10-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707zM21 11a1 1 0 10-2 0v1a1 1 0 102 0v-1zm-17 1a1 1 0 102 0v-1a1 1 0 10-2 0v1zm15.657 3.657a1 1 0 10-1.414 1.414l.707.707a1 1 0 101.414-1.414l-.707-.707zM7.757 6.343a1 1 0 10-1.414 1.414l.707.707a1 1 0 101.414-1.414l-.707-.707z"
            fill={color}
          />
        </Svg>
      ),
      'check-circle': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M22 11.08V12a10 10 0 11-5.93-9.14"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M22 4L12 14.01l-3-3"
            stroke={color}
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
      close: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M18 6L6 18M6 6l12 12"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      'chevron-left': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M15 18l-6-6 6-6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      'chevron-right': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M9 18l6-6-6-6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      'arrow-left': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M19 12H5M12 19l-7-7 7-7"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      calendar: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
            fill={color}
          />
        </Svg>
      ),
      crown: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M20.8 8.5l-3.6 8.4H6.8L3.2 8.5l4.8 2 3.5-4.6 3.5 4.6 5.8-2z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={color}
            fillOpacity="0.2"
          />
          <Path
            d="M4 19.5h16"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </Svg>
      ),
      lock: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={color}
            fillOpacity="0.1"
          />
          <Path
            d="M7 11V7a5 5 0 0110 0v4"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      mail: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={color}
            fillOpacity="0.1"
          />
          <Path
            d="M22 6l-10 7L2 6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      'log-out': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M16 17l5-5-5-5M21 12H9"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      bell: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={color}
            fillOpacity="0.1"
          />
          <Path
            d="M13.73 21a2 2 0 01-3.46 0"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      settings: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 15a3 3 0 100-6 3 3 0 000 6z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={color}
            fillOpacity="0.1"
          />
          <Path
            d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 010 2.8 2 2 0 01-2.8 0l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-2 2 2 2 0 01-2-2v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8 0 2 2 0 010-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 01-2-2 2 2 0 012-2h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 010-2.8 2 2 0 012.8 0l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 012-2 2 2 0 012 2v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 0 2 2 0 010 2.8l-.1.1a1.7 1.7 0 00-.3 1.8 1.7 1.7 0 001.5 1H21a2 2 0 012 2 2 2 0 01-2 2h-.1a1.7 1.7 0 00-1.5 1z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      'chart-bar': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M18 20V10M12 20V4M6 20v-6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      user: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle
            cx="12"
            cy="7"
            r="4"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={color}
            fillOpacity="0.1"
          />
        </Svg>
      ),
      'arrow-up-right': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      'arrow-down-right': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M7 7L17 17M17 17V7M17 17H7"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      'chart-column': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M7 7v10M12 11v6M17 15v2"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Rect
            x="4"
            y="3"
            width="16"
            height="18"
            rx="2"
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
        </Svg>
      ),
      'time-clock': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle
            cx="12"
            cy="12"
            r="9"
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
          <Path
            d="M12 7v5l3 3"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </Svg>
      ),
      'running-man': (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="9" cy="6" r="3" fill={color} />
          <Path
            d="M16 14.5l-3-2-2 3.5 1 3 4-1.5v-3z"
            fill={color}
            fillOpacity="0.5"
          />
          <Path
            d="M4.5 17.5L9 18l2.5-6.5 3 1.5 1-3.5L12 8l-3 .5L7.5 14l-3 3.5z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      cup: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M18 8h1a4 4 0 110 8h-1"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M5 8h13v9a4 4 0 01-4 4H9a4 4 0 01-4-4V8z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M8 3v5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M12 3v5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      pill: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M7 20l10-10M10 6l8 8-6 6-8-8 6-6z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={color}
            fillOpacity="0.2"
          />
        </Svg>
      ),
      minus: (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M5 12h14"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
    };

    const iconComponent = icons[name as keyof typeof icons];
    return iconComponent || null;
  },
);
