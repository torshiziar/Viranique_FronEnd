export const generateNameGrafanaChart = (Name) => {
    switch (Name) {
        case ('دمای هوا'):
            return `${encodeURIComponent(Name)}°C`
            break;
        case ('Air Temperature'):
            return `${encodeURIComponent(Name)}°C`
            break;
        case ('دمای خاک'):
            return `${encodeURIComponent(Name)}°C`
            break;
        case ('Soil Temperature'):
            return `${encodeURIComponent(Name)}°C`
            break;
        case ("رطوبت برگ" || "Soil Moisture"):
            return `${encodeURIComponent(Name)}%`
            break;
        case ("Soil Moisture"):
            return `${encodeURIComponent(Name)}%`
            break;
        case ("Air Humidity"):
            return `${encodeURIComponent(Name)}%`
            break;
        case ("رطوبت هوا"):
            return `${encodeURIComponent(Name)}%`
            break;
        case ("رطوبت خاک"):
            return `${encodeURIComponent(Name)}%`
            break;
        case ("روشنایی" || "Light"):
            return `${encodeURIComponent(Name)}LUX`
            break;
        case ("رسانایی خاک"):
            return `${encodeURIComponent(Name)}us/cm`
            break;
        case ("پتاسیم" || "فسفر" || "نیتروژن"):
            return `${encodeURIComponent(Name)}mg/kg`
            break;
        case ("co2"):
            return `${encodeURIComponent(Name)}ppm`
            break;
        default:
            return `${encodeURIComponent(Name)}`
    }
}