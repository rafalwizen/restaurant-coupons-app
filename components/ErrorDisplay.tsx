import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/utils/constants';

interface ErrorDisplayProps {
    message: string;
    onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>⚠️</Text>
            <Text style={styles.message}>{message}</Text>

            {onRetry && (
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                    <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    icon: {
        fontSize: 48,
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 24,
    },
    retryButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    retryText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ErrorDisplay;