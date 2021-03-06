import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

// Actions
import { resetTrivia } from './../../actions/trivia';
import { setRoot } from './../../actions/navigation';
import { resetMap } from './../../actions/electoral-map';
import { setName, setParty, resetCandidacy } from './../../actions/candidate';

// Utility
import colors from './../../utils/colors';
import capitalize from './../../utils/capitalize';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.resetGame = this.resetGame.bind(this);
  }

  resetGame() {
    const { resetCandidacy, resetElection, resetGame, resetTrivia } = this.props;

    Alert.alert(
      'Reset Game?',
      'Do you wish yo reset your current game? All data will be lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => null,
        },
        {
          text: 'OK',
          onPress: () => {
            // Reset Trivia
            resetTrivia();
            // Reset election
            resetElection();
            // Reset candidacy
            resetCandidacy();
            // Take us to root
            resetGame();
          },
        },
      ]
    );
  }

  render() {
    const { name, party } = this.props;

    return (
      <ScrollView style={styles.scoll}>
        <View style={styles.header}>
          {/* Avatar */}
          <View style={styles.avatar} />
          {/* Name */}
          <Text style={styles.title}>{capitalize(name)}</Text>
          {/* Party */}
          <Text style={styles.subtitle}>
            <Text style={[styles.subtitle, { color: colors[party] }]}>{capitalize(party)} </Text>
            Party Candidate
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.resetGame}
          style={[styles.fullButton, { backgroundColor: colors[party] }]}
        >
          <Text style={styles.fullButtonText}>Reset</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.light,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 100,
    backgroundColor: colors.lightgray,
  },
  title: {
    fontSize: 28,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    marginTop: 20,
    textAlign: 'center',
  },
  fullButton: {
    position: 'absolute',
    width: '100%',
    padding: 10,
    bottom: 0,
  },
  fullButtonText: {
    color: colors.background,
    textAlign: 'center',
    fontSize: 24,
  },
});

const mapStateToProps = state => {
  return {
    name: state.candidate.name,
    party: state.candidate.party,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetTrivia: () => dispatch(resetTrivia()),
    resetGame: () => dispatch(setRoot('Start')),
    changeName: (name) => dispatch(setName(name)),
    resetElection: () => dispatch(resetMap()),
    resetCandidacy: () => dispatch(resetCandidacy()),
    switchParty: (party) => dispatch(setParty(party)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
