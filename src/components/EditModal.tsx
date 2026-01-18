import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface EditModalProps {
    visible: boolean;
    onClose: () => void;
    type: 'bio' | 'details';
    initialData: any;
    onSave: (data: any) => Promise<void>;
}

export const EditModal = ({ visible, onClose, type, initialData, onSave }: EditModalProps) => {
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        await onSave(formData);
        setLoading(false);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>{type === 'bio' ? 'Edit Bio' : 'Edit Personal Details'}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <FontAwesome name="times" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content}>
                        {type === 'bio' ? (
                            <View style={styles.field}>
                                <Text style={styles.label}>About</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    value={formData.about}
                                    onChangeText={(text) => setFormData({ ...formData, about: text })}
                                    placeholder="Write something about yourself"
                                    placeholderTextColor="#8b9dc3"
                                    multiline
                                />
                            </View>
                        ) : (
                            <>
                                <View style={styles.row}>
                                    <View style={styles.halfField}>
                                        <Text style={styles.label}>First Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={formData.firstName}
                                            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                                            placeholderTextColor="#8b9dc3"
                                        />
                                    </View>
                                    <View style={styles.halfField}>
                                        <Text style={styles.label}>Last Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={formData.lastName}
                                            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                                            placeholderTextColor="#8b9dc3"
                                        />
                                    </View>
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Contact Number</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.contactNumber}
                                        onChangeText={(text) => setFormData({ ...formData, contactNumber: text })}
                                        keyboardType="phone-pad"
                                        placeholderTextColor="#8b9dc3"
                                    />
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Gender</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.gender}
                                        onChangeText={(text) => setFormData({ ...formData, gender: text })}
                                        placeholderTextColor="#8b9dc3"
                                    />
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Address</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.address}
                                        onChangeText={(text) => setFormData({ ...formData, address: text })}
                                        placeholderTextColor="#8b9dc3"
                                    />
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>School Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.schoolName}
                                        onChangeText={(text) => setFormData({ ...formData, schoolName: text })}
                                        placeholderTextColor="#8b9dc3"
                                    />
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Date Of Birth</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.dateOfBirth}
                                        onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
                                        placeholder="YYYY-MM-DD"
                                        placeholderTextColor="#8b9dc3"
                                    />
                                </View>
                            </>
                        )}
                    </ScrollView>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        padding: 20,
    },
    modal: {
        backgroundColor: '#2d4a9e',
        borderRadius: 16,
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#1a2b5a',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        padding: 20,
    },
    field: {
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    halfField: {
        flex: 1,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#1a2b5a',
        borderRadius: 8,
        padding: 12,
        color: '#fff',
        fontSize: 13,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#ff6b35',
        margin: 20,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
