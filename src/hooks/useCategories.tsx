import { useEffect, useState } from "react";
import { Categoria, CategoriasResponse } from "../interfaces/productInterfaces";
import authApi from "../api/authApi";





export const useCategories = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState<Categoria[]>([]);

    useEffect(() => {
        getCategories()
        
    }, []);


    const getCategories = async() => {

        const res = await authApi.get<CategoriasResponse>('/categorias')

        setCategories(res.data.categorias)
        setIsLoading(false)

    }

    return {categories,isLoading};




}