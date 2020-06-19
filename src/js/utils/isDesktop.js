import DeviceDetector from 'device-detector-js';

export const isDesktop = new DeviceDetector().parse(navigator.userAgent).device.type === 'desktop';