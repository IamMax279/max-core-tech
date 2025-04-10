import mac from "../../public/images/main-mac.avif"
import monitor1 from "../../public/images/monitor-1.avif"
import monitor2 from "../../public/images/monitor-3.avif"
import monitor3 from "../../public/images/home-monitor.avif"
import part1 from "../../public/images/motherboard-2.jpeg"
import part2 from "../../public/images/ram-1.avif"
import part3 from "../../public/images/gpu-horiz.jpg"
import peripheral1 from "../../public/images/mouse-1.avif"
import peripheral2 from "../../public/images/headphones-1.avif"
import peripheral3 from "../../public/images/home-keyboard.webp"

export const renderProductImage = (productId: string) => {
    switch(productId) {
        case "imac-24":
            return mac
        case "titanview-xg":
            return monitor1
        case "cyberview-pro":
            return monitor2
        case "visionedge-34":
            return monitor3
        case "titanboard-x99":
            return part1
        case "thundervolt-elite":
            return part2
        case "novaforce-x80":
            return part3
        case "thunderstrike-pro":
            return peripheral1
        case "apexsonic-x":
            return peripheral2
        case "keytech-2000":
            return peripheral3
        default:
            return mac
    }
}