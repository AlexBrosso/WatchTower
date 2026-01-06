const AppError = require("../utils/AppError");

function requireRole(...allowedRoles){
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role))
            throw new AppError("Access Denied", 403);
    }
}

module.exports = requireRole;