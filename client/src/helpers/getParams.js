export default (query) => {
    if (query) {
        if (query.length > 0) {
            const params = query.split("?")[1];
            const paramsObj = {};
                const keyValue = params.split("=");
                paramsObj[keyValue[0]] = keyValue[1];
            return paramsObj;
        }
    }
}