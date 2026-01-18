import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';

interface Course {
    _id: string;
    courseName: string;
    totalDuration: string;
    progressPercentage: number;
}

const EnrolledCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnrolledCourses();
    }, []);

    const fetchEnrolledCourses = async () => {
        try {
            const data = await courseService.getEnrolledCourses();
            
            if (data.success) {
                setCourses(data.data);
            } else {
                Alert.alert('Error', 'Failed to fetch enrolled courses');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            Alert.alert('Error', 'Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Loading courses...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            
            {courses.length === 0 ? (
                <Text style={styles.emptyText}>No courses enrolled yet</Text>
            ) : (
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerText}>Course Name</Text>
                        <Text style={styles.headerText}>Duration</Text>
                        <Text style={styles.headerText}>Progress</Text>
                    </View>
                    
                    {courses.map((course) => (
                        <View key={course._id} style={styles.tableRow}>
                            <Text style={styles.cellText}>{course.courseName}</Text>
                            <Text style={styles.cellText}>{course.totalDuration || 'N/A'}</Text>
                            <Text style={styles.cellText}>{course.progressPercentage?.toFixed(0) || '0'}%</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1B3D',
        padding: 20,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 16,
    },
    emptyText: {
        color: '#ccc',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
    },
    table: {
        backgroundColor: '#1A2B5C',
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#2A3B6C',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#2A3B6C',
    },
    headerText: {
        flex: 1,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    cellText: {
        flex: 1,
        color: '#ccc',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default EnrolledCourses;