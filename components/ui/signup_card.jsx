import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUpCard = ({ visible, onClose, handlePress }) => {

    const [birthdate, setBirthdate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) setBirthdate(selectedDate);
    };

    const formattedDate = birthdate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
            <LinearGradient
            colors={['#FFC107', '#673AB7']}
            style={styles.cardWrapper}
            >
            <View style={styles.card}>
                <View style={styles.cardHandle} />

                <Text style={styles.title}>Sign up</Text>

                <View style={styles.row}>
                <TextInput style={styles.inputHalf} placeholder="Firstname" />
                <TextInput style={styles.inputHalf} placeholder="Lastname" />
                </View>

                <TextInput style={styles.input} placeholder="Email" />

                <View style={{ marginVertical: 12 }}>
                    <Text style={styles.label}>Birthday</Text>

                    <TouchableOpacity
                        style={styles.birthdateInput}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text>{formattedDate}</Text>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={birthdate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                            maximumDate={new Date()}
                            onChange={onChange}
                        />
                    )}
                </View>

                <TextInput style={styles.input} placeholder="Password" secureTextEntry />
                <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

                <TouchableOpacity style={styles.signupButton} onPress={handlePress}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>

                <Text style={styles.footer}>
                Already have an account?{' '}
                    <Text style={{ color: '#2563eb' }} onPress={onClose}>Login</Text>
                </Text>
            </View>
            </LinearGradient>
        </View>
        </Modal>
    );
};

export default SignUpCard;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cardWrapper: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 2,
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 34,
  },
  cardHandle: {
    width: 60,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1347',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2C2A45',
    padding: 12,
    borderRadius: 24,
    marginBottom: 12,
  },
  inputHalf: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2C2A45',
    padding: 12,
    borderRadius: 34,
  },
  inputThird: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2C2A45',
    padding: 12,
    borderRadius: 34,
    marginHorizontal: 4,
  },
  label: {
    marginBottom: 4,
    fontWeight: '600',
    color: '#333',
    fontSize: 15,
  },
  birthdateInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#2C2A45',
    borderRadius: 24,
    marginBottom: 12,
  },
  signupButton: {
    backgroundColor: '#1E1347',
    padding: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  signupText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  footer: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 12,
    color: '#555',
  },
});
