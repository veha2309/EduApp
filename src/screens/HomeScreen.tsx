import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";;
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDoubleBackExit } from "../hooks/useDoubleBackExit";

type AuthStackParamList = {
    Home: undefined;
    Auth: undefined;
};

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<AuthStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    useDoubleBackExit();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Auth')}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1B3D'
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#F38B59',
        marginBottom: 50
    },
    buttonContainer: {
        width: '100%',
        gap: 20
    },
    button: {
        backgroundColor: '#F38B59',
        paddingVertical: 15,
        borderRadius: 12, width: '80%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    signupButton: {
        backgroundColor: '#0E1B3D',
        borderWidth: 1,
        borderColor: '#F38B59'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18
    },
    signupText: {
        color: '#F38B59'
    },
});

export default HomeScreen;
