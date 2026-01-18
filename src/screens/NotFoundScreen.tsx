import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withRepeat, 
    withTiming, 
    withSequence,
    FadeIn,
    SlideInDown
} from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../utils/storage';

const NotFoundScreen = () => {
    const navigation = useNavigation<any>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const floatAnimation = useSharedValue(0);
    const rotateAnimation = useSharedValue(0);

    useEffect(() => {
        checkAuthStatus();
        floatAnimation.value = withRepeat(
            withSequence(
                withTiming(-10, { duration: 2000 }),
                withTiming(10, { duration: 2000 })
            ),
            -1,
            true
        );

        rotateAnimation.value = withRepeat(
            withTiming(360, { duration: 4000 }),
            -1,
            false
        );
    }, []);

    const checkAuthStatus = async () => {
        const token = await storage.getToken();
        setIsLoggedIn(!!token);
    };

    const floatingStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: floatAnimation.value }],
    }));

    const rotatingStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotateAnimation.value}deg` }],
    }));

    const handleGoHome = () => {
        const destination = isLoggedIn ? 'ProfileDashboard' : 'Home';
        navigation.reset({ index: 0, routes: [{ name: destination }] });
    };

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeIn.duration(1000)} style={styles.content}>
                <Animated.View style={[styles.iconContainer, floatingStyle]}>
                    <Animated.View style={rotatingStyle}>
                        <FontAwesome name="compass" size={80} color="#ff6b35" />
                    </Animated.View>
                </Animated.View>

                <Animated.Text 
                    entering={SlideInDown.delay(500).duration(800)} 
                    style={styles.title}
                >
                    404
                </Animated.Text>

                <Animated.Text 
                    entering={SlideInDown.delay(800).duration(800)} 
                    style={styles.subtitle}
                >
                    Looks like you are lost
                </Animated.Text>

                <Animated.Text 
                    entering={SlideInDown.delay(1100).duration(800)} 
                    style={styles.description}
                >
                    The page you're looking for doesn't exist or is under construction
                </Animated.Text>

                <Animated.View entering={SlideInDown.delay(1400).duration(800)}>
                    <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
                        <FontAwesome name="home" size={20} color="#fff" />
                        <Text style={styles.homeButtonText}>Go Home</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1B3D',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    iconContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#ff6b35',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 15,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#8b9dc3',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    homeButton: {
        flexDirection: 'row',
        backgroundColor: '#1a3988',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    homeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default NotFoundScreen;