import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

export interface AnalyticsEvent {
    name: string;
    timestamp: number;
    sessionId: string;
    data?: any;
}

export interface EmailEntry {
    email: string;
    source: string;
    timestamp: number;
}

// Generate a random session ID for this page load
const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const analytics = {
    trackEvent: async (name: string, data?: any) => {
        try {
            await addDoc(collection(db, 'events'), {
                name,
                timestamp: Date.now(),
                sessionId,
                data: data || {}
            });
            console.log(`[Analytics] Event tracked: ${name}`, { sessionId, ...data });
        } catch (e) {
            console.error('Failed to track event', e);
        }
    },

    saveEmail: async (email: string, source: string) => {
        try {
            await addDoc(collection(db, 'emails'), {
                email,
                source,
                timestamp: Date.now()
            });
            console.log(`[Analytics] Email saved: ${email} from ${source}`);
        } catch (e) {
            console.error('Failed to save email', e);
        }
    },

    getStats: async () => {
        try {
            // Fetch Emails
            const emailsSnapshot = await getDocs(query(collection(db, 'emails'), orderBy('timestamp', 'desc')));
            const emails = emailsSnapshot.docs.map(doc => doc.data() as EmailEntry);

            // Fetch Recent Events (limit to last 100 to save reads)
            const eventsSnapshot = await getDocs(query(collection(db, 'events'), orderBy('timestamp', 'desc'), limit(100)));
            const events = eventsSnapshot.docs.map(doc => doc.data() as AnalyticsEvent);

            const eventCounts = events.reduce((acc, event) => {
                acc[event.name] = (acc[event.name] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            return {
                totalEvents: events.length, // Note: This is only of the fetched subset
                totalEmails: emails.length,
                eventCounts,
                emails,
                events
            };
        } catch (e) {
            console.error('Failed to get stats', e);
            return { totalEvents: 0, totalEmails: 0, eventCounts: {}, emails: [], events: [] };
        }
    },

    clearData: async () => {
        console.warn('Clear data not implemented for Firestore to prevent accidental deletion.');
    }
};

