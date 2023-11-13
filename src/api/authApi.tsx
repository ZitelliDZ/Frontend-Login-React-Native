import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export const baseUrl = '';

const authApi = axios.create({
    baseURL: baseUrl
})

authApi.interceptors.request.use(
   async(config)=>{
    const token = await AsyncStorage.getItem('token');
    if(token){
        config.headers['x-token'] = token
    }
    return config;
   } 
)


export default authApi