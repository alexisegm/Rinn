// src/hooks/useCategorias.js
import { useState, useEffect } from 'react';
import { catalogService } from '../services/catalogService';

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [isLoadingCat, setIsLoadingCat] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setIsLoadingCat(true);
        const [{ data: categoriasData, error: categoriasError }, { data: conteosData, error: conteosError }] = await Promise.all([
          catalogService.getCategorias(),
          catalogService.getCategoriasConConteo()
        ]);

        if (categoriasError) throw categoriasError;
        if (conteosError) throw conteosError;

        const categoriasConConteo = (categoriasData || []).map((categoria) => ({
          ...categoria,
          cantidad: (conteosData || []).find((item) => item.id === categoria.id)?.cantidad || 0
        }));

        setCategorias(categoriasConConteo);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      } finally {
        setIsLoadingCat(false);
      }
    };

    fetchCategorias();
  }, []);

  return { categorias, isLoadingCat };
}