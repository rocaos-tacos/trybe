export interface AnalyticsEvent {
    name: string;
    timestamp: number;
    data?: any;
}

export interface EmailEntry {
    email: string;
    source: string;
    timestamp: number;
}

const STORAGE_KEYS = {
    EVENTS: 'trybe_analytics_events',
    EMAILS: 'trybe_analytics_emails',
};

export const analytics = {
    trackEvent: (name: string, data?: any) => {
        try {
            const events: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
            events.push({
                name,
                timestamp: Date.now(),
                data,
            });
            localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
            console.log(`[Analytics] Event tracked: ${name}`, data);
        } catch (e) {
            console.error('Failed to track event', e);
        }
    },

    saveEmail: (email: string, source: string) => {
        try {
            const emails: EmailEntry[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMAILS) || '[]');
            // Prevent duplicates
            if (!emails.some(e => e.email === email)) {
                emails.push({
                    email,
                    source,
                    timestamp: Date.now(),
                });
                localStorage.setItem(STORAGE_KEYS.EMAILS, JSON.stringify(emails));
                console.log(`[Analytics] Email saved: ${email} from ${source}`);
            }
        } catch (e) {
            console.error('Failed to save email', e);
        }
    },

    getStats: () => {
        try {
            const events: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
            const emails: EmailEntry[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMAILS) || '[]');

            const eventCounts = events.reduce((acc, event) => {
                acc[event.name] = (acc[event.name] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            return {
                totalEvents: events.length,
                totalEmails: emails.length,
                eventCounts,
                emails, // Return full list for admin
                events: events.slice(-50).reverse() // Return last 50 events
            };
        } catch (e) {
            return { totalEvents: 0, totalEmails: 0, eventCounts: {}, emails: [], events: [] };
        }
    },

    clearData: () => {
        localStorage.removeItem(STORAGE_KEYS.EVENTS);
        localStorage.removeItem(STORAGE_KEYS.EMAILS);
    }
};
