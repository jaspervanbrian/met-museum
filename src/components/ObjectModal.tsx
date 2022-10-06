import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { MuseumObject } from "types/MuseumObject";

type ObjectModalProps = {
  museumObject?: MuseumObject;
  isOpen: boolean;
  closeModal: () => void;
};

const ObjectModal = ({
  museumObject,
  isOpen,
  closeModal,
}: ObjectModalProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {museumObject && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl lg:max-w-2xl xl:max-w-3xl sm:p-6">
                  <div className="flex gap-x-10 sm:gap-x-10 lg:gap-x-20 xl:gap-x-10 justify-between items-stretch">
                    <div className="flex flex-col gap-y-6 justify-between">
                      <h3 className="font-medium text-sm italic">
                        {museumObject.department}
                      </h3>
                      <div className="flex flex-col gap-y-4 max-w-md">
                        <h1 className="font-bold sm:text-base lg:text-xl xl:text-3xl">
                          {museumObject.title}
                        </h1>
                        <h3 className="font-medium sm:text-base lg:text-lg xl:text-xl text-gray-500">
                          {museumObject.objectDate}
                        </h3>
                        {museumObject.artistDisplayName && (
                          <p className="font-semibold sm:text-xs lg:text-sm xl:text-base underline underline-offset-4">
                            {museumObject.artistDisplayName}
                          </p>
                        )}
                        {museumObject.culture && (
                          <p className="font-semibold sm:text-xs lg:text-sm xl:text-base text-gray-600">
                            {museumObject.culture}
                          </p>
                        )}
                      </div>
                      <a
                        href={museumObject.objectURL}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="block w-full text-center justify-center border border-red-600 bg-white px-4 py-2 text-base font-medium text-red-600 shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                        onClick={() => closeModal()}
                      >
                        Visit the artwork&apos;s page
                      </a>
                    </div>
                    <div className="self-center aspect-w-1 aspect-h-1 w-full sm:max-w-sm lg:max-w-md xl:max-w-md max-h-screen overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                      <img
                        src={
                          museumObject.primaryImage ??
                          museumObject.primaryImageSmall
                        }
                        alt=""
                        className="h-full w-full object-contain object-center group-hover:opacity-75"
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        )}
      </Dialog>
    </Transition.Root>
  );
};

export default ObjectModal;
