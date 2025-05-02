import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { CouponSummary } from '@/services/types';
import { COLORS } from '@/utils/constants';
import { getImageUrl } from '@/services/api';

interface CouponCardProps {
    coupon: CouponSummary;
    imageId?: number;
}

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // 16px padding on each side

const CouponCard: React.FC<CouponCardProps> = ({ coupon, imageId }) => {
    const handlePress = () => {
        router.push(`/${coupon.id}`);
    };

    // Use a default image if no imageId is provided
    const imageSource = imageId
        ? { uri: getImageUrl(imageId) }
        : require('../assets/default-coupon.png');

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.9}
        >
            <ImageBackground
                source={imageSource}
                style={styles.background}
                imageStyle={styles.image}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={COLORS.gradientOverlay}
                    style={styles.gradient}
                >
                    <View style={styles.content}>
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                                {coupon.discountValue}% OFF
                            </Text>
                        </View>
                        <Text style={styles.title}>{coupon.name}</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        height: 180,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    background: {
        width: '100%',
        height: '100%',
    },
    image: {
        borderRadius: 12,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        justifyContent: 'flex-end',
        padding: 16,
    },
    content: {
        width: '100%',
    },
    discountBadge: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    discountText: {
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: 14,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});

export default CouponCard;