import { StyleSheet, TouchableOpacity, View, Text, Modal, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { authService } from "../services/authService";

const ProfileAvatar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { user } = useUser();
    const navigation = useNavigation<any>();

    const getInitials = () => {
        if (!user?.firstName || !user?.lastName) return 'U';
        return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    };

    const handleSignOut = async () => {
        try {
            await authService.signOut();
            Alert.alert('Success', 'You have been signed out');
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } catch (error) {
            Alert.alert('Error', 'Failed to sign out');
        }
    };

    const menuItems = [
        { icon: 'user', label: 'Profile', onPress: () => { setMenuVisible(false); navigation.navigate('Profile'); } },
        { icon: 'shopping-cart', label: 'My Courses', onPress: () => { setMenuVisible(false); navigation.navigate('EnrolledCourses'); } },
        { icon: 'cog', label: 'Settings', onPress: () => { setMenuVisible(false); navigation.navigate('NotFound'); } },
        { icon: 'sign-out', label: 'Sign Out', onPress: handleSignOut },
    ];

    return (
        <>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <View style={styles.avatarIcon}>
                    <Text style={styles.avatarText}>{getInitials()}</Text>
                </View>
            </TouchableOpacity>

            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.overlay} 
                    activeOpacity={1} 
                    onPress={() => setMenuVisible(false)}
                >
                    <Animated.View 
                        entering={FadeIn.duration(200)} 
                        exiting={FadeOut.duration(200)}
                        style={styles.menu}
                    >
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={item.onPress}
                            >
                                <FontAwesome name={item.icon} size={18} color="#fff" />
                                <Text style={styles.menuText}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}


const styles = StyleSheet.create({
    avatarIcon: {
        backgroundColor: '#1a3988',
        marginRight: 15,
        borderRadius: 50,
        padding: 10,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.23)',
    },
    avatarText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 60,
        paddingRight: 15,
    },
    menu: {
        backgroundColor: '#1a3988',
        borderRadius: 12,
        padding: 8,
        minWidth: 180,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
    },
    menuText: {
        color: '#fff',
        fontSize: 16,
    },
})
export default ProfileAvatar;