import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/utils/constants';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   onPageChange,
                                                   isLoading = false
                                               }) => {
    // Don't render if there's only one page
    if (totalPages <= 1) {
        return null;
    }

    const handlePreviousPage = () => {
        if (currentPage > 0 && !isLoading) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1 && !isLoading) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.pageButton,
                    currentPage === 0 || isLoading ? styles.disabled : null
                ]}
                onPress={handlePreviousPage}
                disabled={currentPage === 0 || isLoading}
            >
                <Text style={styles.pageButtonText}>Previous</Text>
            </TouchableOpacity>

            <View style={styles.pageInfo}>
                <Text style={styles.pageInfoText}>
                    Page {currentPage + 1} of {totalPages}
                </Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.pageButton,
                    currentPage === totalPages - 1 || isLoading ? styles.disabled : null
                ]}
                onPress={handleNextPage}
                disabled={currentPage === totalPages - 1 || isLoading}
            >
                <Text style={styles.pageButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: 'white',
    },
    pageButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
    },
    pageButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    disabled: {
        backgroundColor: '#CCCCCC',
        opacity: 0.6,
    },
    pageInfo: {
        paddingHorizontal: 8,
    },
    pageInfoText: {
        color: COLORS.text,
    },
});

export default Pagination;