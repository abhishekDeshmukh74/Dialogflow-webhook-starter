// isJson(str) {
//     str = typeof str !== 'string' ? JSON.stringify(str) : str;
//     try {
//         str = JSON.parse(str);
//     } catch (e) {
//         return false;
//     }

//     if (typeof str === 'object' && str !== null) {
//         return true;
//     }
//     return false;
// }