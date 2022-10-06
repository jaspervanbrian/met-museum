import { useState, useRef, useCallback } from "react";
import useObjects from "hooks/useObjects";

import ObjectTile from "components/ObjectTile";
import ObjectModal from "components/ObjectModal";
import LoadingSpinner from "components/LoadingSpinner";

import { MuseumObject } from "types/MuseumObject";

const ObjectList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState<MuseumObject>();
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
          onClick={() => {
            setSelectedObject(objectDictionary?.[museumObjectId]);
            setModalOpen(true);
          }}
        />
      );
    }

    return (
      <ObjectTile
        key={museumObjectId}
        museumObject={objectDictionary?.[museumObjectId]}
        onClick={() => {
          setSelectedObject(objectDictionary?.[museumObjectId]);
          setModalOpen(true);
        }}
      />
    );
  });

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Museum Objects</h2>
      <ObjectModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        museumObject={selectedObject}
      />

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
