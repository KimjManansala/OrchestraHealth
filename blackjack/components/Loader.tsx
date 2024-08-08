import React from 'react';
import { Spinner, SpinnerProps, VisuallyHidden } from '@chakra-ui/react';

interface IBasicLoader {
    isLoading: boolean;
    isShowLoading?: boolean;
    children: React.ReactNode;
    spinnerProps?: SpinnerProps;
}

export const BasicLoader: React.FC<IBasicLoader> = ({
    isLoading,
    isShowLoading = true,
    children,
    spinnerProps = {},
}) => {
    if (isLoading) {
        if (!isShowLoading) {
            return <VisuallyHidden>Hidden loader</VisuallyHidden>;
        }
        return <Spinner {...spinnerProps} />;
    }

    return children;
};
