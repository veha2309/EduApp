import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, View, TouchableOpacity, Alert, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { EditModal } from "../components/EditModal";
import { userService } from "../services/userService";
import ProfileAvatar from "../components/ProfileAvatar";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import EnrolledCourses from "./EnrolledCourses";
import CartScreen from "./CartScreen";
import { useCallback } from "react";

const Drawer = createDrawerNavigator();

const ProfileContent = () => {
    const { user, loading, refetch } = useUser();
    const [editBioVisible, setEditBioVisible] = useState(false);
    const [editDetailsVisible, setEditDetailsVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    const getInitials = () => {
        if (!user?.firstName || !user?.lastName) return 'U';
        return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    };

    const handleSaveBio = async (data: any) => {
        try {
            const result = await userService.updateProfile({ about: data.about });
            if (result.success) {
                Alert.alert('Success', 'Bio updated successfully');
                refetch();
            } else {
                Alert.alert('Error', result.message || 'Failed to update bio');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update bio');
        }
    };

    const handleSaveDetails = async (data: any) => {
        try {
            const result = await userService.updateProfile({
                firstName: data.firstName,
                lastName: data.lastName,
                contactNumber: data.contactNumber,
                gender: data.gender,
                address: data.address,
                schoolName: data.schoolName,
                dateOfBirth: data.dateOfBirth,
            });
            if (result.success) {
                Alert.alert('Success', 'Details updated successfully');
                refetch();
            } else {
                Alert.alert('Error', result.message || 'Failed to update details');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update details');
        }
    };

    return (
        <ScrollView style={styles.container}>


            <View style={styles.card}>
                <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{getInitials()}</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={styles.userEmail}>{user?.email}</Text>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>My Bio</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditBioVisible(true)}>
                        <Text style={styles.editButtonText}>Edit</Text>
                        <FontAwesome name="pencil" size={14} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.bioText}>{user?.additionalDetails?.about || 'Write something about yourself'}</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Personal Details</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditDetailsVisible(true)}>
                        <Text style={styles.editButtonText}>Edit</Text>
                        <FontAwesome name="pencil" size={14} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>First Name</Text>
                        <Text style={styles.detailValue}>{user?.firstName || 'N/A'}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Last Name</Text>
                        <Text style={styles.detailValue}>{user?.lastName || 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Account Type</Text>
                        <Text style={styles.detailValue}>{user?.accountType || 'N/A'}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Email</Text>
                        <Text style={styles.detailValue}>{user?.email || 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Gender</Text>
                        <Text style={styles.detailValue}>{user?.additionalDetails?.gender || 'Click On Edit And set Your Gender'}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>ContactNumber</Text>
                        <Text style={styles.detailValue}>{user?.contactNumber || 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Address</Text>
                        <Text style={styles.detailValue}>{user?.additionalDetails?.address || 'Add Your Address'}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>School Name</Text>
                        <Text style={styles.detailValue}>{user?.additionalDetails?.schoolName || 'Add Your School Name'}</Text>
                    </View>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Date Of Birth</Text>
                    <Text style={styles.detailValue}>{user?.additionalDetails?.dateOfBirth || 'N'}</Text>
                </View>
            </View>

            <EditModal
                visible={editBioVisible}
                onClose={() => setEditBioVisible(false)}
                type="bio"
                initialData={{ about: user?.additionalDetails?.about || '' }}
                onSave={handleSaveBio}
            />

            <EditModal
                visible={editDetailsVisible}
                onClose={() => setEditDetailsVisible(false)}
                type="details"
                initialData={{
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    contactNumber: user?.contactNumber || '',
                    gender: user?.additionalDetails?.gender || '',
                    address: user?.additionalDetails?.address || '',
                    schoolName: user?.additionalDetails?.schoolName || '',
                    dateOfBirth: user?.additionalDetails?.dateOfBirth || '',
                }}
                onSave={handleSaveDetails}
            />
        </ScrollView>
    );
}

const CustomDrawerContent = () => {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Menu</Text>
        </View>
    );
}

const ProfileDashboard = () => {
    return (
        <Drawer.Navigator
            drawerContent={() => <CustomDrawerContent />}
            screenOptions={({ navigation }) => ({
                headerShown: true,
                drawerPosition: 'left',
                headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                            <FontAwesome name="shopping-cart" size={20} color="#fff" />
                        </TouchableOpacity>
                        <ProfileAvatar />
                    </View>
                ),
                headerTitleStyle: {
                    color: '#fff'
                },
                headerStyle: {
                    backgroundColor: '#24355e'
                },
                drawerStyle: {
                    backgroundColor: '#0E1B3D',
                },
                drawerLabelStyle: {
                    color: '#fff'
                },
                headerTintColor: '#fff'
            })}
        >
            <Drawer.Screen 
            name="Profile" 
            options={{
                title: 'My Profile',
                headerTitleStyle : {
                    fontWeight: 'bold',
                }
            }}
            component={ProfileContent} />
            <Drawer.Screen name="EnrolledCourses" options={{title : 'Enrolled Courses'}} component={EnrolledCourses} />
            <Drawer.Screen name="Cart" component={CartScreen} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a2b5a',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#2d4a9e',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    },
    avatarCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    userInfo: {
        gap: 4,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    userEmail: {
        fontSize: 12,
        color: '#fff',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ff8c42',
    },
    editButton: {
        flexDirection: 'row',
        backgroundColor: '#ff6b35',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 6,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    bioText: {
        color: '#8b9dc3',
        fontSize: 12,
    },
    detailsGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 12,
        color: '#fff',
    },
});

export default ProfileDashboard;