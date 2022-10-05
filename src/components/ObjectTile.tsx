import React from "react";
import { MuseumObject } from "types/MuseumObject";

interface ObjectTileProps {
  page?: number;
  museumObject?: MuseumObject;
  ref?: React.LegacyRef<HTMLAnchorElement>;
}

const ObjectTile = React.forwardRef(
  (
    { museumObject }: ObjectTileProps,
    ref: React.LegacyRef<HTMLAnchorElement>
  ) => {
    if (
      !museumObject ||
      !(museumObject?.primaryImage || museumObject.primaryImageSmall)
    ) {
      return null;
    }

    const tile = (
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={museumObject.primaryImage ?? museumObject.primaryImageSmall}
          alt={museumObject.title}
          className="h-80 sm:h-60 lg:h-72 xl:h-80 w-full object-contain object-center group-hover:opacity-75"
        />
      </div>
    );

    const component = ref ? (
      <a href="#!" ref={ref} className="group">
        {tile}
      </a>
    ) : (
      <a href="#!" className="group">
        {tile}
      </a>
    );

    return component;
  }
);

export default ObjectTile;
