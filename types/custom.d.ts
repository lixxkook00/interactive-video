declare type CSSCustomStyle = CSSStyleDeclaration | Record<string, string>;

declare type HTMLVideoMediaType = 'video/mp4' | 'video/webm' | 'video/ogg';

declare type HTMLVideoSourceOption = { src: string; type: HTMLVideoMediaType };

declare type HTMLVideoSourceOptions = HTMLVideoSourceOption | HTMLVideoSourceOption[];
