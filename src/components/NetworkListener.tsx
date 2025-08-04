import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { navigationRef } from '../../App';
import { Baseprops } from '../utils/navigation';
class Componentprops extends Baseprops { }
const NetworkListener: React.FC<Componentprops> = (props) => {
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const isOffline = !state.isConnected || !state.isInternetReachable;

            if (navigationRef.isReady()) {
                const currentRoute = navigationRef.getCurrentRoute()?.name;

                if (isOffline && currentRoute !== 'NoNetworkScreen') {
                    navigationRef.navigate(
                        //@ts-ignore
                        'NoNetworkScreen');
                }

                if (!isOffline && currentRoute === 'NoNetworkScreen') {
                    navigationRef.reset({
                        index: 0,
                        routes: [{ name: 'SplaceScreen' }],
                    });
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return null;
};

export default NetworkListener;
