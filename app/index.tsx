import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
    Text,
    SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';

import CouponCard from '../components/CouponCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorDisplay from '../components/ErrorDisplay';
import Pagination from '../components/Pagination';

import { fetchCoupons } from '@/services/api';
import { CouponSummary, PaginatedResponse } from '@/services/types';
import { COLORS, DEFAULT_PAGE_SIZE } from '@/utils/constants';

export default function HomeScreen() {
    const [coupons, setCoupons] = useState<CouponSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    const loadCoupons = async (page: number = 0) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetchCoupons(page, DEFAULT_PAGE_SIZE);

            if (response.success) {
                const paginatedData = response.data as PaginatedResponse<CouponSummary>;
                setCoupons(paginatedData.content);
                setTotalElements(paginatedData.totalElements);

                // Calculate total pages
                const calculatedTotalPages = Math.ceil(
                    paginatedData.totalElements / DEFAULT_PAGE_SIZE
                );
                setTotalPages(calculatedTotalPages);
            } else {
                setError(response.message || 'Failed to load coupons');
            }
        } catch (err) {
            setError('Unable to load coupons. Please check your connection.');
            console.error('Error loading coupons:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Load coupons when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            loadCoupons(currentPage);
        }, [currentPage])
    );

    const handleRefresh = () => {
        setRefreshing(true);
        loadCoupons(currentPage);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Render the appropriate UI based on state
    if (loading && !refreshing) {
        return <LoadingIndicator message="Loading coupons..." />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={() => loadCoupons(currentPage)} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            {coupons.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No coupons available at the moment</Text>
                </View>
            ) : (
                <FlatList
                    data={coupons}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CouponCard coupon={item} imageId={item.id} />}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={[COLORS.primary]}
                            tintColor={COLORS.primary}
                        />
                    }
                />
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={loading}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContent: {
        padding: 16,
        paddingBottom: 24,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
    },
});