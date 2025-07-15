import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function PseudocodeGame() {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === 'print hello world') {
      setResult('Correct!');
    } else {
      setResult('Try again!');
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
        Mini-Game: Write the pseudocode to print "Hello World"
      </Text>
      <TextInput
        placeholder='Type your answer...'
        value={answer}
        onChangeText={setAnswer}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          padding: 8,
          marginBottom: 8,
        }}
      />
      <Button title="Check" onPress={checkAnswer} />
      {result && (
        <Text style={{ marginTop: 10, color: result === 'Correct!' ? 'green' : 'red' }}>
          {result}
        </Text>
      )}
    </View>
  );
} 