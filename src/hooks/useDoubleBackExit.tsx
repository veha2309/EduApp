import { useEffect, useRef } from "react";
import { BackHandler, ToastAndroid, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export const useDoubleBackExit = () => {
    const lastBackPressed = useRef(0);
    const route = useRoute();

    useEffect(() => {
        const backAction = () => {
            if (route.name !== "Home") return false;

            const now = Date.now();
            if (lastBackPressed.current && now - lastBackPressed.current < 2000) {
                BackHandler.exitApp();
                return true;
            }
            lastBackPressed.current = now;
            if (Platform.OS === "android") {
                ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
            }
            return true;
        };

        const subscription = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => subscription.remove();
    }, [route.name]);
};
