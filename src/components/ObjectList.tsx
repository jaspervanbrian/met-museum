import { useRef, useCallback } from "react";
import useObjects from "hooks/useObjects";
import ObjectTile from "components/ObjectTile";
import LoadingSpinner from "components/LoadingSpinner";

const ObjectList = () => {
  const {
    nextPage,
    initialLoading,
    isLoading,
    objectDictionary,
    validObjectIds,
    hasNextPage,
  } = useObjects();

  const intObserver = useRef<any>(null);
  const lastTileRef = useCallback(
    (obj: any) => {
      if (initialLoading || isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((objects) => {
        if (objects[0].isIntersecting && hasNextPage) {
          nextPage();
        }
      });

      if (obj) intObserver?.current?.observe(obj);
    },
    [initialLoading, isLoading, nextPage, hasNextPage]
  );

  const objectTiles = validObjectIds.map((museumObjectId, i) => {
    if (validObjectIds.length === i + 1) {
      return (
        <ObjectTile
          key={museumObjectId}
          ref={lastTileRef}
          museumObject={objectDictionary?.[museumObjectId]}
        />
      );
    }

    return (
      <ObjectTile
        key={museumObjectId}
        museumObject={objectDictionary?.[museumObjectId]}
      />
    );
  });

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Museum Objects</h2>

      {!initialLoading && objectDictionary && (
        <div className="grid grid-cols-1 gap-y-20 gap-x-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {objectTiles}
        </div>
      )}

      {(initialLoading || isLoading) && (
        <div className="mt-12 flex justify-center items-center flex-col">
          <LoadingSpinner />

          {initialLoading && (
            <h4 className="font-semibold mt-3">
              Hang on! It takes some time on the first load.
            </h4>
          )}
        </div>
      )}
    </div>
  );
};

export default ObjectList;
