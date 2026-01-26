import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getContent } from '../utils/contentStore';

interface Props {
    initial: string;
    path: string;
    tag?: string;
    class?: string;
    [key: string]: any;
}

export default function EditableText({ initial, path, tag = 'div', class: className, ...props }: Props) {
    const [text, setText] = useState(initial);

    useEffect(() => {
        const loadContent = () => {
            const content = getContent();
            const keys = path.split('.');
            let value: any = content;
            for (const key of keys) {
                value = value?.[key];
            }
            if (typeof value === 'string' && value !== text) {
                setText(value);
            }
        };

        loadContent();

        const handleUpdate = () => loadContent();
        window.addEventListener('content-updated', handleUpdate);

        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'site_content_v1') loadContent();
        };
        window.addEventListener('storage', handleStorage);

        return () => {
            window.removeEventListener('content-updated', handleUpdate);
            window.removeEventListener('storage', handleStorage);
        };
    }, [path]);

    const Component = tag as any;
    return <Component class={className} {...props}>{text}</Component>;
}
