

export default function dateFormat(date) {
    const today = new Date(date);
    let text = today.toDateString().slice(3);
    return text;
}
