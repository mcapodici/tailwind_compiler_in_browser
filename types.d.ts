import { TailwindConfig } from 'tailwind';

interface TailwindifyResult {
    css: string;
    error?: Error;
}

declare function tailwindify(
    html: string,
    customCss: string,
    userConfig?: TailwindConfig
): Promise<TailwindifyResult>;

export = tailwindify;