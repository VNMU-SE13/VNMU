const toDateTime = (string) => {
    const date = new Date(string);
    const formatted = date.toLocaleString("vi-VN", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
    });

    return formatted
}

export default toDateTime