import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/utils/constants';

interface LoadingIndicatorProps {
    message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
                                                               message = 'Loading...'
                                                           }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    message: {
        marginTop: 12,
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
    },
});

export default LoadingIndicator;