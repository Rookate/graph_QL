export function formatTaille(octets: number) {


    const nombreStr = octets.toString();
    const nbChiffres = nombreStr.length;

    if (nbChiffres <= 3) {
        const firstPart = nombreStr.slice(0);
        return `${firstPart} B`;
    } else if ((nbChiffres <= 6)) {
        const firstPart = nombreStr.slice(0, -3);
        const secondPart = nombreStr.slice(-3);

        const roundedSecondPart = Math.round(parseInt(secondPart) / 100);

        return `${firstPart}.${roundedSecondPart} kB`;
    } else if (nbChiffres <= 9) {
        const firstPart = nombreStr.slice(0, 1);
        const secondPart = nombreStr.slice(1, 3);
        console.log({ firstPart, secondPart })
        return `${firstPart}.${secondPart} MB`;
    }
}

export function formatDate(date: Date | string) {
    const newDate = new Date(date);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Paris"
    }).format(newDate);
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}