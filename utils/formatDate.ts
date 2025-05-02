/**
 * Format date string to a readable format
 * @param dateString - ISO date string from API
 * @returns Formatted date string (e.g., "Jan 1, 2023")
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

/**
 * Format a validity period from start to end dates
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns Formatted validity period (e.g., "Valid: Jan 1 - Dec 31, 2023")
 */
export const formatValidityPeriod = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const endDay = end.getDate();
    const endYear = end.getFullYear();

    return `Valid: ${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`;
};

/**
 * Check if a coupon is still valid based on current date
 * @param validTo - End date string from API
 * @returns Boolean indicating if coupon is still valid
 */
export const isStillValid = (validTo: string): boolean => {
    const now = new Date();
    const expiryDate = new Date(validTo);
    return expiryDate > now;
};