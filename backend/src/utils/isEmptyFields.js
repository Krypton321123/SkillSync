const isEmpty = (value) => {
    if (value === undefined || value === null) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (typeof value === 'number' && isNaN(value)) return true;
    return false;
};

export {
    isEmpty
}

// need this for checking client information coming from client