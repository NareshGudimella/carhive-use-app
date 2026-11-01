// Local, reviewed replacement for the react-native-auto-height-image git fork.
// Renders an image at a fixed width and a height derived from its aspect ratio.
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageProps, ImageSourcePropType, Platform } from 'react-native';

type Props = Omit<ImageProps, 'source' | 'width'> & {
    source: ImageSourcePropType;
    width: number;
    maxHeight?: number;
    onHeightChange?: (height: number) => void;
};

// Remote image sizes are cached by uri (local assets by their require id).
const sizeCache = new Map<any, { width: number; height: number }>();

const cacheKey = (source: any) => (typeof source === 'number' ? source : source?.uri);

const fitHeight = (size: { width: number; height: number }, width: number, maxHeight: number) => {
    if (!size.width || !size.height) {
        return 0;
    }
    return Math.min((width * size.height) / size.width, maxHeight);
};

const loadSize = (source: any): Promise<{ width: number; height: number }> =>
    new Promise((resolve, reject) => {
        if (typeof source === 'number') {
            const asset = Image.resolveAssetSource(source);
            resolve({ width: asset?.width ?? 0, height: asset?.height ?? 0 });
        } else {
            Image.getSize(source.uri, (width, height) => resolve({ width, height }), reject);
        }
    });

const AutoHeightImage = ({ source, width, style, onError, maxHeight = Infinity, onHeightChange, ...rest }: Props) => {
    const cached = sizeCache.get(cacheKey(source));
    const [height, setHeight] = useState(cached ? fitHeight(cached, width, maxHeight) : 0);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const key = cacheKey(source);
                let size = sizeCache.get(key);
                if (!size) {
                    size = await loadSize(source);
                    sizeCache.set(key, size);
                }
                if (mounted.current) {
                    const newHeight = fitHeight(size, width, maxHeight);
                    setHeight(newHeight);
                    onHeightChange?.(newHeight);
                }
            } catch (e) {
                onError?.(e as any);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source, width, maxHeight]);

    // Android does not fire onError for 404 responses on remote images, so verify with prefetch.
    useEffect(() => {
        const uri = (source as any)?.uri;
        if (uri && onError && Platform.OS === 'android') {
            Image.prefetch(uri).catch(e => onError(e));
        }
    }, [source, onError]);

    return <Image source={source} style={[{ width, height }, style]} onError={onError} {...rest} />;
};

export default AutoHeightImage;
