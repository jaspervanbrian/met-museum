import { useState, useEffect } from "react";
import { MuseumObject } from "types/MuseumObject";
import { getObjectsWithImages } from "services/Museum";
import useCache from "utils/Cache";

const OBJECTS_PER_PAGE = 40;

const useObjects = (page = 1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [objectIds, setObjectIds] = useState<number[]>();
  const [objectStore, setObjectStore] = useState<number[]>();
  const [objectDictionary, setObjectDictionary] =
    useState<Record<string, MuseumObject>>();
  const [error, setError] = useState({});

  const { setFromCache, getFromCache } = useCache();

  useEffect(() => {
    const loadAllObjectIds = async () => {
      setIsLoading(true);
      setError({});

      const abortController = new AbortController();
      const { signal } = abortController;
      const cachedObjectIds = getFromCache("allObjectIds");

      if (Array.isArray(cachedObjectIds) && cachedObjectIds.length > 0) {
        setObjectIds(cachedObjectIds);
      } else {
        const { data } = await getObjectsWithImages("*", { signal });
        setFromCache("allObjectIds", data?.objectIDs);
        setObjectIds(data?.objectIDs);
      }

      setIsLoading(false);

      return () => abortController.abort();
    };

    loadAllObjectIds();
  }, []);

  return {
    isLoading,
    objectIds,
    objectStore,
    objectDictionary,
    error,
  };
};

export default useObjects;
