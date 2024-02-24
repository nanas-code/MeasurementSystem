// Custom JavaScript function to format dates
const formatDate = function(date, format) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const formattedDate = new Date(date).toLocaleDateString('fi', options);

    return formattedDate;
};

module.exports = formatDate;
