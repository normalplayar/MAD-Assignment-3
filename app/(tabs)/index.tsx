import { Image } from 'expo-image';
import {StyleSheet, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { VideoView, useVideoPlayer   } from 'expo-video';
import { useState } from 'react';

import { Audiowave } from '@/components/audio-wave';
import { StopAudiowave } from '@/components/stop-audio-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const title = 'Activity 1: Parachute Drop Challenge';
  const ovreview = 'Overview. Students design, build, and test a parachute for a small toy to reduce its landing speed and impact force. Teams iterate their designs under time and material constraints, aiming to achieve the slowest and safest landing within a target area.';
  const equipments = 'Equipments. 1. Mobile phone with STEMM Lab app. 2. Small toy (example army toy soldier). 3. Table or elevated surface. 4. Paper or plastic. 5. String. 6. Scissors. 7. Tape.';
  const diagram = 'Diagram. Toy attached to parachute. Drop height marked. Target landing zone shown on floor.';
  const titleSpeak = () => {
    Speech.speak(title, {
      rate: 1.0,
      pitch: 1.0,
    });
  };

  const overviewSpeak = () => {
    Speech.speak(ovreview, {
      rate: 1.0,
      pitch: 1.0,
    });
  };

  const equipmentSpeak = () => {
    Speech.speak(equipments, {
      rate: 1.0,
      pitch: 1.0,
    });
  };

  const diagramSpeak = () => {
    Speech.speak(diagram, {
      rate: 1.0,
      pitch: 1.0,
    });
  };

  const stopSpeak = () => {
    Speech.stop();
  };

  const equipmentList = [
  'Mobile phone with STEMM Lab app',
  'Small toy (e.g. army toy soldier)',
  'Table or elevated surface',
  'Paper or plastic',
  'String',
  'Scissors',
  'Tape',
  ];

  const diagramList = [
    'Toy attached to parachute',
    'Drop height marked',
    'Target landing zone shown on floor'
  ];

  const player = useVideoPlayer(
  { uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    (player) => {
      player.loop = true;
      player.volume = 1;
    }
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
  if (isPlaying) {
    player.pause();
  } else {
    player.play();
  }
  setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    player.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const increaseVolume = () => {
    const newVolume = Math.min(volume + 0.1, 1);
    player.volume = newVolume;
    setVolume(newVolume);
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(volume - 0.1, 0);
    player.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D8D8D8', dark: '#737373' }}
      headerImage={
        <Image
          source={require('@/assets/images/parachute-logo.png')}
          style={styles.parachuteLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Activity 1: Parachute Drop Challenge</ThemedText>
        <TouchableOpacity onPress={titleSpeak}>
          <ThemedText><Audiowave /></ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopSpeak}>
          <ThemedText><StopAudiowave /></ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Overview <TouchableOpacity onPress={overviewSpeak}> <Audiowave /> </TouchableOpacity> <TouchableOpacity onPress={stopSpeak}> <StopAudiowave /> </TouchableOpacity></ThemedText>
        <ThemedText>
          Students design, build, and test a parachute for a small toy to reduce its landing speed and
          impact force. Teams iterate their designs under time and material constraints, aiming to achieve
          the slowest and safest landing within a target area. 
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Equipments <TouchableOpacity onPress={equipmentSpeak}> <Audiowave /> </TouchableOpacity> <TouchableOpacity onPress={stopSpeak}> <StopAudiowave /> </TouchableOpacity></ThemedText>
        {equipmentList.map((item, index) => (
          <ThemedText key={index}>
            {index + 1}. {item}
          </ThemedText>
        ))}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Diagram <TouchableOpacity onPress={diagramSpeak}> <Audiowave /> </TouchableOpacity> <TouchableOpacity onPress={stopSpeak}> <StopAudiowave /> </TouchableOpacity></ThemedText>
            {diagramList.map((item, index) => (
          <ThemedText key={index}>
            • {item}
          </ThemedText>
          ))}
      </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Demo Video</ThemedText>

          <VideoView
            player={player}
            style={{ width: 375, height: 200 }}
            contentFit="contain"
            nativeControls={false}
          />
          <ThemedView style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            <TouchableOpacity onPress={togglePlay}>
              <ThemedText>
                {isPlaying ? '⏸ Pause' : '▶️ Play'}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleMute}>
              <ThemedText>
                {isMuted ? '🔊 Unmute' : '🔇 Mute'}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={increaseVolume}>
              <ThemedText>🔼 Volume+</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={decreaseVolume}>
              <ThemedText>🔽 Volume-</ThemedText>
            </TouchableOpacity>

          </ThemedView>
        </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  parachuteLogo: {
    height: 250,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
