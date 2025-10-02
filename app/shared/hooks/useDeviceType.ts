'use client';

import { useEffect, useState } from "react";
import { MOBILE_WIDTH, TABLET_WIDTH } from "@/consts";

export const DeviceType = {
    desktop: "desktop",
    tablet: "tablet",
    mobile: "mobile",
} as const;

export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

export const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.desktop);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth <= MOBILE_WIDTH) {
                setDeviceType(DeviceType.mobile)
            } else if (window.innerWidth <= TABLET_WIDTH) {
                setDeviceType(DeviceType.tablet)
            } else {
                setDeviceType(DeviceType.desktop)
            }
        }

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [])

    return deviceType;
}