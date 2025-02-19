import { computedFillDataWithAutoFillData } from '@/utils/computedWithAutoFillData';
import React from 'react';
import type { TCarouselProps } from '../types';

type TGetRequiredProps<P extends keyof TCarouselProps> = Record<
    P,
    Required<TCarouselProps>[P]
>;

export type TInitializeCarouselProps<T> = TCarouselProps<T> &
    TGetRequiredProps<
        | 'defaultIndex'
        | 'loop'
        | 'width'
        | 'height'
        | 'scrollAnimationDuration'
        | 'autoPlayInterval'
        | 'autoFillData'
    > & {
        // Raw data that has not been processed
        rawData: T[];
    };

export function useInitProps<T>(
    props: TCarouselProps<T>
): TInitializeCarouselProps<T> {
    const {
        defaultIndex = 0,
        data: rawData = [],
        loop = true,
        enabled = true,
        autoPlayInterval: _autoPlayInterval = 1000,
        scrollAnimationDuration = 500,
        style = {},
        panGestureHandlerProps = {},
        pagingEnabled = true,
        autoFillData = true,
        snapEnabled = props.enableSnap ?? true,
        width: _width,
        height: _height,
        onRefresh = () => {},
        refreshing = false,
        allowRefreshing = false
    } = props;

    const width = Math.round(_width || 0);
    const height = Math.round(_height || 0);
    const autoPlayInterval = Math.max(_autoPlayInterval, 0);

    const data = React.useMemo<T[]>(
        () =>
            computedFillDataWithAutoFillData<T>({
                loop,
                autoFillData,
                data: rawData,
                dataLength: rawData.length,
            }),
        [rawData, loop, autoFillData]
    );

    if (props.mode === 'vertical-stack' || props.mode === 'horizontal-stack') {
        if (!props.modeConfig) {
            props.modeConfig = {};
        }
        props.modeConfig.showLength =
            props.modeConfig?.showLength ?? data.length - 1;
    }
    return {
        ...props,
        defaultIndex,
        autoFillData,
        data,
        rawData,
        loop,
        enabled,
        autoPlayInterval,
        scrollAnimationDuration,
        style,
        panGestureHandlerProps,
        pagingEnabled,
        snapEnabled,
        width,
        height,
        onRefresh,
        refreshing,
        allowRefreshing
    };
}
