/**
 * Security utilities for the RACI Matrix application
 */

// Input sanitization to prevent XSS attacks
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit input length
};

// Email validation with security considerations
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const sanitized = sanitizeInput(email);
  return emailRegex.test(sanitized) && sanitized.length <= 254;
};

// Validate task and member data
export const validateTaskData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  
  const requiredFields = ['name', 'description', 'category', 'priority'];
  return requiredFields.every(field => 
    typeof data[field] === 'string' && 
    sanitizeInput(data[field]).length > 0
  );
};

export const validateMemberData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  
  return (
    typeof data.name === 'string' && 
    sanitizeInput(data.name).length > 0 &&
    validateEmail(data.email)
  );
};

// Content Security Policy helpers
export const getCSPNonce = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Local storage security
export const secureLocalStorage = {
  setItem: (key: string, value: any): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const serializedValue = JSON.stringify(value);
      
      // Basic size check to prevent storage abuse
      if (serializedValue.length > 5 * 1024 * 1024) { // 5MB limit
        console.warn('Data too large for local storage');
        return;
      }
      
      localStorage.setItem(sanitizedKey, serializedValue);
    } catch (error) {
      console.error('Failed to save to local storage:', error);
    }
  },
  
  getItem: (key: string): any => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const item = localStorage.getItem(sanitizedKey);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Failed to read from local storage:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      localStorage.removeItem(sanitizedKey);
    } catch (error) {
      console.error('Failed to remove from local storage:', error);
    }
  }
};

// Rate limiting for actions (prevent spam)
class RateLimiter {
  private actions: Map<string, number[]> = new Map();
  private readonly maxActions = 10;
  private readonly timeWindow = 60000; // 1 minute

  canPerformAction(actionType: string): boolean {
    const now = Date.now();
    const actionTimes = this.actions.get(actionType) || [];
    
    // Remove old actions outside time window
    const recentActions = actionTimes.filter(time => now - time < this.timeWindow);
    
    if (recentActions.length >= this.maxActions) {
      return false;
    }
    
    recentActions.push(now);
    this.actions.set(actionType, recentActions);
    return true;
  }
}

export const rateLimiter = new RateLimiter();