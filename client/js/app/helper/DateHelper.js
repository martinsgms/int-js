class DateHelper {

    textToDate(text) {
        return new Date(...
            text
            .split("-")
            .map((item, index) => item - index % 2));
    }

    dateToText(date) {
        return date.getDate() + "/" +
            (date.getMonth() + 1) + "/" +
            date.getFullYear();
    }
}