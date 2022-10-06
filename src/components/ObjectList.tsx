import { useState, useRef, useCallback } from "react";
import useObjects from "hooks/useObjects";

import ObjectTile from "components/ObjectTile";
import ObjectModal from "components/ObjectModal";
import LoadingSpinner from "components/LoadingSpinner";
import Search from "components/Search";

import { MuseumObject } from "types/MuseumObject";

type ObjectListProps = {
  searchBarVisible: boolean;
};

const ObjectList = ({ searchBarVisible }: ObjectListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState<MuseumObject>();
  const {
    nextPage,
    initialLoading,
    searchLoading,
    isLoading,
    objectDictionary,
    validObjectIds,
    hasNextPage,
    search,
    setSearch,
    handleSearchChange,
    validSearchObjectIds,
    hasNextSearchPage,
    nextSearchPage,
  } = useObjects();

  const intObserver = useRef<any>(null);

  const lastObjectTileRef = useCallback(
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

  const lastSearchObjectTileRef = useCallback(
    (obj: any) => {
      if (initialLoading || isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((objects) => {
        if (objects[0].isIntersecting && hasNextSearchPage) {
          nextSearchPage();
        }
      });

      if (obj) intObserver?.current?.observe(obj);
    },
    [initialLoading, isLoading, nextSearchPage, hasNextSearchPage]
  );

  const objectTiles = validObjectIds.map((museumObjectId, i) => {
    if (validObjectIds.length === i + 1) {
      return (
        <ObjectTile
          key={museumObjectId}
          ref={lastObjectTileRef}
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

  const searchObjectTiles = validSearchObjectIds.map((museumObjectId, i) => {
    if (validObjectIds.length === i + 1) {
      return (
        <ObjectTile
          key={museumObjectId}
          ref={lastSearchObjectTileRef}
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
    <div className="mx-auto max-w-2xl pt-12 pb-16 px-4 sm:pt-12 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Museum Objects</h2>
      <ObjectModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        museumObject={selectedObject}
      />

      {searchBarVisible && (
        <div className="mb-10">
          <Search
            value={search}
            onChange={setSearch}
            handleSearchChange={handleSearchChange}
          />
        </div>
      )}

      {!initialLoading &&
        !searchLoading &&
        (validObjectIds.length > 0 || validSearchObjectIds.length > 0) && (
          <div className="grid grid-cols-1 gap-y-20 gap-x-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {validSearchObjectIds.length > 0 ? searchObjectTiles : objectTiles}
          </div>
        )}

      {(initialLoading || searchLoading || isLoading) && (
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
