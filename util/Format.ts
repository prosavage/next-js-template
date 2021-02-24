export const formatNumber = (num) => {
    if (!num || num === null) return "";
    const number = new Intl.NumberFormat().format(num)
    if (!number) return 0
    return number;
}