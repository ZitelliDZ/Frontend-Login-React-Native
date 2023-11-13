import React, {createContext, useEffect, useState} from 'react';
import { Producto, ProductsResponse} from '../../interfaces/productInterfaces';
import authApi, { baseUrl } from '../../api/authApi';
import { AxiosError } from 'axios';
import { ImagePickerResponse } from 'react-native-image-picker';

interface ProductContextProps {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  loadProductById: (productId: string) => Promise<Producto>;
  uploadImage: (data: any, productId: string) => Promise<void>;
}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({children}: any) => {


    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
      loadProducts();
    
      return () => {
        
      }
    }, [])
    

    const loadProducts = async () => {
        const response = await authApi.get<ProductsResponse>('/productos?limite=20');
        const data = response.data;
        setProducts([...data.productos]);
    }

    const addProduct = async (categoria: string, productName: string): Promise<Producto> => {
        
            const response = await authApi.post<Producto>('/productos', {categoria: categoria, nombre: productName});
            const data = response.data;
            setProducts([...products, data]);  
            return data

    }
    
    const updateProduct = async (categoryId: string, productName: string, productId: string) => {
        
        try {
            const response = await authApi.put<Producto>(`/productos/${productId}`, {categoria: categoryId, nombre: productName});
            const data = response.data;
            setProducts(products.map(product => product._id === productId? data : product));

        } catch (error) {
            console.log({error});
        }
    }
    
    const deleteProduct = async (productId: string) => {
        const response = await authApi.delete<ProductsResponse>(`/productos/${productId}`);
        const data = response.data;
        setProducts([...products.filter(product => product._id!== productId)]);
    }
    
    const loadProductById = async (productId: string) => {
        const response = await authApi.get<Producto>(`/productos/${productId}`);
        const data = response.data;
        return data;
    }

    const uploadImage = async (data: ImagePickerResponse, productId: string) => {
        
        const fileToUpload = {
            uri: data.assets![0].uri,
            type: `${data.assets![0].type}`, 
            name: data.assets![0].fileName!.split("/").pop(),
        }
        
        const formData = new FormData();
        formData.append('archivo', fileToUpload);
            const res = await fetch
            (`${baseUrl}/uploads/productos/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type':'multipart/form-data'
                },
                body: formData})
            
            console.log("🚀 ~ file: ProductContext.tsx:84 ~ uploadImage ~ response:", res) 
    }






  return (
    <ProductContext.Provider value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage
    }}>
        {children}
    </ProductContext.Provider>
  );
};
