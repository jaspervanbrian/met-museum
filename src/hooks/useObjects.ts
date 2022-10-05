import { useRef, useState, useEffect, useMemo } from "react";
import { MuseumObject } from "types/MuseumObject";
import { getObjects, getObject } from "services/Museum";
import { setFromCache, getFromCache } from "utils/Cache";

const OBJECTS_PER_PAGE = 20;

const useObjects = () => {
  // React 18 updated where useEffect is being ran twice on init
  // Need to make sure we prevent that by using useRef
  const effectRun = useRef(false);

  const [page, setPage] = useState<number>(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [objectIds, setObjectIds] = useState<number[]>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [validObjectIds, setValidObjectIds] = useState<number[]>([]);
  const [objectDictionary, setObjectDictionary] =
    useState<Record<string, MuseumObject>>();

  const hasNextPage = useMemo(() => {
    const currentObjectsCovered = page * OBJECTS_PER_PAGE;
    return currentObjectsCovered < (objectIds?.length ?? 0);
  }, [page, objectIds]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const loadAllObjectIds = async () => {
      setInitialLoading(true);
      const cachedObjectIds = getFromCache("allObjectIds");

      if (Array.isArray(cachedObjectIds) && cachedObjectIds.length > 0) {
        setObjectIds(cachedObjectIds);
      } else {
        const { data } = await getObjects({ signal });
        setFromCache("allObjectIds", data?.objectIDs);
        setObjectIds(data?.objectIDs);
      }

      setInitialLoading(false);
    };

    // Check if useEffect has run the first time
    if (effectRun.current) {
      loadAllObjectIds();
    }

    return () => {
      abortController.abort();
      effectRun.current = true;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    const { signal } = abortController;

    const objectResolver = [];
    const tempValidObjIds: number[] = [];
    const tempObjDictionary: Record<number, MuseumObject> = {};

    const loadObject = (id: number) => {
      return new Promise((resolve) => {
        const cachedObject = getFromCache(`museumObject-${id}`);
        const emptyObj = { objectID: id, notFound: true };

        if (
          cachedObject &&
          (cachedObject.primaryImage || cachedObject.primaryImageSmall) &&
          !cachedObject?.notFound
        ) {
          resolve(cachedObject);
        } else if (cachedObject?.notFound) {
          resolve(emptyObj);
        } else {
          getObject(id, { signal })
            .then(({ data }) => {
              if (data && (data.primaryImage || data.primaryImageSmall)) {
                setFromCache(`museumObject-${data.objectID}`, data);
                resolve(data);
              } else {
                setFromCache(`museumObject-${id}`, emptyObj);
                resolve(emptyObj);
              }
            })
            .catch(() => {
              setFromCache(`museumObject-${id}`, emptyObj);
              resolve(emptyObj);
            });
        }
      });
    };

    if ((objectIds ?? []).length > 0) {
      const start = page * OBJECTS_PER_PAGE - OBJECTS_PER_PAGE;
      const end = page * OBJECTS_PER_PAGE - 1;

      for (let i = start; i < end; i++) {
        if (objectIds?.[i]) {
          objectResolver.push(loadObject(objectIds[i]));
        }
      }
    }

    Promise.all(objectResolver).then((museumObjects) => {
      museumObjects.forEach((museumObject) => {
        const museumObj = museumObject as unknown as MuseumObject;

        if (museumObj.objectID && !museumObj.notFound) {
          tempValidObjIds.push(museumObj.objectID);
          tempObjDictionary[museumObj.objectID] = museumObj;
        }
      });

      setValidObjectIds((state) => {
        const newState = [...state, ...tempValidObjIds];
        if (newState.length < OBJECTS_PER_PAGE && hasNextPage) nextPage();

        return newState;
      });

      setObjectDictionary((state) => ({ ...state, ...tempObjDictionary }));

      setIsLoading(false);
    });

    return () => abortController.abort();
  }, [page, objectIds, hasNextPage]);

  const nextPage = () => {
    setPage((page) => page + 1);
  };

  return {
    page,
    nextPage,
    initialLoading,
    isLoading,
    objectIds,
    objectDictionary,
    validObjectIds,
    hasNextPage,
  };
};

export default useObjects;
