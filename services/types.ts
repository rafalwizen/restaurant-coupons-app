export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}

export interface PaginatedResponse<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalElements: number;
}

export interface CouponSummary {
    id: number;
    name: string;
    discountValue: number;
}

export interface CouponDetail {
    id: number;
    name: string;
    description: string;
    discountValue: number;
    validFrom: string;
    validTo: string;
    termsAndConditions: string;
    isActive: boolean;
    imageId: number;
    imageUrl: string;
}

export interface ImageMetadata {
    id: number;
    fileName: string;
    fileType: string;
    fileSize: number;
    description: string;
    url: string;
}