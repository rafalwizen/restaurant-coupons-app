import { API_BASE_URL } from '@/utils/constants';
import { ApiResponse, CouponDetail, CouponSummary, PaginatedResponse } from './types';

/**
 * Fetch active coupons with pagination
 */
export const fetchCoupons = async (
    page: number = 0,
    size: number = 10,
    sortBy: string = 'id',
    direction: 'asc' | 'desc' = 'asc'
): Promise<ApiResponse<PaginatedResponse<CouponSummary>>> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/coupons?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
};

/**
 * Fetch a single coupon by ID
 */
export const fetchCouponById = async (id: number): Promise<ApiResponse<CouponDetail>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/coupons/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching coupon with id ${id}:`, error);
        throw error;
    }
};

/**
 * Get the full image URL from an image ID
 */
export const getImageUrl = (imageId: number): string => {
    return `${API_BASE_URL}/api/images/${imageId}/content`;
};