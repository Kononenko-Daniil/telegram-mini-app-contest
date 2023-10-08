const asUTCDate = (date) => {
    const utcDateString = date.toString() + "Z";

    return new Date(utcDateString);
}

const services = {
    asUTCDate
}

export default services;
