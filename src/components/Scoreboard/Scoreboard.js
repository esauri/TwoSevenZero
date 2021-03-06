import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from './../../utils/colors';

class Scoreboard extends PureComponent {
  render() {
    const { party, state } = this.props;
    const playerWon = (state.playerScore > 50) ? '✔' : null;
    const rivalWon = (state.opponentScore > 50) ? '✔' : null;

    return (
      <View style={styles.container}>
        <View style={[styles.score, { backgroundColor: colors[party] }]}>
          <Text style={styles.text}>{state.playerScore}% {playerWon}</Text>
        </View>
        <View style={[styles.score, { backgroundColor: (party === 'democratic') ? colors.republican : colors.democratic }]}>
          <Text style={styles.text}>{state.opponentScore}% {rivalWon}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  score: {
    flexBasis: '50%',
    padding: 16,
  },
  text: {
    textAlign: 'center',
    color: colors.background,
  },
});

export default Scoreboard;
