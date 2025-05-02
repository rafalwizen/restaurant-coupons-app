import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoadingIndicator from '../components/LoadingIndicator';
import ErrorDisplay from '../components/ErrorDisplay';

import { fetchCouponById } from '@/services/api';
import { CouponDetail } from '@/services/types';
import { COLORS } from '@/utils/constants';
import { formatDate, formatValidityPeriod, isStillValid } from '@/utils/formatDate';

const { width, height } = Dimensions.get('window');

export default function CouponDetailScreen() {
    const { id } = useLocalSearchParams();
    const couponId = typeof id === 'string' ? parseInt(id, 10) : 0;

    const [coupon, setCoupon] = useState<CouponDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCouponDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetchCouponById(couponId);

                if (response.success) {
                    setCoupon(response.data);
                } else {
                    setError(response.message || 'Failed to load coupon details');
                }
            } catch (err) {
                setError('Unable to load coupon details. Please check your connection.');
                console.error('Error loading coupon details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (couponId) {
            loadCouponDetail();
        } else {
            setError('Invalid coupon ID');
            setLoading(false);
        }
    }, [couponId]);

    const handleBackPress = () => {
        router.back();
    };

    if (loading) {
        return <LoadingIndicator message="Loading coupon details..." />;
    }

    if (error || !coupon) {
        return <ErrorDisplay message={error || 'Coupon not found'} onRetry={() => router.back()} />;
    }

    // Check if the coupon is still valid
    const valid = isStillValid(coupon.validTo);

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <StatusBar style="light" />

            <ScrollView style={styles.container} bounces={false}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: coupon.imageUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', COLORS.darkOverlay]}
                        style={styles.gradient}
                    />
                    <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{coupon.name}</Text>
                        <View style={styles.discountContainer}>
                            <Text style={styles.discountValue}>{coupon.discountValue}%</Text>
                            <Text style={styles.discountLabel}>OFF</Text>
                        </View>
                    </View>

                    <View style={styles.validityContainer}>
                        <Text style={[
                            styles.validityText,
                            !valid && styles.expiredText
                        ]}>
                            {valid
                                ? formatValidityPeriod(coupon.validFrom, coupon.validTo)
                                : "EXPIRED"}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{coupon.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Validity Period</Text>
                        <View style={styles.validityDetails}>
                            <View style={styles.validityItem}>
                                <Text style={styles.validityLabel}>Valid From</Text>
                                <Text style={styles.validityValue}>{formatDate(coupon.validFrom)}</Text>
                            </View>
                            <View style={styles.validityItem}>
                                <Text style={styles.validityLabel}>Valid To</Text>
                                <Text style={styles.validityValue}>{formatDate(coupon.validTo)}</Text>
                            </View>
                        </View>
                    </View>

                    {coupon.termsAndConditions && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
                            <Text style={styles.terms}>{coupon.termsAndConditions}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    imageContainer: {
        height: height * 0.4,
        width: width,
        position: 'relative',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    contentContainer: {
        padding: 16,
        paddingTop: 24,
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        flex: 1,
    },
    discountContainer: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    discountValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    discountLabel: {
        fontSize: 12,
        color: 'white',
        fontWeight: '600',
    },
    validityContainer: {
        backgroundColor: COLORS.accent,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 24,
    },
    validityText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        textAlign: 'center',
    },
    expiredText: {
        color: '#D32F2F',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: COLORS.text,
        lineHeight: 24,
    },
    validityDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    validityItem: {
        flex: 1,
    },
    validityLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    validityValue: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    terms: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});