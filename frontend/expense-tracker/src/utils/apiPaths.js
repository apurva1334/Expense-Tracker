export const BASE_URL = "https://localhost:8000";


// utils/apiPaths.js
export const API_PATHS = {
    AUTH : {
        LOGIN:"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getUser",
    },
    Dashboard:{
        GET_DATA:"/api/v1/dashboard",
    },
    INCOME:{
        ADD_INCOME:"/api/v1/income/add",
        GET_INCOME:"/api/v1/income/get",
        DELETE_INCOME:(incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME:"/api/v1/income/downloadexcel",
    }
   
}    