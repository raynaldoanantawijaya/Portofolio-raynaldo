import { defaultContent, type SiteContent } from '../data/siteContent';
import { getSiteContent, saveSiteContent } from '../lib/firestoreService';

const STORAGE_KEY = 'site_content_v1';

// Get content from Firestore (async) - with localStorage fallback for SSR
export async function getContentAsync(): Promise<SiteContent> {
    try {
        const content = await getSiteContent();
        // Also update localStorage for front-end sync
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        }
        return content;
    } catch (error) {
        console.error('Error getting content from Firestore:', error);
        return getContent(); // Fallback to localStorage
    }
}

// Sync get from localStorage (for non-async contexts)
export function getContent(): SiteContent {
    if (typeof localStorage === 'undefined') {
        return defaultContent;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultContent;
    try {
        const parsed = JSON.parse(stored);
        // Merge with default to ensure structure integrity
        return {
            ...defaultContent,
            ...parsed,
            hero: { ...defaultContent.hero, ...parsed.hero },
            about: { ...defaultContent.about, ...parsed.about },
            socialLinks: { ...defaultContent.socialLinks, ...parsed.socialLinks },
            projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : defaultContent.projects,
            skills: parsed.skills && parsed.skills.length > 0 ? parsed.skills : defaultContent.skills,
        };
    } catch (e) {
        console.error("Failed to parse content", e);
        return defaultContent;
    }
}

// Save content to both Firestore and localStorage
export async function saveContentAsync(content: SiteContent): Promise<boolean> {
    try {
        // Save to Firestore
        const success = await saveSiteContent(content);

        // Also save to localStorage for immediate UI updates
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        }

        // Dispatch event for components to react
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('content-updated'));
        }

        return success;
    } catch (error) {
        console.error('Error saving content to Firestore:', error);
        // Fallback to localStorage only
        saveContent(content);
        return false;
    }
}

// Sync save (localStorage only) - kept for backwards compatibility
export function saveContent(content: SiteContent) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new Event('content-updated'));
}

export function resetContent() {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('content-updated'));
}
